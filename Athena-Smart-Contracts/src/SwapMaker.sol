// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "../lib/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../lib/@openzeppelin/contracts/access/Ownable.sol";
import "../lib/@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title SwapContractWithYield
 * @dev A decentralized token swap contract with yield distribution for liquidity providers.
 * Features:
 * - Liquidity Pool with LP token minting.
 * - Token swaps between TokenA and TokenB using the constant product formula.
 * - 0.3% swap fee distributed as rewards to liquidity providers.
 * - Yield claiming for liquidity providers.
 */
contract SwapContractWithYield is Ownable, ERC20 {
    // ERC20 tokens used for the liquidity pool
    IERC20 public tokenA;
    IERC20 public tokenB;

    // Reserves of TokenA and TokenB in the pool
    uint256 public reserveA;
    uint256 public reserveB;

    // Accumulated fees for each token type
    uint256 public totalFeesA;
    uint256 public totalFeesB;

    // Constant fee percentage (0.3%) in basis points
    uint256 public constant FEE_PERCENT = 30;

    // Mapping for user rewards (yield) in TokenA and TokenB
    mapping(address => uint256) public userRewardsA;
    mapping(address => uint256) public userRewardsB;

    // Events
    event Swapped(address indexed user, uint256 amountA, uint256 amountB);
    event LiquidityAdded(address indexed provider, uint256 amountA, uint256 amountB, uint256 lpTokensMinted);
    event YieldClaimed(address indexed provider, uint256 amountA, uint256 amountB);

    /**
     * @dev Constructor initializes the contract with the addresses of TokenA and TokenB.
     * @param _tokenA Address of the first ERC20 token (TokenA).
     * @param _tokenB Address of the second ERC20 token (TokenB).
     */
    constructor(address _tokenA, address _tokenB) ERC20("LP Token", "LPT") Ownable(msg.sender) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    /**
     * @dev Allows users to add liquidity to the pool by depositing TokenA and TokenB.
     * LP tokens are minted proportionally to the amount of liquidity provided.
     * @param amountA The amount of TokenA to deposit.
     * @param amountB The amount of TokenB to deposit.
     */
    function addLiquidity(uint256 amountA, uint256 amountB) external {
        require(amountA > 0 && amountB > 0, "Amounts must be greater than 0");

        // Transfer TokenA and TokenB from the user to the contract
        tokenA.transferFrom(msg.sender, address(this), amountA * 10 ** 18);
        tokenB.transferFrom(msg.sender, address(this), amountB * 10 ** 18);

        uint256 lpTokensToMint;

        if (totalSupply() == 0) {
            // First liquidity provider mints tokens directly proportional to the liquidity
            lpTokensToMint = amountA + amountB;
        } else {
            // Calculate LP token share based on reserves
            uint256 amountAReserveRatio = (amountA * totalSupply()) / reserveA;
            uint256 amountBReserveRatio = (amountB * totalSupply()) / reserveB;

            // Mint LP tokens based on the smaller reserve ratio
            lpTokensToMint = amountAReserveRatio < amountBReserveRatio ? amountAReserveRatio : amountBReserveRatio;
        }

        // Update reserves and mint LP tokens
        reserveA += amountA;
        reserveB += amountB;
        _mint(msg.sender, lpTokensToMint  * 10 ** 18);

        emit LiquidityAdded(msg.sender, amountA, amountB, lpTokensToMint);
    }

    /**
     * @dev Swaps a specified amount of TokenA for TokenB.
     * The function calculates the amount of TokenB based on the constant product formula
     * and applies a 0.3% fee.
     * @param amountA The amount of TokenA to swap.
     */
    function swapAtoB(uint256 amountA) external {
        require(amountA > 0, "Amount must be greater than 0");

        uint256 amountB = getAmountOut(amountA, reserveA, reserveB);
        require(amountB <= reserveB, "Insufficient liquidity");

        uint256 feeAmount = (amountA * FEE_PERCENT) / 10000;
        uint256 amountAAfterFee = amountA - feeAmount;

        // Update fee and user reward
        totalFeesA += feeAmount;
        userRewardsA[msg.sender] += feeAmount;

        // Perform the swap
        tokenA.transferFrom(msg.sender, address(this), amountA  * 10 ** 18);
        tokenB.transfer(msg.sender, amountB * 10 ** 18);

        // Update reserves
        reserveA += amountAAfterFee;
        reserveB -= amountB;

        emit Swapped(msg.sender, amountA, amountB);
    }

    /**
     * @dev Swaps a specified amount of TokenB for TokenA.
     * The function calculates the amount of TokenA based on the constant product formula
     * and applies a 0.3% fee.
     * @param amountB The amount of TokenB to swap.
     */
    function swapBtoA(uint256 amountB) external {
        require(amountB > 0, "Amount must be greater than 0");

        uint256 amountA = getAmountOut(amountB, reserveB, reserveA);
        require(amountA <= reserveA, "Insufficient liquidity");

        uint256 feeAmount = (amountB * FEE_PERCENT) / 10000;
        uint256 amountBAfterFee = amountB - feeAmount;

        // Update fee and user reward
        totalFeesB += feeAmount;
        userRewardsB[msg.sender] += feeAmount;

        // Perform the swap
        tokenB.transferFrom(msg.sender, address(this), amountB * 10 ** 18);
        tokenA.transfer(msg.sender, amountA * 10 ** 18);

        // Update reserves
        reserveB += amountBAfterFee;
        reserveA -= amountA;

        emit Swapped(msg.sender, amountB, amountA);
    }

    /**
     * @dev Calculates the output amount of tokens using the constant product formula.
     * @param amountIn The input amount of tokens.
     * @param reserveIn The reserve of the input token in the pool.
     * @param reserveOut The reserve of the output token in the pool.
     * @return The output amount of tokens.
     */
    function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) public pure returns (uint256) {
        require(amountIn > 0, "Amount must be greater than 0");

        uint256 amountInWithFee = amountIn * 997; // Includes a 0.3% fee
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * 1000) + amountInWithFee;

        return numerator / denominator;
    }

    /**
     * @dev Allows liquidity providers to claim their accumulated yield (fees).
     * Resets user rewards after transferring them.
     */
    function claimYield() external {
        uint256 rewardA = userRewardsA[msg.sender];
        uint256 rewardB = userRewardsB[msg.sender];

        require(rewardA > 0 || rewardB > 0, "No rewards to claim");

        // Reset rewards
        userRewardsA[msg.sender] = 0;
        userRewardsB[msg.sender] = 0;

        // Transfer rewards to user
        if (rewardA > 0) {
            tokenA.transfer(msg.sender, rewardA * 10 ** 18);
        }

        if (rewardB > 0) {
            tokenB.transfer(msg.sender, rewardB * 10 ** 18);
        }

        emit YieldClaimed(msg.sender, rewardA, rewardB);
    }
}
