import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils';
import { ethers, network } from 'hardhat';

// import { DangerContract, DangerContract__factory, TestERC20 } from '../test-types';

// https://etherscan.io/address/0x86765dde9304bea32f65330d266155c4fa0c4f04
const ATTACKER_CONTRACT = '0x86765dde9304bEa32f65330d266155c4fA0C4F04';
const ATTACKER = '0xb624E2b10b84a41687caeC94BDd484E48d76B212';

const AAVE_CONTRACT = '';

// https://etherscan.io/address/0x17e8Ca1b4798B97602895f63206afCd1Fc90Ca5f#code
const FURUCOMBO_CONTRACT = '0x17e8Ca1b4798B97602895f63206afCd1Fc90Ca5f';

describe('Simulate Furucombo', () => {
	let attacker: SignerWithAddress;

	before(async () => {
		// maker = liquidity provider
		// trader = taker

		// Setup attacker
		await network.provider.request({
			method: 'hardhat_impersonateAccount',
			params: [ATTACKER],
		});
		attacker = await ethers.getSigner(ATTACKER);

		// const attackerContract = ethers.getContractAt();
	});

	it('Exploit', async () => {});

	after(async () => {
		expect(attacker.address).to.equal(ATTACKER);
	});
});
