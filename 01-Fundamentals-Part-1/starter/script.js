////////////////////////////////////
// Coding Challenge #3

/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each other 3 times. The winner with the highest average score wins the a trophy!

1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, and print it to the console. Don't forget that there can be a draw, so test for that as well (draw means they have the same average score).

3. BONUS 1: Include a requirement for a minimum score of 100. With this rule, a team only wins if it has a higher score than the other team, and the same time a score of at least 100 points. HINT: Use a logical operator to test for minimum score, as well as multiple else-if blocks 😉
4. BONUS 2: Minimum score also applies to a draw! So a draw only happens when both teams have the same score and both have a score greater or equal 100 points. Otherwise, no team wins the trophy.

TEST DATA: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
TEST DATA BONUS 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
TEST DATA BONUS 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106

GOOD LUCK 😀
*/

// function getScoresAvg(scores) {
//   let totalScore = 0
//   let eventCount = 0
//   for (let i = 0; i < scores.length; i++) {
//     totalScore += scores[i]
//     eventCount++
//   }
//   const avgScore = totalScore / eventCount
//   // console.log(avgScore)
//   return avgScore
// }

// const dolphinsScores = [97, 112, 101]
// const koalasScores = [109, 95, 106]

// const dolphinsAvg = getScoresAvg(dolphinsScores)
// const koalasAvg = getScoresAvg(koalasScores)

// if (dolphinsAvg > koalasAvg && dolphinsAvg >= 100) {
//   console.log(`Dolphins win with a season average of ${dolphinsAvg} points!`)
// } else if (dolphinsAvg < koalasAvg && koalasAvg >= 100) {
//   console.log(`Koalas win with a season average of ${koalasAvg} points!`)
// } else if (dolphinsAvg === koalasAvg && koalasAvg >= 100 && dolphinsAvg >= 100) {
//   console.log(`Both teams get the trophy!`)
// } else {
//   console.log("It is a draw... nobody really wins 🤔")
//   console.log("Dolphins: " + dolphinsAvg)
//   console.log("Koalas: " + koalasAvg)
// }

////////////////////////////////////
// Coding Challenge #4

/*
Steven wants to build a very simple tip calculator for whenever he goes eating in a resturant. In his country, it's usual to 
 - tip 15% if the bill value is between 50 and 300. 
 - If the value is different, the tip is 20%.

1. Your task is to caluclate the tip, depending on the bill value. 
 - Create a variable called 'tip' for this. 
   It's not allowed to use an if/else statement 😅 (If it's easier for you, you can start with an if/else statement, and then try to convert it to a ternary operator!)
2. Print a string to the console containing the bill value, the tip, and the final value (bill + tip). Example: 'The bill was 275, the tip was 41.25, and the total value 316.25'

TEST DATA: Test for bill values 275, 40 and 430

HINT: To calculate 20% of a value, simply multiply it by 20/100 = 0.2
HINT: Value X is between 50 and 300, if it's >= 50 && <= 300 😉

GOOD LUCK 😀
*/

const bill = 275
const tip = bill >= 50 && 300 >= bill ? bill * 0.15 : bill * 0.2
console.log(`The bill was $${bill}, the tip was $${tip}, and the total value $${bill + tip}`)
