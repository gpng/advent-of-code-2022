import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day10";
import { stringLinesToStrings } from "../utils";

const Day10 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (input: string[][]): number => {
    const cycles = [20, 60, 100, 140, 180, 220];
    let x = 1;
    let cycle = 0;
    let sum = 0;

    for (let i = 0; i < input.length; i += 1) {
      const row = input[i];
      const instr = row[0];
      const num = parseInt(row[1], 10);
      const nextCycleToCheck = cycles[0];
      const startingX = x;

      if (instr === "noop") {
        cycle += 1;
      } else if (instr === "addx") {
        x += num;
        cycle += 2;
      }
      if (cycle >= nextCycleToCheck) {
        sum += nextCycleToCheck * startingX;
        cycles.shift();
      }
    }

    return sum;
  };

  const part2 = (input: string[][]): string => {
    let image = "";
    let cycle = 0;
    const maxCycle = 40;
    let x = 1;

    let instrIndex = 0;
    let wait = false;
    let waitNum = 0;

    while (instrIndex < input.length) {
      const row = input[instrIndex];
      const instr = row[0];
      const num = parseInt(row[1], 10);

      if ([x - 1, x, x + 1].includes(cycle)) {
        image += "#";
      } else {
        image += "-";
      }

      if (!wait) {
        if (instr === "noop") {
          wait = false;
          instrIndex += 1;
        } else if (instr === "addx") {
          waitNum = num;
          wait = true;
        }
      } else {
        x += waitNum;
        wait = false;
        instrIndex += 1;
      }

      cycle += 1;
      if (cycle >= maxCycle) {
        cycle = 0;
        image += "\n";
      }
    }

    return image;
  };

  const main = () => {
    const lines = stringLinesToStrings(input, " ");
    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day10;
