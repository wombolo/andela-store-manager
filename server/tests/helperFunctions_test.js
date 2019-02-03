import assert from 'assert';
import Helpers from '../controllers/Helpers';

const requestBody = {
  title:'title',
  description:'title',
  price:23, quantity:2,
};
const incorrectRequestBody = {
  title:'title',
  description:'title',
  price:'__',
  quantity:2,
};
const wrongRequestBody = {
  title:'title',
  description:'title',
  quantity:2,
};

describe('Helper functions', function () {
  describe('validate request Body Parameters', function(){

    it('should return true if requestBody is complete', function(){
      const errors = Helpers.validateBodyParamsForCreating(requestBody);
      assert.strictEqual(errors, false);
    });

    it('should return error if any param for requestBody is incorrect', function(){
      const errors = Helpers.validateBodyParamsForCreating(incorrectRequestBody);
      assert.strictEqual(errors[0], 'Price is not a number.');
    });

    it('should return error if requestBody is incomplete', function(){
      const errors = Helpers.validateBodyParamsForCreating(wrongRequestBody);
      assert.strictEqual(errors[0], 'Price is missing. Product not created');
    });
  });
});
