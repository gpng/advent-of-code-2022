import { intersection } from "lodash";
import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day3";
import { stringLinesToString } from "../utils";

const charToNumber = (char: string): number => {
  const charCode = char.charCodeAt(0);

  if (charCode >= 97) {
    return charCode - 96;
  }

  return charCode - 38;
};

const findCommonChar = (str1: string, str2: string, str3: string): string => {
  const commonChars = intersection(
    str1.split(""),
    str2.split(""),
    str3.split("")
  );

  return commonChars[0];
};

const Day3 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (lines: string[]): number => {
    let sum = 0;

    lines.forEach((line) => {
      const firstHalf = line.slice(0, line.length / 2);
      const secondHalf = line.slice(line.length / 2);

      const commonCharacter = firstHalf.split("").find((char) => {
        return secondHalf.includes(char);
      });

      sum += commonCharacter ? charToNumber(commonCharacter) : 0;
    });

    return sum;
  };

  const part2 = (lines: string[]): number => {
    const groups = lines.length / 3;
    let sum = 0;

    for (let i = 0; i < groups; i++) {
      const first = lines[i * 3];
      const second = lines[i * 3 + 1];
      const third = lines[i * 3 + 2];

      const commonChar = findCommonChar(first, second, third);

      sum += commonChar ? charToNumber(commonChar) : 0;
    }

    return sum;
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

export default Day3;
