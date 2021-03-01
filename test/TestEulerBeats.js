/* global web3 */
const hre = require("hardhat")
const {artifacts} = hre
const chai = require("chai")
const BN = require("bn.js")
chai.use(require("chai-bn")(BN))
chai.use(require("chai-as-promised"))
const expect = chai.expect
const EulerBeats = artifacts.require("EulerBeats")

describe("EulerBeats", async () => {
  describe("it is deployed", async() => {
    it("should be deployable", async() => {
      const beats = await EulerBeats.new("https://www.google.com")
      expect(await beats.mintPrice()).to.bignumber.eq(new BN(271).mul(new BN(String(1e15))))
    })
  })
})
