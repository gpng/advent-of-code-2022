import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day8";
import { stringLinesToNumbers, stringLinesToStrings } from "../utils";

const Day8 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (input: number[][]): number => {
    let count = 0;

    let visibleMap: Record<number, Record<number, boolean>> = {};

    for (let i = 0; i < input.length; i += 1) {
      const row = input[i];

      for (let j = 0; j < row.length; j += 1) {
        if (!visibleMap[i]) {
          visibleMap[i] = {};
        }

        if (!visibleMap[i][j]) {
          visibleMap[i][j] = false;
        }

        if (
          i === 0 ||
          i === input.length - 1 ||
          j === 0 ||
          j === row.length - 1
        ) {
          visibleMap[i][j] = true;
          count += 1;
          continue;
        }
      }
    }

    for (let i = 1; i < input.length - 1; i += 1) {
      const row = input[i];

      for (let j = 1; j < row.length - 1; j += 1) {
        const height = row[j];

        // check left
        const leftHeights = row.slice(0, j);
        if (leftHeights.every((h) => h < height)) {
          visibleMap[i][j] = true;
          count += 1;
          continue;
        }
        // check right
        const rightHeights = row.slice(j + 1);
        if (rightHeights.every((h) => h < height)) {
          visibleMap[i][j] = true;
          count += 1;
          continue;
        }
        // check top
        const topHeights = input.slice(0, i).map((r) => r[j]);
        if (topHeights.every((h) => h < height)) {
          visibleMap[i][j] = true;
          count += 1;
          continue;
        }
        // check bottom
        const bottomHeights = input.slice(i + 1).map((r) => r[j]);
        if (bottomHeights.every((h) => h < height)) {
          visibleMap[i][j] = true;
          count += 1;
          continue;
        }
      }
    }

    return count;
  };

  const part2 = (input: number[][]): number => {
    let highest = 0;

    for (let i = 1; i < input.length - 1; i += 1) {
      const row = input[i];

      for (let j = 1; j < row.length - 1; j += 1) {
        const height = row[j];

        let leftPoints = 0;
        for (let jj = j - 1; jj >= 0; jj -= 1) {
          leftPoints += 1;
          if (row[jj] >= height) break;
        }
        leftPoints = Math.max(1, leftPoints);

        let rightPoints = 0;
        for (let jj = j + 1; jj < row.length; jj += 1) {
          rightPoints += 1;
          if (row[jj] >= height) break;
        }
        rightPoints = Math.max(1, rightPoints);

        let topPoints = 0;
        for (let ii = i - 1; ii >= 0; ii -= 1) {
          topPoints += 1;
          if (input[ii][j] >= height) break;
        }
        topPoints = Math.max(1, topPoints);

        let bottomPoints = 0;
        for (let ii = i + 1; ii < input.length; ii += 1) {
          bottomPoints += 1;
          if (input[ii][j] >= height) break;
        }
        bottomPoints = Math.max(1, bottomPoints);

        const points = leftPoints * rightPoints * topPoints * bottomPoints;
        if (points > highest) {
          highest = points;
        }
      }
    }

    return highest;
  };

  const main = () => {
    const lines = stringLinesToNumbers(input, "");
    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day8;
