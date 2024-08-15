// const { expect } = require("chai")
// const awsFunctions = require("../router/awsFunctions")
//  const {scanDB} = awsFunctions
//  const globalTests = require("./globalTests")
//  const {testingTypes} = globalTests


// // // uncomment this with AWS credentials
// // // scan db tests
// // // describe("ScanDB function first argument must be a string",() => {
// // //   testingTypes(scanDB,"string","ScanDB's parameter Table name")
// // // })

// describe("ScanDB function last argument must be a string",() => {
// it("testing ScanDB function last argument with an array", async() => {
//   let scannedDB = await scanDB("123","hi",[])
//   expect(scannedDB).to.be.an("object").to.deep.include({total_items:[],selected_items:[],message:`ScanDB's parameter filterProp must be a string recieved a(n) array`,status:false})
// })

// it("testing ScanDB function last argument with an object", async() => {
//   let scannedDB = await scanDB("123","hi",{})
//   expect(scannedDB).to.be.an("object").to.deep.include({total_items:[],selected_items:[],message:`ScanDB's parameter filterProp must be a string recieved a(n) object`,status:false})
// })

// it("testing ScanDB function last argument with undefined", async() => {
//   let scannedDB = await scanDB("123","hi")
//   expect(scannedDB).to.be.an("object").to.deep.include({total_items:[],selected_items:[],message:`ScanDB's parameter filterProp must be a string recieved a(n) undefined`,status:false})
// })

// it("testing ScanDB function last argument with null", async() => {
//   let scannedDB = await scanDB("123","hi",null)
//   expect(scannedDB).to.be.an("object").to.deep.include({total_items:[],selected_items:[],message:`ScanDB's parameter filterProp must be a string recieved a(n) null`,status:false})
// })
// it("testing ScanDB function last argument with boolean", async() => {
//   let scannedDB = await scanDB("123","hi",false)
//   expect(scannedDB).to.be.an("object").to.deep.include({total_items:[],selected_items:[],message:`ScanDB's parameter filterProp must be a string recieved a(n) boolean`,status:false})
// })

// })


// // // comment this out when you insert aws credentials
// // // describe("ScanDB should return a message that says invalid creds when the config is invalid", async() => {
// // //   it("ScanDB should return a message that says invalid creds when the config is invalid",async() => {
// // //     let scannedDB = await scanDB("Movie-Application-users")
// // //     expect(scannedDB).to.be.an("object").to.deep.include({total_users:[],selected_users:[],message:`ConfigError`,status:false})
// // //   })
// // // })

