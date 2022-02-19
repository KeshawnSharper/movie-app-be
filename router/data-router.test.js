 const awsFunctions = require("./awsFunctions.js")
 const {scanDB} = awsFunctions
// scan db tests
const testingTypes = async (cb,idealType,functionComment) => {
  if (idealType !== "string"){
    test(`testing ${functionComment} with a string`,async () => {
      const res = await cb("123");
      expect(res).toBe(`${functionComment} must be a ${idealType} recieved a number`);
    })
  }
  if (idealType !== "number"){
    test(`testing ${functionComment} with a number`,async () => {
      const res = await cb(123);
      expect(res).toBe(`${functionComment} must be a ${idealType} recieved a number`);
    })
  }
  if (idealType !== "object"){
    test(`testing ${functionComment} with a object`,async () => {
      const res = await cb({});
      expect(res).toBe(`${functionComment} must be a ${idealType} recieved a object`);
    })
  }
}
describe("ScanDB function first argument must be a string",() => {
  testingTypes(scanDB,"string","ScanDB's parameter Table name")
})