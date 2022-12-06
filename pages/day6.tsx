import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day6";

const Day6 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (input: string): number => {
    // first position where four characters are different
    for (let i = 3; i < input.length; i += 1) {
      const a = input[i - 3];
      const b = input[i - 2];
      const c = input[i - 1];
      const d = input[i];

      if (a !== b && a !== c && a !== d && b !== c && b !== d && c !== d) {
        return i + 1;
      }
    }

    return -1;
  };

  const part2 = (lines: string): number => {
    // first position where fifteen characters are different
    for (let i = 14; i < input.length; i += 1) {
      const charCount: Record<string, number> = {};

      for (let j = 0; j < 14; j += 1) {
        const char = input[i - j];
        charCount[char] = (charCount[char] || 0) + 1;
      }

      if (Object.values(charCount).every((count) => count === 1)) return i + 1;
    }

    return -1;
  };

  const main = () => {
    setAnswer1(part1(input).toString());
    setAnswer2(part2(input).toString());
  };

  useEffect(() => {
    main();
  }, []);

  return <Display answer1={answer1} answer2={answer2} />;
};

export default Day6;
