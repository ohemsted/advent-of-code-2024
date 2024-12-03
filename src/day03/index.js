import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const regex = /mul\(([0-9]+),([0-9]+)\)/g; 
  const matches = input.matchAll(regex);
  let total = 0;
  for (const match of matches) {
    total += match[1] * match[2];
  }
  return total;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const regex = /(mul\(([0-9]+),([0-9]+)\))|(do|don't)\(\)/g;
  const matches = input.matchAll(regex);
  let processingInstructions = true; 
  let total = 0;
  for (const match of matches) {
    if (match[1] && processingInstructions) { 
      total += match[2] * match[3];
    } else {
      if (match[4] == "do") {
        processingInstructions = true;
      }

      if (match[4] == "don't") {
        processingInstructions = false;
      }
    }
  }
  return total;
};

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
