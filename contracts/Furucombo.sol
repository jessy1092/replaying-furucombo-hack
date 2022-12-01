// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IRegistry {
	function infos(address) external view returns (bytes32);

	function isValid(address handler) external view returns (bool result);
}

interface IProxy {
	/**
	 * @notice Combo execution function. Including three phases: pre-process,
	 * exection and post-process.
	 * @param tos The handlers of combo.
	 * @param configs The configurations of executing cubes.
	 * @param datas The combo datas.
	 */
	function batchExec(
		address[] memory tos,
		bytes32[] memory configs,
		bytes[] memory datas
	) external payable;
}

// https://etherscan.io/address/0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9#code
interface IAaveProxy {
	function initialize(address _logic, bytes memory _data) external payable;
}
