import run from "aocrunner"
import { log } from "console"

const parseInput = (rawInput: string) => rawInput

const isDigit = (char: string) => /[0-9]/.test(char)
const isSymbol = (char: string) => char !== "." && !isDigit(char)

function hasSymboleAt(
  grid: string[][],
  x: number,
  y: number,
  validation: Function,
): { x: number; y: number } | null {
  const rows = grid.length
  const cols = grid[0].length

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let dx = x + i
      let dy = y + j

      if (dx < 0 || dy < 0 || dx >= cols || dy >= rows || (i == 0 && j == 0)) {
        continue
      }

      if (validation(grid[dy][dx])) {
        return { x: dy, y: dx }
      }
    }
  }
  return null
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const grid = input.split("\n").map((line) => line.split(""))

  let sum = 0
  for (const [y, row] of grid.entries()) {
    let part: { value: string; hasSymbole: boolean } = {
      value: "",
      hasSymbole: false,
    }
    for (const [x, element] of row.entries()) {
      if (isDigit(element)) {
        part.value += element
        if (hasSymboleAt(grid, x, y, isSymbol)) {
          part.hasSymbole = true
        }
      } else {
        // if (part.value != "") console.log(part)

        if (part.hasSymbole) {
          sum += +part.value
        }
        part.value = ""
        part.hasSymbole = false
      }

      if (isDigit(element) && x == grid[0].length - 1) {
        if (part.value != "") console.log(part)

        if (part.hasSymbole) {
          sum += +part.value
        }
        part.value = ""
        part.hasSymbole = false
      }
    }
  }

  return sum
}

const isGear = (char: string) => char === "*"

function removeDuplicates(arr) {
  let seen = new Set()
  return arr.filter((obj) => {
    let objKey = obj.x.toString() + "|" + obj.y.toString() // Erstelle einen Schlüssel aus x und y
    if (!seen.has(objKey)) {
      seen.add(objKey)
      return true
    }
    return false
  })
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const grid = input.split("\n").map((line) => line.split(""))

  const gears: { value?: string; gearKeys?: string[] } = {}
  for (const [y, row] of grid.entries()) {
    let part: { value: string; gearKeys?: string[] } = {
      value: "",
      gearKeys: [],
    }
    for (const [x, element] of row.entries()) {
      if (isDigit(element)) {
        part.value += element
        let hasGearAT = hasSymboleAt(grid, x, y, isGear)

        if (hasGearAT) {
          let key = hasGearAT.x + "_" + hasGearAT.y
          if (!part.gearKeys.includes(key)) {
            part.gearKeys.push(key)
          }
        }
      } else {
        if (part.value != "") {
          console.log(part)
        }
        if (part.gearKeys.length > 0) {
          part.gearKeys.forEach((i) => {
            if (i in gears) {
              gears[i].push(part.value)
            } else {
              gears[i] = [part.value]
            }
          })
        }
        part.value = ""
        part.gearKeys = []
      }

      if (isDigit(element) && x == grid[0].length - 1) {
        if (part.gearKeys.length > 0) {
          part.gearKeys.forEach((i) => {
            if (i in gears) {
              gears[i].push(part.value)
            } else {
              gears[i] = [part.value]
            }
          })
        }

        part.value = ""
        part.gearKeys = []
      }
    }
  }
  console.log(gears)

  let sum = 0
  Object.values(gears).forEach((values) => {
    if (values.length === 2) {
      sum += +values[0] * +values[1]
    }
  })

  return sum
}

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
