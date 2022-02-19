 const awsFunctions = require("./awsFunctions.js")
 const {scanDB} = awsFunctions
// scan db tests
describe("AWS Functions", () => {
  it("first argument must be a string",async () => {
    const res = await scanDB(123);
    expect(res).toBe('Table name is not a string it is a number');
  })
})