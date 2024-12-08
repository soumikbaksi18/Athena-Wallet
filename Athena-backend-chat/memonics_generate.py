from mnemonic import Mnemonic
from bip_utils import Bip39SeedGenerator, Bip44, Bip44Coins, Bip44Changes
from eth_keys import keys
from eth_utils import to_checksum_address


def generate_mnemonic():
    # Step 1: Initialize the Mnemonic class with the desired language (default: English)
    mnemo = Mnemonic("english")

    # Step 2: Generate a 128-bit entropy mnemonic (12 words)
    mnemonic = mnemo.generate(strength=128)

    # Step 3: (Optional) Generate the seed from the mnemonic with a passphrase
    passphrase = ""  # You can set a custom passphrase here
    seed = mnemo.to_seed(mnemonic, passphrase)

    # Display results
    print("Mnemonic Phrase:", mnemonic)
    print("Seed (Hex):", seed.hex())

    return mnemonic


def generate_ethereum_address(mnemonic, passphrase=""):
    # Step 1: Generate the seed from the mnemonic
    seed = Bip39SeedGenerator(mnemonic).Generate(passphrase)

    # Step 2: Derive the Ethereum private key using BIP-44
    bip44_wallet = Bip44.FromSeed(seed, Bip44Coins.ETHEREUM)
    eth_account = (
        bip44_wallet.Purpose()
        .Coin()
        .Account(0)
        .Change(Bip44Changes.CHAIN_EXT)
        .AddressIndex(0)
    )
    private_key = eth_account.PrivateKey().Raw().ToHex()

    # Step 3: Compute the Ethereum address
    eth_private_key = keys.PrivateKey(bytes.fromhex(private_key))
    eth_address = eth_private_key.public_key.to_address()

    # Convert to checksum address
    checksum_address = to_checksum_address(eth_address)

    return private_key, checksum_address


# Combine both functionalities
mnemonic = generate_mnemonic()
private_key, address = generate_ethereum_address(mnemonic)

print("Generated Ethereum Address Details:")
print("Mnemonic Phrase:", mnemonic)
print("Private Key:", private_key)
print("Ethereum Address:", address)
