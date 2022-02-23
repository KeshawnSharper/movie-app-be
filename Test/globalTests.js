
const testingTypes = async (cb,idealType,functionComment) => {
    if (idealType !== "string"){
      test(`testing ${functionComment} with a string`,async () => {
        const res = await cb("123");
        expect(res).toBe(`${functionComment} must be a ${idealType} recieved a(n) string`);
      })
    }
    if (idealType !== "number"){
      test(`testing ${functionComment} with a number`,async () => {
        const res = await cb(123);
        expect(res).toBe(`${functionComment} must be a ${idealType} recieved a(n) number`);
      })
    }
    if (idealType !== "object"){
      test(`testing ${functionComment} with a object`,async () => {
        const res = await cb({});
        expect(res).toBe(`${functionComment} must be a ${idealType} recieved a(n) object`);
      })
    }
    if (idealType !== "array"){
        test(`testing ${functionComment} with an array`,async () => {
          const res = await cb([]);
          expect(res).toBe(`${functionComment} must be a ${idealType} recieved a(n) array`);
        })
      }
  }

  const checkUser = (user) => {
  
  }

  module.exports = {testingTypes:testingTypes}