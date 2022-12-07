import { useEffect, useState } from "react";
import Display from "../components/Display";
import input from "../data/day7";
import { stringLinesToStrings } from "../utils";

interface File {
  name: string;
  size: number;
}

interface Directory {
  rootDirectory?: Directory;
  name: string;
  files: File[];
  directories: Directory[];
}

const directorySize = (directory: Directory): number => {
  // sum of file sizes
  let size = directory.files.reduce((acc, file) => acc + file.size, 0);
  // sum of directory sizes
  size += directory.directories.reduce(
    (acc, dir) => acc + directorySize(dir),
    0
  );

  return size;
};

const generateDirectoryTree = (input: string[][]): Directory => {
  const rootDirectory: Directory = {
    name: "/",
    files: [],
    directories: [],
  };

  let currDirectory = rootDirectory;

  let command = "";

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    if (command === "ls") {
      if (line[0] === "dir") {
        // create directory if not created
        const dirName = line[1];
        const dir = currDirectory.directories.find(
          (dir) => dir.name === dirName
        );
        if (!dir) {
          currDirectory.directories.push({
            rootDirectory: currDirectory,
            name: dirName,
            files: [],
            directories: [],
          });
        }
        continue;
      }
      const num = parseInt(line[0], 10);
      // is a file
      if (!isNaN(num)) {
        currDirectory.files.push({
          name: line[1],
          size: num,
        });
      }
    }
    // is a command
    if (line[0] === "$") {
      if (line[1] === "ls") {
        command = "ls";
        continue;
      }
      if (line[1] === "cd") {
        command = "";
        if (line[2] === "..") {
          if (currDirectory.rootDirectory) {
            currDirectory = currDirectory.rootDirectory;
          }
          continue;
        }
        const newDirectory = currDirectory.directories.find(
          (dir) => dir.name === line[2]
        );
        if (newDirectory) {
          currDirectory = newDirectory;
        }
      }
    }
  }

  return rootDirectory;
};

const Day7 = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");

  const part1 = (input: string[][]): number => {
    const rootDirectory = generateDirectoryTree(input);

    let sum = 0;

    let dirs = rootDirectory.directories;

    while (dirs.length > 0) {
      const dir = dirs.pop();
      if (dir) {
        const size = directorySize(dir);
        if (size <= 100000) {
          sum += directorySize(dir);
        }
        dirs = dirs.concat(dir.directories);
      }
    }

    return sum;
  };

  const part2 = (input: string[][]): number => {
    const rootDirectory = generateDirectoryTree(input);

    const sizeRequired = 30000000 - (70000000 - directorySize(rootDirectory));
    let toDelete = Number.MAX_SAFE_INTEGER;

    let dirs = rootDirectory.directories;

    while (dirs.length > 0) {
      const dir = dirs.pop();
      if (dir) {
        const size = directorySize(dir);
        if (size >= sizeRequired && size < toDelete) {
          toDelete = size;
        }
        dirs = dirs.concat(dir.directories);
      }
    }

    return toDelete;
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

export default Day7;
