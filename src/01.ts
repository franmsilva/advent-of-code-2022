import fs from "fs";

const elfCaloryList = fs.readFileSync("src/input/01.txt").toString();

const formattedElfCaloryList = elfCaloryList
  .split(/\n\n/)
  .map((elf) => elf.split(/\n/));

const addUpCalories = (elfCalories: string[]) =>
  elfCalories.reduce<number>((acc, cur) => (acc += Number(cur)), 0);

const elfTotalCalories = formattedElfCaloryList.map(addUpCalories);

const maxElfCalories = Math.max(...elfTotalCalories);

console.log("🚀 ~ maxElfCalories:", maxElfCalories);
