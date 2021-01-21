"use strict"

// let hasDriversLicense = false
// const passTest = true

// if (passTest) hasDriverLicense = true
// if (hasDriversLicense) console.log("Pedal to the metal!")

// Flags future reserved words
// const interface = "Audio"
// const private = 1234

// function logger() {
//   // function body! - what runs when you run this function 🙌
//   console.log("👻")
// }

// logger()

// function fruitProcessor(apples, oranges) {
//   console.log(apples, oranges)
//   const juice = `Juice with ${apples} apples and ${oranges} oranges!`
//   return juice
// }
// console.log(fruitProcessor(6, 9))
// const someJuice = fruitProcessor(50, 60)
// console.log(someJuice)

/*
Back to the two gymnastics teams, the Dolphins and the Koalas! There is a new gymnastics discipline, which works differently.

 - Each team competes 3 times, 
   and then the average of the 3 scores is calculated (so one average score per team).

 - A team ONLY wins if it has at least DOUBLE the average score of the other team. Otherwise, no team wins!

1. Create an arrow function 'calcAverage' to calculate the average of 3 scores
2. Use the function to calculate the average for both teams
3. Create a function 'checkWinner' 
 - that takes the average score of each team as parameters ('avgDolhins' and 'avgKoalas'), and 
 - then logs 
   the winner to the console, 
   together with the victory points, according to the rule above. 
   - Example: "Koalas win (30 vs. 13)".
4. Use the 'checkWinner' function to determine the winner for both DATA 1 and DATA 2.
5. Ignore draws this time.

TEST DATA 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49
TEST DATA 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27

HINT: To calculate average of 3 values, add them all together and divide by 3
HINT: To check if number A is at least double number B, check for A >= 2 * B. Apply this to the team's average scores 😉

GOOD LUCK 😀


// each team has their 3 scores averaged
// a team only wins if they have double the average score of the other

const calcAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3

// test 1
// const dAvgScore = calcAverage(44, 23, 71)
// const kAvgScore = calcAverage(65, 54, 49)
// test 2
const dAvgScore = calcAverage(85, 54, 41)
const kAvgScore = calcAverage(23, 34, 27)

// function checkWinner(avgD, avgK) {
const checkWinner = function (avgD, avgK) {
  console.log(avgD)
  console.log(avgK)
  if (avgD / avgK >= 2) {
    return `Dolhpins win! (${avgD} vs. ${avgK})`
  } else if (avgK / avgD >= 2) {
    return `Koalas win! (${avgK} vs. ${avgD})`
  } else {
    return "They both suck..."
  }
}

console.log(checkWinner(dAvgScore, kAvgScore))
*/

///////////////////////////////////////
// Coding Challenge #2

/*
Steven is still building his tip calculator, using the same rules as before: 
 - Tip 15% of the bill if the bill value is between 50 and 300, and 
 - if the value is different, the tip is 20%.

1. Write a function 'calcTip' that takes any bill value as an input 
  - and returns the corresponding tip, 
    calculated based on the rules above (you can check out the code from first tip calculator challenge if you need to). 
  - Use the function type you like the most. 
    Test the function using a bill value of 100.
2. And now let's use arrays! 
 - So create an array 'bills' containing the test data below.
3. Create an array 'tips' containing the tip value for each bill, calculated from the function you created before.
4. BONUS: Create an array 'total' containing the total values, so the bill + tip.

TEST DATA: 125, 555 and 44

HINT: Remember that an array needs a value in each position, and that value can actually be the returned value of a function! So you can just call a function as array values (so don't store the tip values in separate variables first, but right in the new array) 😉

GOOD LUCK 😀
*/

// function calcTip(bill) {
//   if (bill > 50 && bill < 300) {
//     tip = 0.15
//   } else {
//     tip = 0.2
//   }

//   return bill * tip
// }

// let tip
// const bill = 300
// const bills = [125, 555, 44]
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])]
// const total = [calcTip(bills[0]) + bills[0], calcTip(bills[1]) + bills[1], calcTip(bills[2]) + bills[2]]

// console.log(calcTip(100))
// console.log(tips)
// console.log(total)

///////////////////////////////////////
// Coding Challenge #3

