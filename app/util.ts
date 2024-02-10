import seedrandom from 'seedrandom'

export function shuffleArray(array: any[], seed: string) {
  let generator = seedrandom(seed)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(generator() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
