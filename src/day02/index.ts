import run from "aocrunner"
import { listenerCount } from "process"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.split("\n").reduce((sum, line) => {
    const [, id, sets] = line.split(/^Game (\d+): (.*)$/g)

    let valid_game = true
    sets.split("; ").forEach((set) => {
      let valid_set = true
      set.split(", ").forEach((item) => {
        const [n, color] = item.split(" ")
        switch (color) {
          case "red":
            if (+n > 12) valid_set = false
            break
          case "green":
            if (+n > 13) valid_set = false
            break
          case "blue":
            if (+n > 14) valid_set = false
            break
        }
      })
      if (!valid_set) valid_game = false
    })

    if (valid_game) return (sum += +id)
    else return sum
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.split("\n").reduce((sum, line) => {
    const [, , sets] = line.split(/^Game (\d+): (.*)$/g)

    let maxRed = 1
    let maxGreen = 1
    let maxBlue = 1

    sets.split("; ").forEach((set) => {
      set.split(", ").forEach((item) => {
        const [n, color] = item.split(" ")
        switch (color) {
          case "red":
            maxRed = Math.max(+n, maxRed)
            break
          case "green":
            maxGreen = Math.max(+n, maxGreen)
            break
          case "blue":
            maxBlue = Math.max(+n, maxBlue)
            break
        }
      })
    })

    return (sum += maxRed * maxGreen * maxBlue)
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green        
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green        
        `,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
