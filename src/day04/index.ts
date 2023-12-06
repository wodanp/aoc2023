import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return input.split("\n").reduce((sum, line) => {
    let [, , winningString, , , , , numbersString] = line
      .replace(/ +/g, " ")
      .split(/^Card (\d+): ([\s\d+]*) | (.*)/g)

    let winning = winningString.split(" ").map(Number)
    let numbers = numbersString.split(" ").map(Number)

    // let cardValue = 0
    // numbers.forEach((n) => {
    //   if (winning.includes(n)) {
    //     console.log(n)
    //     cardValue++
    //   }
    // })
    // console.log("cardValue", cardValue)

    let matches = numbers.filter((n) => winning.includes(n))
    if (matches.length > 0) {
      sum += Math.pow(2, matches.length - 1)
    }

    return sum
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  // 4   1
  // 2   11
  // 2   1111
  // 1   11111111
  // 0   11111111111111
  // 0   1

  const matchesPerCard = input.split("\n").map((line) => {
    let [, , winningString, , , , , numbersString] = line
      .replace(/ +/g, " ")
      .split(/^Card (\d+): ([\s\d+]*) | (.*)/g)

    let winning = winningString.split(" ").map(Number)
    let numbers = numbersString.split(" ").map(Number)
    let matches = numbers.filter((n) => winning.includes(n))

    return matches.length ?? 0
  })

  const scratchcards: Map<number, number> = new Map(
    new Array(matchesPerCard.length).fill(1).map((_, i) => [i, 1]),
  )
  console.log(matchesPerCard)
  console.log(scratchcards)

  for (const [i, matches] of matchesPerCard.entries()) {
    if (matches === 0) continue
    const cardsAtSlot = scratchcards.get(i)
    for (let j = 1; j <= matches; j++) {
      scratchcards.set(i + j, scratchcards.get(i + j) + cardsAtSlot)
    }
  }

  return Array.from(scratchcards.values()).reduce(
    (sum, count) => sum + count,
    0,
  )
}

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11 
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11        
        `,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
