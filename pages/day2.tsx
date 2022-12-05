import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day2";
import { stringLinesToString, stringLinesToStrings } from "../utils";

const SCORES: Record<string, number> = {
  X: 1, // rock
  Y: 2, // papr
  Z: 3, // scissor
};

const RESULT: Record<string, Record<string, number>> = {
  A: {
    // rock
    X: 3,
    Y: 6,
    Z: 0,
  },
  B: {
    // paper
    X: 0,
    Y: 3,
    Z: 6,
  },
  C: {
    // scissor
    X: 6,
    Y: 0,
    Z: 3,
  },
};

const Day1 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (lines: string[][]): number => {
    console.log("lines: ", lines);
    let sum = 0;

    lines.forEach((line) => {
      sum += SCORES[line[2]];
      sum += RESULT[line[0]][line[2]];
    });

    return sum;
  };

  const part2 = (lines: string[][]): number => {
    let sum = 0;

    lines.forEach((line) => {
      // need to lose
      if (line[2] === "X") {
        if (line[0] === "A") {
          sum += 3;
        }
        if (line[0] === "B") {
          sum += 1;
        }
        if (line[0] === "C") {
          sum += 2;
        }
      }
      if (line[2] === "Y") {
        sum += 3;
        if (line[0] === "A") {
          sum += 1;
        }
        if (line[0] === "B") {
          sum += 2;
        }
        if (line[0] === "C") {
          sum += 3;
        }
      }
      if (line[2] === "Z") {
        sum += 6;
        if (line[0] === "A") {
          sum += 2;
        }
        if (line[0] === "B") {
          sum += 3;
        }
        if (line[0] === "C") {
          sum += 1;
        }
      }
    });

    return sum;
  };

  const main = () => {
    const lines = stringLinesToStrings(input, "");
    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day1;
