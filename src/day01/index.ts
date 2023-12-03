import run from "aocrunner"
import { listenerCount } from "process"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.split("\n").reduce((sum, group) => {
    let values = group.match(/\d/g)
    let value = values[0] + values.slice(-1)
    return (sum += +value)
  }, 0)
}

const numbers: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
}

// const replaceWords = (line: string) => {
//   const minMatch = []
//   const maxMatch = []
//   const matches = []

//   Object.keys(numbers).forEach((key) => {
//     let number = numbers[key]

//     // let firstP = line.indexOf(key)
//     // if (firstP !== -1) {
//     //   minMatch.push({ firstP, key, number })
//     // }

//     // let lastP = line.lastIndexOf(key)
//     // if (lastP !== -1) {
//     //   maxMatch.push({ pos: lastP, key, number })
//     // }

//     let posFirst = line.indexOf(key)
//     let posLast = line.lastIndexOf(key)
//     if (posFirst !== -1) {
//       let number = numbers[key]
//       matches.push({ pos: posFirst, key, number })
//     }
//     if (posLast !== -1) {
//       let number = numbers[key]
//       matches.push({ pos: posLast, key, number })
//     }
//   })
//   console.log(minMatch, maxMatch)
//   // console.log(matches)

//   // matches.sort((a, b) => a.pos - b.pos)
//   // console.log(matches)

//   // if (matches.length >= 1) {
//   //   line = line.replace(matches[0].key, matches[0].number)
//   // }
//   // if (matches.length >= 2) {
//   //   let i = matches.slice(-1)[0]
//   //   line = line.replace(i.key, i.number)
//   // }
//   return line
// }

function findNumbers(input: string) {
  const words = [...Object.keys(numbers), ...Object.values(numbers)]
  const matches = []

  for (const word of words) {
    let pos = input.indexOf(word)
    while (pos !== -1) {
      let value = numbers[word] ?? word
      matches.push({ pos, value: value })
      pos = input.indexOf(word, pos + 1)
    }
  }

  return matches.sort((a, b) => a.pos - b.pos)
}

//54609 inn 54580  => 54591
const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input
    .split("\n")
    .map((line) => {
      console.log("line: ", line)
      const values = findNumbers(line)
      console.log("values: ", values)

      if (!values.length) return 0

      console.log(values[0].value + values[values.length - 1].value)
      return parseInt(values[0].value + values[values.length - 1].value)
    })
    .reduce((a, b) => a + b, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet
        `,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen
        `,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
