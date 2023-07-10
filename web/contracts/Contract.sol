// SPDX-License-Identifier: MIT


pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";



contract MusicMarket is Ownable {
    struct Music {
        uint256 id;
        string title;
        address artist;
        uint256 price;
        string fileCID; // Filecoin CID for the music file
        uint256 royaltyPercentage; // Royalty percentage for the artist (0-100)
        mapping(address => bool) ownerships; // Mapping of ownerships to verify ownership
        mapping(string => bool) ownershipStrings; // Mapping of ownership strings to verify ownership
        string[] usedOwnershipStrings; // Array to keep track of used ownership strings
    }

    mapping(uint256 => Music) public musicListings;
    uint256 public totalListings;
    address private filecoinLibraryAddress; // Address of the deployed FilecoinLibrary contract

    event MusicAdded(uint256 indexed id, string title, address indexed artist, uint256 price, string fileCID, uint256 royaltyPercentage);
    event MusicPurchased(uint256 indexed id, string title, address indexed buyer, uint256 price, string ownershipString);
    event RoyaltyPaid(uint256 indexed id, string title, address indexed royaltyRecipient, uint256 amount);
    event OwnershipVerified(uint256 indexed id, string title, address indexed owner);

    modifier onlyOwnerOf(uint256 _id) {
        require(musicListings[_id].ownerships[msg.sender], "Caller is not the owner of the music or does not have permission to perform this action");
        _;
    }

    constructor(address _filecoinLibraryAddress) {
        filecoinLibraryAddress = _filecoinLibraryAddress;
    }

    function addMusic(string memory _title, uint256 _price, string memory _fileCID, uint256 _royaltyPercentage) external {
        require(_royaltyPercentage <= 100, "Invalid royalty percentage");

        uint256 id = totalListings + 1;
        Music storage newMusic = musicListings[id];
        newMusic.id = id;
        newMusic.title = _title;
        newMusic.artist = msg.sender;
        newMusic.price = _price;
        newMusic.fileCID = _fileCID;
        newMusic.royaltyPercentage = _royaltyPercentage;

        totalListings++;

        emit MusicAdded(id, _title, msg.sender, _price, _fileCID, _royaltyPercentage);
    }

    function purchaseMusic(uint256 _id) external payable {
        Music storage music = musicListings[_id];
        require(music.id != 0, "Music not found");
        require(msg.value >= music.price, "Insufficient payment");

        // Calculate royalty amount
        uint256 royaltyAmount = (msg.value * music.royaltyPercentage) / 100;

        // Transfer payment to the artist
        address payable artist = payable(music.artist);
        artist.transfer(msg.value - royaltyAmount);

        // Generate ownership string
        string memory ownershipString = generateOwnershipString(_id);

        // Store ownership string in the mapping
        music.ownerships[msg.sender] = true;
        music.ownershipStrings[ownershipString] = true;
        music.usedOwnershipStrings.push(ownershipString);

        emit MusicPurchased(_id, music.title, msg.sender, music.price, ownershipString);
        emit RoyaltyPaid(_id, music.title, artist, royaltyAmount);

        // Store the music file using Filecoin
       
    }

    function verifyOwnership(uint256 _id, string memory _ownershipString) external {
        Music storage music = musicListings[_id];
        require(music.ownerships[msg.sender], "Caller is not the owner of the music");
        require(music.ownershipStrings[_ownershipString], "Invalid ownership string");

        // Delete ownership string to make it one-time use
        delete music.ownershipStrings[_ownershipString];

        emit OwnershipVerified(_id, music.title, msg.sender);
    }

    function generateOwnershipString(uint256 _id) view private returns (string memory) {
        string memory ownershipString = bytes32ToString(bytes32(uint256(keccak256(abi.encodePacked(msg.sender, _id, block.timestamp)))));
        return ownershipString;
    }

    function bytes32ToString(bytes32 _bytes32) private pure returns (string memory) {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }
}
