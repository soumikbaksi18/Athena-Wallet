// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "../lib/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../lib/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Decentralized Lending Contract with Lock Period
 * @dev Allows users to deposit a specific token for lending with a lock period and LP tokens for collateral-based borrowing.
 */
contract LendingContract is Ownable(msg.sender) {
    IERC20 public lpToken; // LP token used as collateral
    IERC20 public depositToken; // Token used for lending and borrowing
    uint256 public collateralizationRatio = 80; // 80% collateralization ratio
    uint256 public annualInterestRate = 10; // 10% annual interest rate
    uint256 public liquidationThreshold = 90; // 90% threshold for liquidation
    uint256 public lockPeriod = 30 days; // Lock period for lender deposits

    uint256 public totalDeposits; // Total amount of depositToken in the pool

    struct Loan {
        uint256 collateralAmount; // Amount of LP tokens deposited as collateral
        uint256 borrowedAmount; // Amount of tokens borrowed
        uint256 borrowTimestamp; // Timestamp when the loan was taken
    }

    struct Deposit {
        uint256 amount; // Amount of depositToken deposited
        uint256 depositTimestamp; // Timestamp of the deposit
    }

    mapping(address => Loan) public loans; // User address => Loan
    mapping(address => Deposit) public lenderDeposits; // Lender address => Deposit details

    event CollateralDeposited(address indexed user, uint256 amount);
    event TokensBorrowed(address indexed user, uint256 amount);
    event LoanRepaid(address indexed user, uint256 amount, uint256 interestPaid);
    event LoanLiquidated(address indexed user, uint256 collateralAmount);
    event DepositMade(address indexed lender, uint256 amount, uint256 timestamp);
    event WithdrawalMade(address indexed lender, uint256 amount);

    /**
     * @dev Constructor initializes the contract with the LP token and deposit token addresses.
     * @param _lpToken Address of the LP token.
     * @param _depositToken Address of the deposit token.
     */
    constructor(address _lpToken, address _depositToken) {
        lpToken = IERC20(_lpToken);
        depositToken = IERC20(_depositToken);
    }

    /**
     * @dev Allows a user to deposit the specific token for lending.
     * The deposit is locked for the specified lock period.
     * @param amount The amount of depositToken to deposit.
     */
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        depositToken.transferFrom(msg.sender, address(this), amount);
        lenderDeposits[msg.sender].amount += amount;
        lenderDeposits[msg.sender].depositTimestamp = block.timestamp;
        totalDeposits += amount;

        emit DepositMade(msg.sender, amount, block.timestamp);
    }

    /**
     * @dev Allows a user to withdraw their deposited tokens after the lock period.
     * @param amount The amount of depositToken to withdraw.
     */
    function withdraw(uint256 amount) external {
        Deposit storage userDeposit = lenderDeposits[msg.sender];
        require(userDeposit.amount >= amount, "Insufficient balance");
        require(
            block.timestamp >= userDeposit.depositTimestamp + lockPeriod,
            "Tokens are locked"
        );

        userDeposit.amount -= amount;
        totalDeposits -= amount;

        depositToken.transfer(msg.sender, amount);
        emit WithdrawalMade(msg.sender, amount);
    }

    /**
     * @dev Allows a user to deposit LP tokens as collateral.
     * @param amount The amount of LP tokens to deposit.
     */
    function depositCollateral(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");

        lpToken.transferFrom(msg.sender, address(this), amount);
        loans[msg.sender].collateralAmount += amount;

        emit CollateralDeposited(msg.sender, amount);
    }

    /**
     * @dev Allows a user to borrow tokens against the deposited collateral.
     * @param amount The amount of depositToken to borrow.
     */
    function borrow(uint256 amount) external {
        Loan storage loan = loans[msg.sender];
        require(loan.collateralAmount > 0, "No collateral deposited");

        uint256 collateralValue = loan.collateralAmount * 1 ether; // Assuming LP token has 1:1 value
        uint256 maxBorrow = (collateralValue * collateralizationRatio) / 100;
        require(amount <= maxBorrow, "Exceeds borrowing limit");
        require(amount <= totalDeposits, "Insufficient pool liquidity");

        depositToken.transfer(msg.sender, amount);
        loan.borrowedAmount += amount;
        loan.borrowTimestamp = block.timestamp;
        totalDeposits -= amount;

        emit TokensBorrowed(msg.sender, amount);
    }

    /**
     * @dev Allows a user to repay the borrowed tokens with interest.
     * @param amount The amount of depositToken to repay.
     */
    function repay(uint256 amount) external {
        Loan storage loan = loans[msg.sender];
        require(loan.borrowedAmount > 0, "No active loan");

        uint256 interest = calculateInterest(loan.borrowedAmount, loan.borrowTimestamp);
        require(amount >= loan.borrowedAmount + interest, "Insufficient amount to repay");

        depositToken.transferFrom(msg.sender, address(this), amount);
        totalDeposits += loan.borrowedAmount;

        uint256 interestPaid = amount - loan.borrowedAmount;

        // Reset loan details
        loan.borrowedAmount = 0;
        loan.borrowTimestamp = 0;

        emit LoanRepaid(msg.sender, amount, interestPaid);
    }

    /**
     * @dev Liquidates the collateral if the loan value exceeds the liquidation threshold.
     * @param user The address of the user whose loan is to be liquidated.
     */
    function liquidate(address user) external {
        Loan storage loan = loans[user];
        require(loan.borrowedAmount > 0, "No active loan");

        uint256 interest = calculateInterest(loan.borrowedAmount, loan.borrowTimestamp);
        uint256 totalDebt = loan.borrowedAmount + interest;

        uint256 collateralValue = loan.collateralAmount * 1 ether; // Assuming LP token has 1:1 value
        uint256 liquidationValue = (collateralValue * liquidationThreshold) / 100;

        require(totalDebt >= liquidationValue, "Loan not eligible for liquidation");

        lpToken.transfer(msg.sender, loan.collateralAmount);

        // Reset loan details
        loan.collateralAmount = 0;
        loan.borrowedAmount = 0;

        emit LoanLiquidated(user, loan.collateralAmount);
    }

    /**
     * @dev Calculates the interest on the borrowed amount.
     * @param borrowedAmount The amount of tokens borrowed.
     * @param borrowTimestamp The timestamp when the loan was taken.
     * @return The calculated interest.
     */
    function calculateInterest(uint256 borrowedAmount, uint256 borrowTimestamp) public view returns (uint256) {
        uint256 timeElapsed = block.timestamp - borrowTimestamp;
        uint256 annualInterest = (borrowedAmount * annualInterestRate) / 100;
        return (annualInterest * timeElapsed) / (365 days);
    }
}
