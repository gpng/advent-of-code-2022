import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day9";
import { stringLinesToStrings } from "../utils";

const newTailsPos = (headPos: number[], oldTailPos: number[]): number[] => {
  const tailPos = [...oldTailPos];
  if (
    !(headPos[0] === tailPos[0] && headPos[1] === tailPos[1]) &&
    (Math.abs(headPos[0] - tailPos[0]) > 1 ||
      Math.abs(headPos[1] - tailPos[1]) > 1)
  ) {
    // same column, tail move up or down
    if (headPos[0] === tailPos[0]) {
      if (headPos[1] > tailPos[1]) {
        tailPos[1] += 1;
      } else {
        tailPos[1] -= 1;
      }
    }
    // same row, tail moves left or right
    else if (headPos[1] === tailPos[1]) {
      if (headPos[0] > tailPos[0]) {
        tailPos[0] += 1;
      } else {
        tailPos[0] -= 1;
      }
    }
    // tail moves diagonal
    else {
      const distX = Math.abs(headPos[0] - tailPos[0]);
      const distY = Math.abs(headPos[1] - tailPos[1]);
      if (distX > distY) {
        if (headPos[0] > tailPos[0]) {
          tailPos[0] += 1;
        } else {
          tailPos[0] -= 1;
        }
        tailPos[1] = headPos[1];
      } else if (distX === distY) {
        if (headPos[0] > tailPos[0]) {
          tailPos[0] += 1;
        } else {
          tailPos[0] -= 1;
        }
        if (headPos[1] > tailPos[1]) {
          tailPos[1] += 1;
        } else {
          tailPos[1] -= 1;
        }
      } else {
        if (headPos[1] > tailPos[1]) {
          tailPos[1] += 1;
        } else {
          tailPos[1] -= 1;
        }
        tailPos[0] = headPos[0];
      }
    }
  }
  return tailPos;
};

const Day8 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (input: string[][]): number => {
    const visitedGrid = new Set<string>();
    visitedGrid.add("0,0");
    let headPos = [0, 0];
    let tailPos = [0, 0];

    for (let i = 0; i < input.length; i += 1) {
      const row = input[i];
      const dir = row[0];
      const moves = parseInt(row[1], 10);

      for (let j = 0; j < moves; j += 1) {
        if (dir === "R") {
          headPos[0] += 1;
        } else if (dir === "L") {
          headPos[0] -= 1;
        } else if (dir === "U") {
          headPos[1] += 1;
        } else if (dir === "D") {
          headPos[1] -= 1;
        }

        // tail has to catch up with head
        tailPos = newTailsPos(headPos, tailPos);

        const tailPosString = tailPos.join(",");
        visitedGrid.add(tailPosString);
      }
    }

    return visitedGrid.size;
  };

  const part2 = (input: string[][]): number => {
    const visitedGrid = new Set<string>();
    visitedGrid.add("0,0");
    let headPos = [0, 0];
    // there are 9 tails
    let tailsPos = [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];

    for (let i = 0; i < input.length; i += 1) {
      const row = input[i];
      const dir = row[0];
      const moves = parseInt(row[1], 10);

      for (let j = 0; j < moves; j += 1) {
        if (dir === "R") {
          headPos[0] += 1;
        } else if (dir === "L") {
          headPos[0] -= 1;
        } else if (dir === "U") {
          headPos[1] += 1;
        } else if (dir === "D") {
          headPos[1] -= 1;
        }

        // all tails have to catch up with previous tail
        tailsPos[0] = newTailsPos(headPos, tailsPos[0]);
        for (let i = 1; i < tailsPos.length; i += 1) {
          tailsPos[i] = newTailsPos(tailsPos[i - 1], tailsPos[i]);
        }

        const tailPosString = tailsPos[tailsPos.length - 1].join(",");
        visitedGrid.add(tailPosString);
      }
    }

    return visitedGrid.size;
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
