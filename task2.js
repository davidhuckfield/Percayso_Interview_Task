
//I needed a helper function to calculate the factorial of a number in order to use it for the calculation of combinations from a number
function calculateFactorial (number) {

    //factorials cannot be calculated for negative numbers, and negative inputs are handled in the other functions, 
    //so for inputs less than 0 I return -1 so as not to cause any errors by returning an error string or similar
    if (number < 0) {return-1}

    //else if the number is 0, the factorial is 1
    else if (number === 0) {return 1}

    //else for any other number, start from 1 and multiply by each subsequent number up to the input number
    else {
        let factorial = 1;
        for (let i=1; i<= number; i++) {
            factorial *=i;
        }
        return factorial;
    }
    
}

//the below function CombinationsFromNumber calculates the number of possible combinations from an input of the number itself, e.g. 12345
//while this particular function wasn't strictly necessary for the final solution it was necessary for my thought process / testing and
// led to the function immediately below it

function combinationsFromNumber (number) {

    //convert the input number into a string so as to be able to use .length(), and find the number of digits
    let numberOfDigits = number.toString().length;

    //if the number is 1 or less, no combinations are possible
    if (numberOfDigits<=1) {return 0;}

    //declare how many digits should be added together in each combination, for the sake of the equation
    let digitsInCombo = 2;

    //this equation is used to calculate how many possible combinations there are of a given number of digits, and number of digits in the combination
    //(I was aware of this equation from using it in my previous employment)
    let combinations = calculateFactorial(numberOfDigits) / (calculateFactorial(digitsInCombo) * calculateFactorial(numberOfDigits - digitsInCombo));

    //returns the number of possible combinations, e.g. for 12345, a 5-digit number, it will return 10
    return combinations;
}

//the below function is a modified form of the previous one, which takes in the number of digits directly rather than calculating it from the length of the input number
// I needed this as a helper function to use in the next function to calculate how many digits the original number has, given the number of possible combinations
function combinationsFromNumberOfDigits (numberOfDigits) {

    //otherwise it uses exactly the same logic as the function above
    if (numberOfDigits<=1) {return 0;}
    let digitsInCombo = 2;
    let combinations = calculateFactorial(numberOfDigits) / (calculateFactorial(digitsInCombo) * calculateFactorial(numberOfDigits - digitsInCombo));
    return combinations;
}

//the below function takes in the number of possible combinations, and returns the number of digits in the number that generated those combinations
function numberOfDigits (combinations) {

    //start the number of digits at 0;
    let numberOfDigits = 0;

    //while loop cycles through each number of digits 1 at a time, checks how many combinations result from a 
    //number with that many digits, and then increments the count by 1
    while (combinationsFromNumberOfDigits(numberOfDigits) < combinations) {
        numberOfDigits++;
    }

    //when the returned number of combinations matches the input number, the correct number of digits has been found and the while loop ends
    return numberOfDigits;
}

//this function takes in an array of combinations, and returns an object with arrays of numbers each combination could possibly be made up of
function findPossibleCombinationValues (combinations) {

    //create an empty object to store possible combined values for each combination
    const possibleValues = {}

    //populate the possible values object with key-value pair for each combination in the input array
    //create empty array to store each possible value that might have made up the combination
    for (let i=1; i<combinations.length; i++) {
        possibleValues[`combination${i}`] = [];
    }

    //for loop will go through each entry in the combinations array
    //create a variable to store the current key
    for (let i=0; i< combinations.length; i++) {
        const combination = `combination${i+1}`;

        //if the current key-value doesn't exist, create it as an empty array
        if (!possibleValues[combination]) {
            possibleValues[combination] = [];
        }

        //create a variable to store the current key's value array
        const valueArray = possibleValues[combination];

        //subtract y from each number, then iterate y by 1
        //declare each number pair as y and whatever is left when deducting y from the current combination
        for (let y=1; y <= combinations[i] / 2; y++) {
            const number1 = y;
            const number2 = combinations[i]-y;

            //if either of these numbers are not already in the array of possible numbers, push them
            if (!valueArray.includes(number1) && number1 !== number2) {
                valueArray.push(number1);
            }

            if (!valueArray.includes(number2) && number1 !== number2) {
                valueArray.push(number2);
            }
        }
    }
        return possibleValues;
    }

    function whichDigitsInEachCombo(combinations, originalNumberOfDigits) {

        const digitsInEachCombo = [];
      
        // Fill the digitsInEachCombo array with empty arrays for each combination
        for (let i = 0; i < combinations.length; i++) {
          digitsInEachCombo.push([]);
        }
      
       
        //push the digits into each nested array starting with 1 and ending with the number of digits in the original number
        //each time push one less digit into each array, to account for the fact that 1 digit will have already been covered by the previous sum/combination

          let currentIndex = 0;
          for (let x = 0; x < originalNumberOfDigits - 1; x++) {
            for (let count = 0; count < originalNumberOfDigits - 1 - x; count++) {
              digitsInEachCombo[currentIndex].push(x + 1);
              currentIndex++;
            }
        }

        //then push the second digit of each combination into the array - starting with how many times the loop has been repeated (initially 2), ending with originalNumberOfDigits
        //each time originalNumberOfDigits is reached, start the count/loop again from a number 1 higher
        //e.g. first populate 2,3,4,5 - then 3,4,5 - then 4,5 - then 5
        //this will give a nested array with the digits from the original number that make up each combination
        /* example structure
        [[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]]
        */

        return digitsInEachCombo;
      }

    function findOriginalNumber(combinations) {
        // Calculate the possible values for each combination using the helper function
        const possibleValues = findPossibleCombinationValues(combinations);
      
        // Calculate the number of digits in the original number using the helper function
        const originalNumberOfDigits = numberOfDigits(combinations.length);
      
        // Declare an empty array to store the possible digits of the original number
        const possibleDigits = [];
      
        //use the results of whichDigitsInEachCombo that finds which digits will be featured in each combination
        //compare this to the results from findPossibleCombinationValues to narrow down the possible digits

        //e.g. from a manual calculation, if the first combination from 12345 is 3, this could possibly have been made by adding 1+2 and no other numbers
        //digit 1 of the original number must therefore be 1 or 2, and digit 2 must also be 1 or 2.
        //combination 2 is 4, and is made up of digits 1 and 3, this cannot be 2+2 according to the rules of the question
        //it must therefore be made up of 1+3, meaning digit 1 and digit 3 could only be be 1 or 3
        //we already know that digit 1 cannot be 3, so it must be 1.
        //this means digit 2 can only be 2, as the only number that can be added to 1 to make combination 1 (value of 3)
        //this means digit 3 can only be 3, as digit 1 + digit 3 result in combination 2, which has a value of 4.

        //so on with this logic until all numbers are determined.

      }
      

    // console.log(findOriginalNumber([3,4,5,6,5,6,7,7,8,9]))
    // console.log(whichDigitsInEachCombo([3,4,5,6,5,6,7,7,8,9], 5))
    // console.log(findPossibleCombinationValues([3,4,5,6,5,6,7,7,8,9]))
