import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day1";
import { stringLinesToString } from "../utils";

const Day1 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const highestSum = (lines: string[]): number => {
    let sum = 0;
    let highest = 0;
    lines.forEach((line) => {
      if (line.length === 0) {
        if (sum > highest) {
          highest = sum;
        }
        sum = 0;
      } else {
        const num = parseInt(line, 10);
        sum += num;
      }
    });

    return highest;
  };

  const top3Sum = (lines: string[]): number => {
    const sums: number[] = [];
    let sum = 0;
    lines.forEach((line) => {
      if (line.length === 0) {
        sums.push(sum);
        sum = 0;
      } else {
        const num = parseInt(line, 10);
        sum += num;
      }
    });

    sums.sort((a, b) => b - a);
    console.log("sums: ", sums);

    return sums[0] + sums[1] + sums[2];
  };

  const main = () => {
    const lines = stringLinesToString(input);
    setAnswer1(highestSum(lines).toString());
    setAnswer2(top3Sum(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day1;
