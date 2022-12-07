import fs from "fs";
import _ from "lodash";

const PRIORITY_LIST = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const rucksacks = fs.readFileSync("src/input/03.txt").toString();

const splitInTwo = (str: string) => {
  const midIndex = str.length / 2;
  return [str.slice(0, midIndex), str.slice(midIndex)];
};

const rucksacksByCompartment = rucksacks.split(/\n/).map(splitInTwo);

// * PART 1 - Items in Both Compartments
const itemsInBothCompartments = rucksacksByCompartment.map(
  ([compartmentA, compartmentB]) => {
    const compartmentAItems = compartmentA.split("");

    for (let i = 0; i < compartmentAItems.length; i++) {
      if (compartmentB.includes(compartmentAItems[i])) {
        return compartmentAItems[i];
      }
    }
  }
) as string[];

const getPrioritySum = (items: string[]) =>
  items.reduce((acc, item) => {
    const priorityVal = PRIORITY_LIST.indexOf(item) + 1;
    return (acc += priorityVal);
  }, 0);

const prioritySum = getPrioritySum(itemsInBothCompartments);

console.log("🚀 ~ prioritySum", prioritySum);

// * PART 2 - Find Group Badges
const rucksacksByGroupsOfThree = _.chunk(
  rucksacks.split(/\n/).map((rucksack) => rucksack.split("")),
  3
);

const teamBadges = rucksacksByGroupsOfThree.map(
  (group) => _.intersection(...group)[0]
);

const teamBadgesPrioritySum = getPrioritySum(teamBadges);

console.log("🚀 ~ teamBadgesPrioritySum", teamBadgesPrioritySum);
