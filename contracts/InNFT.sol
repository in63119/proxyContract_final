// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "./Proxiable.sol";

contract InNFT is ERC721URIStorage, Ownable, Proxiable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private proxyContract;
    address public projectOwner;

    constructor() public ERC721("InNFT", "INFT") {}

    function mintNFT(address recipient, string memory tokenURI) public returns (uint256)
    {
        require(proxyContract != address(0), "proxyContract == address(0)");
        require(
            msg.sender == proxyContract,
            "msg.sender Error : Not HouseCore Address"
        );
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function init() public {
        require(projectOwner == address(0), "Already initalized");
        projectOwner = msg.sender;
    }

    function updateCode(address newCode) public onlyOwner {
        updateCodeAddress(newCode);
    }

    function setContractAddress(address _proxyContract) external {
        require(projectOwner == msg.sender, "Callet is not the project owner!");

        proxyContract = _proxyContract;
    }
}