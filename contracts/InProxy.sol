// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract InProxy {
    constructor(bytes memory constructData, address contractLogic) { 
        assembly { 
            sstore(0x0ace2c25bb383249161e7ce2b603cc2099f18f7cefd966581720af688cca9045, contractLogic)
        }
        (bool success, bytes memory result ) = contractLogic.delegatecall(constructData); 
        require(success, "Construction failed");
    }

    fallback() external payable {
        assembly {
            let inNFT := sload(0x0ace2c25bb383249161e7ce2b603cc2099f18f7cefd966581720af688cca9045)
            calldatacopy(0x0, 0x0, calldatasize())

            let success := delegatecall(sub(gas(), 10000), inNFT, 0x0, calldatasize(), 0, 0)
            
            let retSz := returndatasize()
            returndatacopy(0, 0, retSz)

            switch success
            case 0 {
                revert(0, retSz)
            }
            default {
                return(0, retSz)
            }
        }
    }
}
