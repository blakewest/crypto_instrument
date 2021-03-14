// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.6.8;
pragma experimental ABIEncoderV2;

/**
 * @title A blockchain powered public-commons instrument, which can produce, mint, and
  trade tracks.
 * @notice This contract provides the main functions allowing for minting, and remixing of tracks.
  It also handles the ownership of slots within the community instrument
*/
contract TheInstrument {
  struct Cell {
    address owner;
    address sound;
  }
  mapping(uint256 => Cell) public cells;
  uint256 constant MAX_CELLS = 64;

  function claimCell(uint256 index, address sound) public {
    require(index < MAX_CELLS, "Cell index out of range");
    require(cells[index].owner == address(0), "Cell slot already purchased");

    Cell memory _cell = Cell(msg.sender, sound);
    cells[index] = _cell;
  }
}