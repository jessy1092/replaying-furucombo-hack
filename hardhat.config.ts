import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const config: HardhatUserConfig = {
	solidity: '0.8.17',
	networks: {
		hardhat: {
			chainId: 1,
			// blockGasLimit: 1_500_000_000,
			forking: {
				url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_FORK_API_KEY}`,
				blockNumber: 11940499, // setup before 11940500
				enabled: true,
			},
			allowUnlimitedContractSize: true,
		},
	},
	typechain: {
		outDir: 'test-types', // For hardhat testing usage
		target: 'ethers-v5',
	},
};

export default config;
