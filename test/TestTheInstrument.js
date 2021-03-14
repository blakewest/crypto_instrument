/* global web3 */
const hre = require("hardhat")
const {artifacts} = hre
const chai = require("chai")
const BN = require("bn.js")
chai.use(require("chai-bn")(BN))
chai.use(require("chai-as-promised"))
const expect = chai.expect
const TheInstrument = artifacts.require("TheInstrument")
const ERC721 = artifacts.require("ERC721")

describe("TheInstrument", async () => {
  let person1
  describe("it is deployed", async() => {
    it("should be deployable", async() => {
      const instrument = await TheInstrument.new()
      return expect(instrument.cells(0)).to.be.fulfilled
    })
  })

  describe("Claiming a cell", () => {
    let instrument, sound
    beforeEach(async () => {
      [person1] = await web3.eth.getAccounts()
      instrument = await TheInstrument.new()
      sound = await ERC721.new("MySound", "SND")
    })
    it("Should let you claim it", async () => {
      await instrument.claimCell(0, sound.address, {from: person1})
      const cell = await instrument.cells(0)
      expect(cell.owner).to.eq(person1)
      expect(cell.sound).to.eq(sound.address)
    })
  })
})
