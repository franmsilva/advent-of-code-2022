import fs from "fs";

const crateMoves = fs.readFileSync("src/input/05.txt").toString();

const CRATE_MOVE_REGEXP =
  /move (?<numberOfCrates>\d+) from (?<origin>\d) to (?<destination>\d)/;

const formattedCrateMoves = crateMoves.split(/\n/).map((move) => {
  const regexpGroups = move.match(CRATE_MOVE_REGEXP)?.groups as {
    [key: string]: string;
  };

  return [
    Number(regexpGroups["numberOfCrates"]),
    Number(regexpGroups["origin"]),
    Number(regexpGroups["destination"]),
  ];
}) as [number, number, number][];

// * PART 1 - Top Crates (Moving One At a Time)
const INITIAL_CRATE_STATE_1 = [
  ["N", "D", "M", "Q", "B", "P", "Z"],
  ["C", "L", "Z", "Q", "M", "D", "H", "V"],
  ["Q", "H", "R", "D", "V", "F", "Z", "G"],
  ["H", "G", "D", "F", "N"],
  ["N", "F", "Q"],
  ["D", "Q", "V", "Z", "F", "B", "T"],
  ["Q", "M", "T", "Z", "D", "V", "S", "H"],
  ["M", "G", "F", "P", "N", "Q"],
  ["B", "W", "R", "M"],
];

formattedCrateMoves.forEach(([numberOfCrates, origin, destination]) => {
  for (let i = 0; i < numberOfCrates; i++) {
    const originIdx = origin - 1;
    const destinationIdx = destination - 1;

    const movingCrate = INITIAL_CRATE_STATE_1[originIdx].pop();

    if (movingCrate) {
      INITIAL_CRATE_STATE_1[destinationIdx].push(movingCrate);
    }
  }
});

const finalTopCrates1 = INITIAL_CRATE_STATE_1.map(
  (crateStack) => crateStack.pop() ?? "*"
).join("");

console.log("🚀 ~ finalTopCrates1", finalTopCrates1);

// * PART 2 - Top Crates (Moving Many At a Time)
const INITIAL_CRATE_STATE_2 = [
  ["N", "D", "M", "Q", "B", "P", "Z"],
  ["C", "L", "Z", "Q", "M", "D", "H", "V"],
  ["Q", "H", "R", "D", "V", "F", "Z", "G"],
  ["H", "G", "D", "F", "N"],
  ["N", "F", "Q"],
  ["D", "Q", "V", "Z", "F", "B", "T"],
  ["Q", "M", "T", "Z", "D", "V", "S", "H"],
  ["M", "G", "F", "P", "N", "Q"],
  ["B", "W", "R", "M"],
];

formattedCrateMoves.forEach(([numberOfCrates, origin, destination]) => {
  const originStack = INITIAL_CRATE_STATE_2[origin - 1];
  const destinationStack = INITIAL_CRATE_STATE_2[destination - 1];
  const movingCrates = originStack.splice(originStack.length - numberOfCrates);

  destinationStack.push(...movingCrates);
});

const finalTopCrates2 = INITIAL_CRATE_STATE_2.map(
  (crateStack) => crateStack.pop() ?? "*"
).join("");

console.log("🚀 ~ finalTopCrates2", finalTopCrates2);
