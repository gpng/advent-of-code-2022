import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day9";
import { stringLinesToStrings } from "../utils";

const Day8 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (input: string[][]): number => {
    const visitedGrid = new Set<string>();
    let headPos = [0, 0];
    let tailPos = [0, 0];
    let count = 0;

    for (let i = 0; i < input.length; i += 1) {
      const row = input[i];
      const dir = row[0];
      const moves = parseInt(row[1], 10);
    }

    return count;
  };

  const part2 = (input: string[][]): number => {
    let highest = 0;

    return highest;
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

export default Day8;
