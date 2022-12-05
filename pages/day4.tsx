import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day4";
import { stringLinesToStrings } from "../utils";

const Day4 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (lines: string[][]): number => {
    let count = 0;

    lines.forEach((line) => {
      const pairs = line.map((x) => x.split("-").map((y) => parseInt(y, 10)));

      if (
        (pairs[1][0] >= pairs[0][0] && pairs[1][1] <= pairs[0][1]) ||
        (pairs[0][0] >= pairs[1][0] && pairs[0][1] <= pairs[1][1])
      ) {
        count += 1;
      }
    });

    return count;
  };

  const part2 = (lines: string[][]): number => {
    let count = 0;

    lines.forEach((line) => {
      const pairs = line.map((x) => x.split("-").map((y) => parseInt(y, 10)));

      if (
        (pairs[1][0] >= pairs[0][0] && pairs[1][0] <= pairs[0][1]) ||
        (pairs[1][1] >= pairs[0][0] && pairs[1][1] <= pairs[0][1]) ||
        (pairs[0][0] >= pairs[1][0] && pairs[0][0] <= pairs[1][1]) ||
        (pairs[0][1] >= pairs[1][0] && pairs[0][0] <= pairs[1][1])
      ) {
        count += 1;
      }
    });

    return count;
  };

  const main = () => {
    const lines = stringLinesToStrings(input, ",");
    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day4;
