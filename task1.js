

function returnCombinations (number) {
    //split the number into separate digits to iterate through them with a for loop
    //convert the input number to a string first as .split() doesn't work on numbers
    const array = number.toString().split("");

    //set up an empty array to hold all the sums of each digit
    const combinations = [];

    //first for loop, going from the first number in the array (0) until the end/length of the array
    for (let i=0; i< array.length; i++) {

        //second for loop, so that for each number I can loop through the remaining numbers to add them together
        //start the second loop at the number after i
        for (let x=i+1; x<array.length; x++) {

            //create sum variable to store the result of each addition
            //parse each number back into an integer as they were converted to strings when splitting
            /*add each number to the numbers after it - no need to loop back through previous numbers 
            as they will have already been added, and numbers are not added to themselves (e.g. no 2+2, and 
                2+1 is already covered by 1+2 in the previous pass through the loop) */
            let sum = parseInt(array[i]) + parseInt(array[x]);
            
            //push each sum into the combinations array
            combinations.push(sum);
        }
    }
    //once the for loops have completed, return the array of possible combinations
    return combinations;
}

//console log to initially test the output is correct for the example number 12345
// console.log(returnCombinations(12345));

module.exports = returnCombinations;