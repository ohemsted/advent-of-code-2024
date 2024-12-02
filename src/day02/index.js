import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const isSafe = (readings) => {
  const clonedReadings = structuredClone(readings);
  const sortedReadings = clonedReadings.sort((a,b) => a - b);
  // if ascending || descending
  console.log(sortedReadings);
  console.log(readings);
  if (arraysEqual(sortedReadings, readings) || arraysEqual(sortedReadings.reverse(), readings)) {
    return sequenceInRange(readings);
  } else {
    console.log(`Not all ascending or descending`)
    return false;
  }
}


function sequenceInRange(readings) {
  let isSafe = true;
  readings.forEach((value, index) => {
    const parsedValue = parseInt(value, 10);
    if (index < readings.length - 1) {
      const difference = Math.abs(parsedValue - readings[index + 1]);
      if (difference < 1 || difference > 3) {
        console.log(`Not safe, difference ${difference}`)
        isSafe = false;
      } 
    }
  });
  return isSafe;
}

const part1 = (rawInput) => {
  const reports = parseInput(rawInput);
  let safeReports = 0;

  reports.map((report) => {
    if (isSafe(report.split(' ').map(i => parseInt(i, 10)))) {
      // console.log(`Report ${report} is safe`)
      safeReports++;
    } else {
      console.log(`Report ${report} is NOT safe`)
    }
  });


  return safeReports;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9`,
        expected: 2,
      },
      {
        input: `3 5 8 10 12`,
        expected: 1
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

