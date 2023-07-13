const returnCombinations = require(`./task1.js`);


test (`Output from 12345 should be [3,4,5,6,5,6,7,7,8,9]`, () => {
    expect(returnCombinations(12345)).toEqual([3,4,5,6,5,6,7,7,8,9]);
});

test (`Output from 123 should be [3,4,5]`, () => {
    expect(returnCombinations(123)).toEqual([3,4,5]);
});
