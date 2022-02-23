const { expect } = require("chai")
const awsFunctions = require("../router/awsFunctions")
 const {scanDB} = awsFunctions
 const globalTests = require("./globalTests")
 const {testingTypes} = globalTests
// scan db tests
describe("ScanDB function first argument must be a string",() => {
  testingTypes(scanDB,"string","ScanDB's parameter Table name")
})


describe("ScanDB function last argument must be a string",() => {
it("testing ScanDB function last argument with a number", async() => {
  expect(await scanDB("123","hi",3)).to.equal(`ScanDB's parameter filterProp must be a string recieved a(n) number`)
})

it("testing ScanDB function last argument with an array", async() => {
  expect(await scanDB("123","hi",[])).to.equal(`ScanDB's parameter filterProp must be a string recieved a(n) array`)
})

it("testing ScanDB function last argument with an object", async() => {
  expect(await scanDB("123","hi",{})).to.equal(`ScanDB's parameter filterProp must be a string recieved a(n) object`)
})

it("testing ScanDB function last argument with undefined", async() => {
  expect(await scanDB("123","hi")).to.equal(`ScanDB's parameter filterProp must be a string recieved a(n) undefined`)
})

it("testing ScanDB function last argument with null", async() => {
  expect(await scanDB("123","hi",null)).to.equal(`ScanDB's parameter filterProp must be a string recieved a(n) null`)
})

it("testing ScanDB function last argument with boolean", async() => {
  expect(await scanDB("123","hi",true)).to.equal(`ScanDB's parameter filterProp must be a string recieved a(n) boolean`)
})

})
