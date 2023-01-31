// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Proxiable {
    function updateCodeAddress(address newAddress) internal {
        require(
            bytes32(0x0ace2c25bb383249161e7ce2b603cc2099f18f7cefd966581720af688cca9045) == Proxiable(newAddress).proxiableUUID(),
            "Not compatible"
        );
        assembly { 
            sstore(0x0ace2c25bb383249161e7ce2b603cc2099f18f7cefd966581720af688cca9045, newAddress)
        }
    }

    function proxiableUUID() public pure returns (bytes32) {
        return 0x0ace2c25bb383249161e7ce2b603cc2099f18f7cefd966581720af688cca9045;
    }
} 