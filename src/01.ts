import fs from "fs";

const elfCaloryList = fs.readFileSync("src/input/01.txt").toString();

const formattedElfCaloryList = elfCaloryList
  .split(/\n\n/)
  .map((elf) => elf.split(/\n/));

// * PART 1 - Elf with Most Calories
const addUpCalories = (elfCalories: (string | number)[]) =>
  elfCalories.reduce<number>((acc, cur) => (acc += Number(cur)), 0);

const elfTotalCalories = formattedElfCaloryList.map(addUpCalories);

const maxElfCalories = Math.max(...elfTotalCalories);

console.log("🚀 ~ maxElfCalories:", maxElfCalories);

// * PART 2 - Top 3 Elves
const elvesSortedByTotalCalories = elfTotalCalories.sort((a, b) => b - a);

const topThreeElves = elvesSortedByTotalCalories.slice(0, 3);

const topThreeElvesCalorySum = addUpCalories(topThreeElves);

console.log("🚀 ~ topThreeElvesCalorySum", topThreeElvesCalorySum);
