import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1A = (rawInput: string) => {
  const input = parseInput(rawInput)
  // const lines = input.split(/\n/g)

  // const seeds = lines[0].replace("seeds: ", "").split(" ").map(Number)

  // const minLocations = []
  // let loc = seeds[0]
  // seeds.forEach((seed) => {
  //   console.log("seed ", seed)
  //   input
  //     .split(/\n\n/)
  //     .splice(1)
  //     .forEach((line) => {
  //       let item = line.split(":\n")
  //       let key = item[0].replace(" map", "")
  //       const data = item[1].split("\n").map((d) => d.split(" ").map(Number))

  //       data.forEach(([to, from, range]) => {
  //         for (let i = 0; i < range; i++) {
  //           if (loc === from + i) {
  //             console.log(".", from + i, " => ", to + i)
  //             loc = to + i
  //             break
  //           }
  //         }
  //       })

  //       // console.log("location", findLocation(data, seed))
  //     })
  //   minLocations.push(loc)
  // })
  // console.log("minLocations", minLocations)

  const seeds = input
    .split(/\n/g)[0]
    .replace("seeds: ", "")
    .split(" ")
    .map(Number)
  const almanac = {}
  input
    .split(/\n\n/)
    .splice(1)
    .forEach((line) => {
      let item = line.split(":\n")
      let key = item[0].replace(" map", "")

      let data = item[1].split("\n").map((d) => d.split(" ").map(Number))

      const seedSoil = {}
      data.forEach(([to, from, range]) => {
        for (let i = 0; i < range; i++) {
          seedSoil[from + i] = to + i
        }
      })
      almanac[key] = seedSoil
    })

  const locations = []
  seeds.forEach((seed) => {
    let soil = almanac["seed-to-soil"][seed] ?? seed
    let fertilizer = almanac["soil-to-fertilizer"][soil] ?? soil
    let water = almanac["fertilizer-to-water"][fertilizer] ?? fertilizer
    let light = almanac["water-to-light"][water] ?? water
    let temperature = almanac["light-to-temperature"][light] ?? light
    let humidity =
      almanac["temperature-to-humidity"][temperature] ?? temperature
    let location = almanac["humidity-to-location"][humidity] ?? humidity

    locations.push(location)
  })
  console.log("locations", locations)

  return Math.min(...locations)
}

function mapTo(data, value) {
  for (const [to, from, range] of data) {
    if (value >= from && value <= from + range) {
      for (let i = 0; i < range; i++) {
        if (value == from + i) {
          return to + i
        }
      }
    }
  }
  return value
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const seeds = input
    .split(/\n/g)[0]
    .replace("seeds: ", "")
    .split(" ")
    .map(Number)

  const [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = input
    .split(/\n\n/)
    .splice(1)
    .map((d) => {
      let item = d.split(":\n")
      let data = item[1].split("\n").map((d) => d.split(" ").map(Number))
      // console.log(data)
      return data
    })

  const locations = []
  seeds.forEach((loc) => {
    loc = mapTo(seedToSoil, loc)
    loc = mapTo(soilToFertilizer, loc)
    loc = mapTo(fertilizerToWater, loc)
    loc = mapTo(waterToLight, loc)
    loc = mapTo(lightToTemperature, loc)
    loc = mapTo(temperatureToHumidity, loc)
    loc = mapTo(humidityToLocation, loc)
    locations.push(loc)
  })
  return Math.min(...locations)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const seeds = input
    .split(/\n/g)[0]
    .replace("seeds: ", "")
    .split(" ")
    .map(Number)

  const [
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemperature,
    temperatureToHumidity,
    humidityToLocation,
  ] = input
    .split(/\n\n/)
    .splice(1)
    .map((d) => {
      let item = d.split(":\n")
      let data = item[1].split("\n").map((d) => d.split(" ").map(Number))
      // console.log(data)
      return data
    })

  let minLocation = null
  for (let i = 0; i < seeds.length; i += 2) {
    let start = seeds[i]
    let range = seeds[i + 1]

    for (let j = 0; j < range; j++) {
      let loc = start + j
      // console.log("loc ", start + j)
      loc = mapTo(seedToSoil, loc)
      loc = mapTo(soilToFertilizer, loc)
      loc = mapTo(fertilizerToWater, loc)
      loc = mapTo(waterToLight, loc)
      loc = mapTo(lightToTemperature, loc)
      loc = mapTo(temperatureToHumidity, loc)
      loc = mapTo(humidityToLocation, loc)
      // console.log("location", loc)

      if (!minLocation) minLocation = loc

      minLocation = Math.min(loc, minLocation)
    }
    console.log("minLocation", minLocation)
  }
  return minLocation

  // let seedTupels = []
  // for (let i = 0; i < seeds.length; i += 2) {
  //   let start = i
  //   let range = i + 2

  //   for (let j = 0; j < range; j++) {
  //     let loc = start + j
  //     loc = mapTo(seedToSoil, loc)
  //     loc = mapTo(soilToFertilizer, loc)
  //     loc = mapTo(fertilizerToWater, loc)
  //     loc = mapTo(waterToLight, loc)
  //     loc = mapTo(lightToTemperature, loc)
  //     loc = mapTo(temperatureToHumidity, loc)
  //     loc = mapTo(humidityToLocation, loc)
  //     console.log("loc", loc)
  //   }
  // }
  // console.log(seedTupels)

  // const newSeeds = []
  // for (const [start, range] of seedTupels) {
  //   for (let i = 0; i < range; i++) {
  //     newSeeds.push(start + i)
  //   }
  // }

  // const locations = []
  // newSeeds.forEach((loc) => {
  //   loc = mapTo(seedToSoil, loc)
  //   loc = mapTo(soilToFertilizer, loc)
  //   loc = mapTo(fertilizerToWater, loc)
  //   loc = mapTo(waterToLight, loc)
  //   loc = mapTo(lightToTemperature, loc)
  //   loc = mapTo(temperatureToHumidity, loc)
  //   loc = mapTo(humidityToLocation, loc)
  //   locations.push(loc)
  // })
  // return Math.min(...locations)
  return 46
}

run({
  part1: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
