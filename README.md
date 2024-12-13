<p align="center">
 <img width="1468" alt="Screenshot 2024-12-08 at 8 39 49 AM" src="https://github.com/user-attachments/assets/4975fe80-525b-4d9c-ab84-aa8b50a6ff45">    
</p>
<p align="center"><h1 align="center">ATHENA-WALLET</h1></p>
<p align="center">
	<h4 align="center">All Your AI DeFi in one Place! </h4>
</p>
<p align="center">
<!-- 	<img src="https://img.shields.io/github/license/soumikbaksi18/Athena-Wallet?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license"> -->
	<img src="https://img.shields.io/github/last-commit/soumikbaksi18/Athena-Wallet?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/soumikbaksi18/Athena-Wallet?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/soumikbaksi18/Athena-Wallet?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>
<br>

## 🔗 Table of Contents

- [📍 Overview](#-overview)
- [👾 Features](#-features)
- [🚀 UserFlow](#-userflow)
- [🚀 Architecture](#-architecture)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [☑️ Prerequisites](#-prerequisites)
  - [⚙️ Installation](#-installation)
  - [🤖 Usage](#🤖-usage)
  - [🧪 Testing](#🧪-testing)
- [📌 Project Roadmap](#-project-roadmap)
- [🔰 Contributing](#-contributing)
- [🎗 License](#-license)
- [🙌 Acknowledgments](#-acknowledgments)
- [🎥 Youtube](#-youtube)

---

## 📍 Overview
Our platform integrates a specialized, AI-assisted DeFi wallet with real-time data retrieval layers (RAG-driven models on LangChain) and a custom-built smart contract environment that emulates core functionalities of Uniswap-style AMMs and Compound-style lending protocols. This unified approach enables automated and semi-autonomous DeFi operations—such as liquidity provision, swapping, lending, and borrowing—executed intelligently and securely within a single cohesive framework.


**Value Proposition:**

By combining RAG-based market intelligence with AMM and lending protocols, the platform abstracts away the complexity of multi-step DeFi operations. It presents a technical proof-of-concept that a fully AI-integrated wallet can:  
- Dynamically provide liquidity  
- Automate asset swaps and portfolio adjustments  
- Perform yield-optimizing lending operations  
- Handle collateralized borrowing with robust guardrails

This harmonized approach leads to streamlined onboarding, enhanced risk management, and a frictionless user experience, ultimately driving more efficient and accessible DeFi participation.

---

## 👾 Features
1. **AI-Driven Market Analytics:**  
   Leveraging a Retrieval Augmented Generation (RAG) model integrated with LangChain, the system continuously indexes live market data from decentralized exchanges (DEXs) and lending protocols. This ensures that the AI layer provides timely, context-aware strategies—including portfolio comparisons, yield optimization, and risk assessments—without user intervention.

2. **Autonomous and Intent-Based Operations:**  
   Users can execute operations like transferring tokens, swapping assets, providing liquidity, or borrowing against collateral through natural language instructions. The AI component interprets user commands, understands current market conditions, and proposes optimal transaction paths. The user maintains ultimate control by setting spending caps, collateralization thresholds, and approval checks.

3. **Automated Market Maker Integration (Uniswap-Style):**  
   We implement a simplified AMM pool architecture that mimics Uniswap’s core logic.  
   - **Liquidity Provision:** Users supply “Chill” tokens and ETH, receiving LP tokens proportional to their liquidity share.  
   - **Token Swaps:** The AMM curve allows automated swaps between Chill and ETH, dynamically adjusting based on the pool’s reserves.

   This AMM model ensures continuous liquidity and price discovery. By integrating with the AI layer, the wallet can automatically suggest when to provide liquidity or rebalance based on on-chain data.

4. **Lending and Borrowing (Compound-Style):**  
   Our lending component is a reduced version of Compound’s logic, supporting:  
   - **USDC Deposits for Yield:** Users lock USDC to earn interest from a lending pool.  
   - **Collateralized Loans via LP Tokens:** LP tokens from the AMM can be pledged as collateral. Borrowers can draw up to 80% of the LP token’s value in USDC. Failure to repay triggers liquidation of the collateralized LP tokens.

   Integrating these functionalities into the AI framework allows the wallet to recommend lending opportunities or borrowing strategies, guided by dynamic interest rates, liquidity conditions, and user-defined risk parameters.

5. **On-Chain Transaction Execution via AI:**
   The system demonstrates that given the ABI and contract addresses of EVM-compatible swap and lending protocols, the AI layer can seamlessly interact with these contracts. By parsing user requests and current market conditions, it can generate and execute on-chain transactions—provisioning liquidity, performing swaps, initiating deposits, or taking loans—while maintaining user-defined security and regulatory constraints.


---
## 🚀 Userflow
<img width="1465" alt="Screenshot 2024-12-08 at 9 15 40 AM" src="https://github.com/user-attachments/assets/ce3f9904-008a-4068-9bf5-0c1ef564de85">

---
## 📁 Architecture
<img width="1478" alt="Screenshot 2024-12-08 at 9 21 42 AM" src="https://github.com/user-attachments/assets/90fa569b-734c-4330-9560-b76a3d08b252">

---

## 📁 Project Structure

```sh
└── Athena-Wallet/
    ├── Athena-UI
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public
    │   ├── src
    │   ├── tailwind.config.js
    │   └── vite.config.js
    ├── Athena-backend-chat
    │   ├── .DS_Store
    │   ├── Dockerfile
    │   ├── app.py
    │   ├── docker-compose.yml
    │   ├── memonics_generate.py
    │   ├── oldwallet.txt
    │   ├── requirements.txt
    │   └── wallet_data.txt
    └── EthAI
        ├── .dockerIgnore
        ├── .gitIgnore
        ├── Dockerfile
        ├── data
        ├── docker-compose.yml
        ├── main.py
        ├── models
        ├── requirements.txt
        └── services
```


### 📂 Project Index
<details open>
	<summary><b><code>ATHENA-WALLET/</code></b></summary>
	<details> <!-- Athena-backend-chat Submodule -->
		<summary><b>Athena-backend-chat</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/oldwallet.txt'>oldwallet.txt</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/wallet_data.txt'>wallet_data.txt</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/app.py'>app.py</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/requirements.txt'>requirements.txt</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/memonics_generate.py'>memonics_generate.py</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/docker-compose.yml'>docker-compose.yml</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-backend-chat/Dockerfile'>Dockerfile</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- EthAI Submodule -->
		<summary><b>EthAI</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/.dockerIgnore'>.dockerIgnore</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/main.py'>main.py</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/requirements.txt'>requirements.txt</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/.gitIgnore'>.gitIgnore</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/docker-compose.yml'>docker-compose.yml</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/Dockerfile'>Dockerfile</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>models</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/models/lstm_model.py'>lstm_model.py</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>services</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/services/predictor.py'>predictor.py</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/services/data_preprocessor.py'>data_preprocessor.py</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/EthAI/services/data_fetcher.py'>data_fetcher.py</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- Athena-UI Submodule -->
		<summary><b>Athena-UI</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/postcss.config.js'>postcss.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/package-lock.json'>package-lock.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/tailwind.config.js'>tailwind.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/vite.config.js'>vite.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/package.json'>package.json</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/index.html'>index.html</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/eslint.config.js'>eslint.config.js</a></b></td>
				<td><code>❯ REPLACE-ME</code></td>
			</tr>
			</table>
			<details>
				<summary><b>src</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/index.css'>index.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/App.css'>App.css</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/providers.tsx'>providers.tsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/App.jsx'>App.jsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/main.jsx'>main.jsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/App_Old.jsx'>App_Old.jsx</a></b></td>
						<td><code>❯ REPLACE-ME</code></td>
					</tr>
					</table>
					<details>
						<summary><b>old_component</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/TransferComponent.jsx'>TransferComponent.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/WalletLoginComponent.jsx'>WalletLoginComponent.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/SwapComponent.jsx'>SwapComponent.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/WalletComponent.jsx'>WalletComponent.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/WalletInitializationComponent.jsx'>WalletInitializationComponent.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/PortfolioComponent.jsx'>PortfolioComponent.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/old_component/chat.jsx'>chat.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>components</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/components/CreateLiquidity.jsx'>CreateLiquidity.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/components/AppBar.tsx'>AppBar.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/components/Header.tsx'>Header.tsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>pages</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/AIChat.jsx'>AIChat.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/Login.jsx'>Login.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/Market.jsx'>Market.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/LiquidityPool.jsx'>LiquidityPool.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/InsideOverview.jsx'>InsideOverview.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/Dashboard.jsx'>Dashboard.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/AddContact.jsx'>AddContact.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/Portfolio.jsx'>Portfolio.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/soumikbaksi18/Athena-Wallet/blob/master/Athena-UI/src/pages/ImportWallet.jsx'>ImportWallet.jsx</a></b></td>
								<td><code>❯ REPLACE-ME</code></td>
							</tr>
							</table>
						</blockquote>
					</details>
				</blockquote>
			</details>
		</blockquote>
	</details>
</details>

---

## 🚀 Getting Started

### ☑️ Prerequisites

Before getting started with Athena-Wallet, ensure your runtime environment meets the following requirements:

- **Programming Language:** JavaScript
- **Package Manager:** Pip, Npm
- **Container Runtime:** Docker


### ⚙️ Installation

Install Athena-Wallet using one of the following methods:

**Build from source:**

1. Clone the Athena-Wallet repository:
```sh
❯ git clone https://github.com/soumikbaksi18/Athena-Wallet/
```

2. Navigate to the project directory:
```sh
❯ cd Athena-Wallet
```

3. Install the project dependencies:



**Using `pip`** &nbsp; [<img align="center" src="" />]()

```sh
❯ echo 'INSERT-INSTALL-COMMAND-HERE'
```


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker build -t soumikbaksi18/Athena-Wallet .
```




### 🤖 Usage
Run Athena-Wallet using the following command:
**Using `pip`** &nbsp; [<img align="center" src="" />]()

```sh
❯ echo 'INSERT-RUN-COMMAND-HERE'
```


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm start
```


**Using `docker`** &nbsp; [<img align="center" src="https://img.shields.io/badge/Docker-2CA5E0.svg?style={badge_style}&logo=docker&logoColor=white" />](https://www.docker.com/)

```sh
❯ docker run -it {image_name}
```


### 🧪 Testing
Run the test suite using the following command:
**Using `pip`** &nbsp; [<img align="center" src="" />]()

```sh
❯ echo 'INSERT-TEST-COMMAND-HERE'
```


**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm test
```


---

## 🔰 Contributing

- **💬 [Join the Discussions](https://github.com/soumikbaksi18/Athena-Wallet/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/soumikbaksi18/Athena-Wallet/issues)**: Submit bugs found or log feature requests for the `Athena-Wallet` project.
- **💡 [Submit Pull Requests](https://github.com/soumikbaksi18/Athena-Wallet/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/soumikbaksi18/Athena-Wallet/
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/soumikbaksi18/Athena-Wallet/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=soumikbaksi18/Athena-Wallet">
   </a>
</p>
</details>

---

## 🎗 License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

## 🙌 Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---

## 🙌 Youtube

- [https://www.youtube.com/watch?v=mzFSWMgn2j8](https://www.youtube.com/watch?v=mzFSWMgn2j8)
- [https://youtu.be/a4KHvVjlIYs](https://youtu.be/a4KHvVjlIYs)

---
