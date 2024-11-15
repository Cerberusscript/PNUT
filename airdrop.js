const contractAddress = 'YOUR_AIRDROP_CONTRACT_ADDRESS';
const tokenAddress = 'YOUR_PNUT_TOKEN_ADDRESS';
const airdropContractABI = [ /* ABI of the airdrop contract */ ];
const web3 = new Web3(window.ethereum);
let userAccount;

// Get elements
const connectWalletBtn = document.getElementById('connect-walle');
const claimAirdropBtn = document.getElementById('claim-airdrop');
const statusDisplay = document.getElementById('status');

// Connect to MetaMask
async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAccount = accounts[0];
    document.getElementById('wallet-address').innerText = `Connected: ${userAccount}`;
    claimAirdropBtn.disabled = false;
    connectWalletBtn.disabled = true;
}

// Claim the airdrop
async function claimAirdrop() {
    const airdropContract = new web3.eth.Contract(airdropContractABI, contractAddress);

    try {
        statusDisplay.textContent = "Processing...";

        // Call the claimAirdrop function of the contract
        await airdropContract.methods.claimAirdrop().send({ from: userAccount });

        statusDisplay.textContent = "Airdrop Claimed! 🎉";
    } catch (error) {
        statusDisplay.textContent = "Error: " + error.message;
    }
}

connectWalletBtn.addEventListener('click', connectWallet);
claimAirdropBtn.addEventListener('click', claimAirdrop);
