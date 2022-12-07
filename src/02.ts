import fs from "fs";

const strategyGuide = fs.readFileSync("src/input/02.txt").toString();

type TPlayerOptions = "X" | "Y" | "Z";
type TOpponentOptions = "A" | "B" | "C";

const formattedStrategyGuide = strategyGuide
  .split(/\n/)
  .map((play) => play.split(" ")) as [TOpponentOptions, TPlayerOptions][];

// * PART 1 - Player Total Score (XYZ Are Moves)
type TPickScoreMapValue = Record<TOpponentOptions, number> & {
  pickScore: number;
};

type TPickScoreMap = Record<TPlayerOptions, TPickScoreMapValue>;

// ? A for Rock, B for Paper, and C for Scissors
// ? X for Rock, Y for Paper, and Z for Scissors
const PICK_SCORE_MAP: TPickScoreMap = {
  X: {
    A: 3,
    B: 0,
    C: 6,
    pickScore: 1,
  },
  Y: {
    A: 6,
    B: 3,
    C: 0,
    pickScore: 2,
  },
  Z: {
    A: 0,
    B: 6,
    C: 3,
    pickScore: 3,
  },
};

const calculatePlayScore = ([opponentPick, playerPick]: [
  TOpponentOptions,
  TPlayerOptions
]) =>
  PICK_SCORE_MAP[playerPick].pickScore +
  PICK_SCORE_MAP[playerPick][opponentPick];

const totalScore = formattedStrategyGuide.reduce<number>(
  (acc, currentPlay) => (acc += calculatePlayScore(currentPlay)),
  0
);

console.log("🚀 ~ totalScore", totalScore);

// * PART 2 - Player Total Score (XYZ Are Outcomes)
type TOutcomeOptions = "X" | "Y" | "Z";

type TOutcomeScoreMapValue = Record<TOpponentOptions, number> & {
  outcomeScore: number;
};

type TOutcomeScoreMap = Record<TOutcomeOptions, TOutcomeScoreMapValue>;

// ? A for Rock, B for Paper, and C for Scissors
// ? X for Loss, Y for Draw, and Z for Win
// ? 1 Point for Rock, 2 Points for Paper, and 3 Points for Scissors
const OUTCOME_SCORE_MAP: TOutcomeScoreMap = {
  X: {
    A: 3, // ! Lose (X) against Rock (A). Pick Scissors and get 3 points
    B: 1, // ! Lose (X) against Paper (B). Pick Rock and get 1 points
    C: 2, // ! Lose (X) against Scissors (C). Pick Paper and get 2 points
    outcomeScore: 0,
  },
  Y: {
    A: 1,
    B: 2,
    C: 3,
    outcomeScore: 3,
  },
  Z: {
    A: 2,
    B: 3,
    C: 1,
    outcomeScore: 6,
  },
};

const calculatePlayScore2 = ([opponentPick, playerPick]: [
  TOpponentOptions,
  TOutcomeOptions
]) =>
  OUTCOME_SCORE_MAP[playerPick].outcomeScore +
  OUTCOME_SCORE_MAP[playerPick][opponentPick];

const totalScore2 = formattedStrategyGuide.reduce<number>(
  (acc, currentPlay) => (acc += calculatePlayScore2(currentPlay)),
  0
);

console.log("🚀 ~ totalScore2", totalScore2);
