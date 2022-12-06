import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day5";
import { stringLinesToString } from "../utils";

const Day5 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (lines: string[]): string => {
    const initialGrid: string[][] = [];

    const height = lines.findIndex((line) => line.trim()[0] !== "[");
    const widthLine = lines[height]
      .trim()
      .split("")
      .filter((x) => x !== " ");
    const width = parseInt(widthLine[widthLine.length - 1], 10);

    for (let i = 0; i < height; i++) {
      initialGrid.push(new Array(width).fill(" "));
      for (let j = 0; j < width; j++) {
        const char = lines[i][1 + 4 * j];
        if (char && char !== " ") {
          initialGrid[i][j] = char;
        }
      }
    }

    const grid = initialGrid[0].map((_, colIndex) =>
      initialGrid.map((row) => row[colIndex])
    );

    grid.forEach((row, i) => {
      row.reverse();
      grid[i] = grid[i].filter((x) => x != " ");
    });

    console.log("original grid: ", grid);

    for (let i = height + 2; i < lines.length; i++) {
      const words = lines[i].split(" ");
      const num = parseInt(words[1], 10);
      const from = parseInt(words[3], 10);
      const to = parseInt(words[5], 10);

      if (!grid[to]) {
        grid[to] = [];
      }

      const start = grid[from - 1].length - num;
      const toPush = grid[from - 1].splice(start, start + num);
      grid[to - 1].push(...toPush.reverse());
    }

    let topCrates = "";
    grid.forEach((x) => {
      if (x[x.length - 1]) {
        topCrates += x[x.length - 1];
      }
    });

    return topCrates;
  };

  const part2 = (lines: string[]): string => {
    const initialGrid: string[][] = [];

    const height = lines.findIndex((line) => line.trim()[0] !== "[");
    const widthLine = lines[height]
      .trim()
      .split("")
      .filter((x) => x !== " ");
    const width = parseInt(widthLine[widthLine.length - 1], 10);

    for (let i = 0; i < height; i++) {
      initialGrid.push(new Array(width).fill(" "));
      for (let j = 0; j < width; j++) {
        const char = lines[i][1 + 4 * j];
        if (char && char !== " ") {
          initialGrid[i][j] = char;
        }
      }
    }

    const grid = initialGrid[0].map((_, colIndex) =>
      initialGrid.map((row) => row[colIndex])
    );

    grid.forEach((row, i) => {
      row.reverse();
      grid[i] = grid[i].filter((x) => x != " ");
    });

    for (let i = height + 2; i < lines.length; i++) {
      const words = lines[i].split(" ");
      const num = parseInt(words[1], 10);
      const from = parseInt(words[3], 10);
      const to = parseInt(words[5], 10);

      if (!grid[to]) {
        grid[to] = [];
      }

      const start = grid[from - 1].length - num;
      const toPush = grid[from - 1].splice(start, start + num);
      grid[to - 1].push(...toPush);
    }

    let topCrates = "";
    grid.forEach((x) => {
      if (x[x.length - 1]) {
        topCrates += x[x.length - 1];
      }
    });

    return topCrates;
  };

  const main = () => {
    const lines = stringLinesToString(input);
    setAnswer1(part1(lines).toString());
    setAnswer2(part2(lines).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day5;
