import run from "aocrunner";

const parseInput = (rawInput) => {
  const rows = rawInput.split('\n');
  const grid = []
  rows.forEach(row => {
    grid.push(row.split(''));
  });
  return grid;
};

function countGuardPositions(map) {
  const directions = ['^', '>', 'v', '<']; // Up, Right, Down, Left
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  // Find the starting position and direction
  let [x, y] = [0, 0];
  let directionIndex = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === '^' || map[i][j] === '>' || map[i][j] === 'v' || map[i][j] === '<') {
        x = j;
        y = i;
        directionIndex = directions.indexOf(map[i][j]);
        break;
      }
    }
  }

  const visited = new Set();
  visited.add(`${x},${y}`);

  while (true) {
    const newX = x + dx[directionIndex];
    const newY = y + dy[directionIndex];

    if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length || map[newY][newX] === '#') {
      // Turn right
      directionIndex = (directionIndex + 1) % 4;
    } else {
      // Move forward
      x = newX;
      y = newY;
      visited.add(`${x},${y}`);
    }

    if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length) {
      break; // Guard has left the map
    }
  }

  return visited.size;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return countGuardPositions(input);;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
