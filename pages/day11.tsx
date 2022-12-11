import { useEffect, useState } from "react";
import Display from "../components/Display";

interface Monkey {
  holding: number[];
  operation: (old: number) => number;
  divisbleBy: number;
  ifTrue: number;
  ifFalse: number;
}

const monkeys = [
  {
    holding: [84, 72, 58, 51],
    operation: (old: number) => old * 3,
    divisbleBy: 13,
    ifTrue: 1,
    ifFalse: 7,
  },
  {
    holding: [88, 58, 58],
    operation: (old: number) => old + 8,
    divisbleBy: 2,
    ifTrue: 7,
    ifFalse: 5,
  },
  {
    holding: [93, 82, 71, 77, 83, 53, 71, 89],
    operation: (old: number) => old * old,
    divisbleBy: 7,
    ifTrue: 3,
    ifFalse: 4,
  },
  {
    holding: [81, 68, 65, 81, 73, 77, 96],
    operation: (old: number) => old + 2,
    divisbleBy: 17,
    ifTrue: 4,
    ifFalse: 6,
  },
  {
    holding: [75, 80, 50, 73, 88],
    operation: (old: number) => old + 3,
    divisbleBy: 5,
    ifTrue: 6,
    ifFalse: 0,
  },
  {
    holding: [59, 72, 99, 87, 91, 81],
    operation: (old: number) => old * 17,
    divisbleBy: 11,
    ifTrue: 2,
    ifFalse: 3,
  },
  {
    holding: [86, 69],
    operation: (old: number) => old + 6,
    divisbleBy: 3,
    ifTrue: 1,
    ifFalse: 0,
  },
  {
    holding: [91],
    operation: (old: number) => old + 1,
    divisbleBy: 19,
    ifTrue: 2,
    ifFalse: 5,
  },
];

const Day11 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (): number => {
    const monkeyInspectCount = new Array(monkeys.length).fill(0);

    for (let i = 0; i < 20; i += 1) {
      for (
        let monkeyIndex = 0;
        monkeyIndex < monkeys.length;
        monkeyIndex += 1
      ) {
        const monkey = monkeys[monkeyIndex];

        while (monkey.holding.length > 0) {
          const worryLevel = monkey.holding.shift() as number;
          const newWorryLevel = Math.floor(monkey.operation(worryLevel) / 3);
          if (newWorryLevel % monkey.divisbleBy === 0) {
            monkeys[monkey.ifTrue].holding.push(newWorryLevel);
          } else {
            monkeys[monkey.ifFalse].holding.push(newWorryLevel);
          }
          monkeyInspectCount[monkeyIndex] += 1;
        }
      }
    }

    monkeyInspectCount.sort((a, b) => b - a);

    return monkeyInspectCount[0] * monkeyInspectCount[1];
  };

  const part2 = (): number => {
    const monkeyInspectCount = new Array(monkeys.length).fill(0);

    const mod = monkeys.reduce((acc, monkey) => {
      return acc * monkey.divisbleBy;
    }, 1);

    for (let i = 0; i < 10000; i += 1) {
      for (
        let monkeyIndex = 0;
        monkeyIndex < monkeys.length;
        monkeyIndex += 1
      ) {
        const monkey = monkeys[monkeyIndex];

        while (monkey.holding.length > 0) {
          const worryLevel = monkey.holding.shift() as number;
          const newWorryLevel = monkey.operation(worryLevel) % mod;
          if (newWorryLevel % monkey.divisbleBy === 0) {
            monkeys[monkey.ifTrue].holding.push(newWorryLevel);
          } else {
            monkeys[monkey.ifFalse].holding.push(newWorryLevel);
          }
          monkeyInspectCount[monkeyIndex] += 1;
        }
      }
    }

    monkeyInspectCount.sort((a, b) => b - a);

    console.log("monkeyInspectCount: ", monkeyInspectCount);

    return monkeyInspectCount[0] * monkeyInspectCount[1];
  };

  const main = () => {
    setAnswer1(part1().toString());
    setAnswer2(part2().toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day11;
