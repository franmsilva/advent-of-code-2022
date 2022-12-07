import fs from "fs";

const elfPairAssignments = fs.readFileSync("src/input/04.txt").toString();

interface IAssignmentSections {
  minSection: number;
  maxSection: number;
}

const formattedElfAssignments = elfPairAssignments
  .split(/\n/)
  .map((assigmentPair) =>
    assigmentPair.split(",").map((assignment) => {
      const [minSection, maxSection] = assignment.split("-");
      return { minSection: Number(minSection), maxSection: Number(maxSection) };
    })
  ) as [IAssignmentSections, IAssignmentSections][];

// * PART 1 - Fully Contained Assigments
let fullyContainedAssigmentCount = 0;

formattedElfAssignments.forEach(([rangeA, rangeB]) => {
  const { minSection: minSectionA, maxSection: maxSectionA } = rangeA;
  const { minSection: minSectionB, maxSection: maxSectionB } = rangeB;

  if (minSectionA >= minSectionB && maxSectionA <= maxSectionB) {
    fullyContainedAssigmentCount++;
    return;
  }
  if (minSectionA <= minSectionB && maxSectionA >= maxSectionB) {
    fullyContainedAssigmentCount++;
    return;
  }
});

console.log("🚀 ~ fullyContainedAssigmentCount", fullyContainedAssigmentCount);

// * PART 2 - Overlapped Assigments
let overlappedAssigmentCount = 0;

formattedElfAssignments.forEach(([rangeA, rangeB]) => {
  const { minSection: minSectionA, maxSection: maxSectionA } = rangeA;
  const { minSection: minSectionB, maxSection: maxSectionB } = rangeB;

  if (minSectionB <= minSectionA && minSectionA <= maxSectionB) {
    overlappedAssigmentCount++;
    return;
  }
  if (minSectionA <= minSectionB && minSectionB <= maxSectionA) {
    overlappedAssigmentCount++;
    return;
  }
});

console.log("🚀 ~ overlappedAssigmentCount", overlappedAssigmentCount);
