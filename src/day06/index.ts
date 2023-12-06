import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

/**
h=0 => 0mm	kein release
h=1 => 6mm	6sec fahrt (1mm/s)
h=2 => 10mm 	5sec fahrt (2mm/s)
h=3 => 12mm	4sec fahrt
h=4 => 12mm	3sec fahrt
h=5 => 10mm
h=6 => 6mm
h=7 => 0mm 	full hold => keine fahrt

t= 7; d=9

(t-h)*h
(7-4)*4
 */
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const [times, distances] = input
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").match(/\d+/g).map(Number))

  console.log(times)
  console.log(distances)

  let records = []
  for (let i = 0; i < times.length; i++) {
    let [time, distance] = [times[i], distances[i]]
    let wins = 0
    for (let i = 0; i < time; i++) {
      console.log((time - i) * i)
      if ((time - i) * i > distance) wins++
    }
    console.log(wins)
    records.push(wins)
  }

  return records.reduce((acc, i) => acc * i, 1)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const [times, distances] = input
    .split("\n")
    .map((line) => line.replace(/\s+/g, "").match(/\d+/g).map(Number))

  console.log("times", times)
  console.log("distances", distances)

  const time = times[0]
  const distance = distances[0]

  let record = 0
  for (let i = 0; i < time; i++) {
    if ((time - i) * i > distance) record++
  }

  return record
}

run({
  part1: {
    tests: [
      {
        input: `
        Time:      7  15   30
Distance:  9  40  200
        `,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Time:      7  15   30
Distance:  9  40  200
        `,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
