import run from "aocrunner";

const parseInput = (rawInput) => {
  const leftList = [];
  const rightList = []
  rawInput.split('\n').map((inputs) => {
    const [left, right] = inputs.split('  ');
    leftList.push(left);
    rightList.push(right);
  });

  leftList.sort();
  rightList.sort();

  return {
    leftList, rightList
  }
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let difference = 0;
  input.leftList.forEach((leftItem, leftIndex) => {
    difference += Math.abs(leftItem - input.rightList[leftIndex]);
  })
  return difference;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let result = 0;
  input.leftList.forEach((leftItem) => {
    result += leftItem * input.rightList.filter(i => parseInt(i, 10) == leftItem).length;
  })
  return result;
};

run({
  part1: {
    tests: [
      {
        input: `1   1\n3   1\n3   1`,
        expected: 4,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4\n4   3\n2   5\n1   3\n3   9\n3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
