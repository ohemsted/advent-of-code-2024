import run from "aocrunner";

const parseInput = (rawInput) => {
  const rows = rawInput.split('\n');
  const grid = []
  rows.forEach(row => {
    grid.push(row.split(''));
  });
  return {
    grid,
    width: grid[0].length,
    height: grid.length
  }
};

function searchGrid(inputObject, word, onlyCrosses = false) {
  const rows = inputObject.height;
  const cols = inputObject.width;
  const grid = inputObject.grid;
  let count = 0;
  const crosses = [    
    [-1, -1], // Up Left
    [-1, 1],  // Up Right
    [1, -1],  // Down Left
    [1, 1]   // Down Right
  ]
  const dPadOptions = onlyCrosses ? [] : [
    [-1, 0], // Up
    [1, 0],  // Down
    [0, -1], // Left
    [0, 1],  // Right
  ]

  const directions = [
    ...dPadOptions,
    ...crosses
  ];

  const centreCoords = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dr, dc] of directions) {
        let r = row;
        let c = col;
        let i = 0;
        
        let centreCoord;

        while (r >= 0 && r < rows && c >= 0 && c < cols && grid[r][c] === word[i]) {
          i++;
          if (word[i] === 'A') { 
            centreCoord = [r + dr,c  + dc];
          }
          if (i === word.length) {
            count++;
            centreCoords.push(centreCoord);
            break;
          }
          r += dr;
          c += dc;
        }
      }
    }
  }

  return {
    count,
    centreCoords
  };
}

function countDuplicateCoordinates(coordinates) {
  const coordinateMap = {};
  let duplicateCount = 0;

  coordinates.forEach(coordinate => {
    const key = `${coordinate[0]},${coordinate[1]}`;
    coordinateMap[key] = (coordinateMap[key] || 0) + 1;
  });

  for (const count of Object.values(coordinateMap)) {
    if (count > 1) {
      duplicateCount += count - 1;
    }
  }

  return duplicateCount;
}

const part1 = (rawInput) => {
  const inputObject = parseInput(rawInput);
  return searchGrid(inputObject, 'XMAS').count;
};

const part2 = (rawInput) => {
  const inputObject = parseInput(rawInput);
  return countDuplicateCoordinates(searchGrid(inputObject, 'MAS', true).centreCoords);
};

run({
  part1: {
    tests: [
      {
        input: `..X...\n.SAMX.\n.A..A.\nXMAS.S\n.X....`,
        expected: 4,
      },
      {
        input: `MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `M.S\n.A.\nM.S`,
        expected: 1,
      },
      {
        input: `MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
