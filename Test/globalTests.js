
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

  const mockUserRegistration = (user) => {
    // create a new user registration
      // get the id from the last created user and add that to 1000
      // create a success user form 
    // remove that user  registration instantly

  
  }

  module.exports = {testingTypes:testingTypes}