/*
Let's go back to Mark and John comparing their BMIs! This time, let's use objects to implement the calculations! Remember: BMI = mass / height ** 2 = mass / (height * height). (mass in kg and height in meter)

1. For each of them, create an object with properties for their full name, mass, and height (Mark Miller and John Smith)
*/
// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   /* 2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method. */
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2
//     return this.bmi
//   }
// }
// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,
//   /* 2. Create a 'calcBMI' method on each object to calculate the BMI (the same method on both objects). Store the BMI value to a property, and also return it from the method. */
//   calcBMI: function () {
//     this.bmi = this.mass / this.height ** 2
//     return this.bmi
//   }
// }
// /*
// 3. Log to the console who has the higher BMI, together with the full name and the respective BMI. Example: "John Smith's BMI (28.3) is higher than Mark Miller's (23.9)!"
//  -TEST DATA: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.
// */

// // first you have to run the function so the bmi prop exists on each object
// mark.calcBMI()
// john.calcBMI()
// // then you can just use the bmi property :)
// console.log(mark.bmi)
// console.log(john.bmi)

// if (mark.bmi > john.bmi) {
//   console.log(`${mark.fullName} has the highest BMI of ${Math.round(mark.bmi)}`)
// } else {
//   console.log(`${john.fullName} has the highest BMI of ${Math.round(john.bmi)}`)
// }

// /////// fun with loops
// const arrayOfNonsense = ["👻", "🍔", "🐄", "🔥"]
// const newArrayOfNonsense = []

// for (let i = 0; i < arrayOfNonsense.length; i++) {
//   // if (i % 2 === 0) continue //- forget this iteration
//   // if (i === 1) break //- forget this whole loop

//   console.log(arrayOfNonsense[i])
//   newArrayOfNonsense.unshift(arrayOfNonsense[i])
//   newArrayOfNonsense.push(arrayOfNonsense[i])
//   console.log(newArrayOfNonsense)
// }

// const arrayOfNonsense = ["👻", "🍔", "🐄", "🔥", "🍺"]

// for (let i = arrayOfNonsense.length - 1; i >= 0; i--) {
//   console.log(arrayOfNonsense[i])
// }

// loop in a loop
// for (let exercise = 1; exercise <= 3; exercise++) {
//   console.log(`------- Starting Exercise: #${exercise} -------`)
//   for (let rep = 1; rep <= 5; rep++) {
//     console.log(`Doing rep ${rep} of exercise #${exercise}`)
//   }
// }
// console.log("Congrats! It is over 🤗")

//////// fun with the while loop
// while is more versatile that the for loop
// let rep = 1

// while (rep <= 10) {
//   setTimeout(() => {
//     console.log(`Repetition #${rep}`)
//   }, 1000)
//   rep++
// }

//roll dice

// let dice = Math.trunc(Math.random() * 6) + 1
// // console.log(dice)

// while (dice !== 6) {
//   console.log(`You rolled a ${dice}, roll again!`)
//   dice = Math.trunc(Math.random() * 6) + 1
//   if (dice === 6) console.log("Congrats, you finally rolled that 6 🤗")
// }

///////////////////////////////////////
// Coding Challenge #4

/*
Let's improve Steven's tip calculator even more, this time using loops!

1. Create an array 'bills' containing all 10 test bill values*/
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52]

/* 2. Create empty arrays for the tips and the totals ('tips' and 'totals')*/

const tips = []
const totals = []

/* 3. Use the 'calcTip' function we wrote before (no need to repeat) to calculate tips and total values (bill + tip) for every bill value in the bills array. Use a for loop to perform the 10 calculations!*/

function calcTip(bill) {
  let tip
  if (bill > 50 && bill < 300) {
    tip = 0.15
  } else {
    tip = 0.2
  }

  return bill * tip
}

for (let i = 0; i < bills.length; i++) {
  const billTip = calcTip(bills[i])
  tips.push(billTip)
  totals.push(billTip + bills[i])
}

console.log(tips)
console.log(totals)
/*
TEST DATA: 22, 295, 176, 440, 37, 105, 10, 1100, 86 and 52

HINT: Call calcTip in the loop and use the push method to add values to the tips and totals arrays 😉 */

/*4. BONUS: Write a function 'calcAverage' which takes an array called 'arr' as an argument.*/

/* This function calculates the average of all numbers in the given array. This is a DIFFICULT challenge (we haven't done this before)! Here is how to solve it:*/
function calcAverage(arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
  }
  const avgBill = sum / arr.length
  console.log(`The bill average: ${avgBill}`)
}
calcAverage(totals)
/* 4.1. First, you will need to add up all values in the array. To do the addition, start by creating a variable 'sum' that starts at 0. Then loop over the array using a for loop. In each iteration, add the current value to the 'sum' variable. This way, by the end of the loop, you have all values added together
  4.2. To calculate the average, divide the sum you calculated before by the length of the array (because that's the number of elements)
  4.3. Call the function with the 'totals' array

GOOD LUCK 😀
*/
