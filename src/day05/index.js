import run from "aocrunner";

const parseInput = (rawInput) => {
  const splitInput = rawInput.split('\n\n')
  const rulesRaw = splitInput[0];
  const updatesRaw = splitInput[1];

  const rules = rulesRaw.split('\n').map(rule => {
    const splitRule = rule.split('|');
    return {
      before: parseInt(splitRule[0], 10),
      after: parseInt(splitRule[1], 10)
    }
  });
  const updates = updatesRaw.split('\n').map(update => update.split(',').map(u => parseInt(u, 10)));

  return {
    updates,
    rules
  }
};

function getImpactedRules(rules, values) {
  const affectedRules = [];
  values.forEach((value) => {
    affectedRules.push(...rules.filter(rule => rule.before === value).filter(rule => values.includes(rule.after)));
  });

  return affectedRules.sort((a, b) => a.before - b.before);
} 

function checkFailingRule(values, rules) {
  const failingRules = [];
  for (const rule of rules) {
    const beforeIndex = values.findIndex(a => a === rule.before);
    const afterIndex = values.findIndex(a => a === rule.after);
    
    if (beforeIndex === -1 || afterIndex === -1) {
      continue;
    }

    if (beforeIndex > afterIndex) {
      failingRules.push(rule)
    }
  }

  if (failingRules.length) {
    return failingRules;
  } 
  return;
}

function swapValues(values, beforeValue, afterValue) {
  const beforeIndex = values.indexOf(beforeValue);
  const afterIndex = values.indexOf(afterValue);

  if (beforeIndex !== -1 && afterIndex !== -1) {
    [values[beforeIndex], values[afterIndex]] = [values[afterIndex], values[beforeIndex]];
  }

  return values;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const toPrint = [];

  for (const update of input.updates) {
    const rulesToValidate = getImpactedRules(input.rules, update);

    if (!checkFailingRule(update, rulesToValidate)) {
      console.log(`Passed - ${update}`)
      toPrint.push(update);
    };
  }

  return toPrint.map(item => {
    return item[item.length / 2 | 0]
  }).reduce((a,b) => a + b);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const toFix = [];

  for (const update of input.updates) {
    const rulesToValidate = getImpactedRules(input.rules, update);
    
    const failingRules = checkFailingRule(update, rulesToValidate)
    if (failingRules) {
      console.log(`Failed - ${update} - Rule ${JSON.stringify(failingRules)}`)
      toFix.push({update, failingRules});
    };
  }
  
  const toPrint = [];
  for (const toFixObject of toFix) {
    for (const failingRule of toFixObject.failingRules) {
      swapValues(toFixObject.update, failingRule.before, failingRule.after);
    }
    toPrint.push(toFixObject.update);
  }
  
  return toPrint.map(item => {
    return item[item.length / 2 | 0]
  }).reduce((a,b) => a + b);
};

run({
  part1: {
    tests: [
      {
        input: `47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
