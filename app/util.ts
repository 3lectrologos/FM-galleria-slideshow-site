import data from '@/app/data/data.json'
import seedrandom from 'seedrandom'
import { AllowedColumns } from '@/app/types'
import { ImageData } from '@/app/types'

/*
This uses a greedy approximation algorithm (see https://en.wikipedia.org/wiki/Longest-processing-time-first_scheduling).
 */
export function masonry(
  numColumns: AllowedColumns,
  seed: string = 'foobar42'
): ImageData[][] {
  if (numColumns === 0) {
    return []
  } else if (numColumns === 1 || numColumns === 2) {
    const columns = masonry(4, seed)
    const result: ImageData[][] = Array.from({ length: numColumns }, () => [])
    const maxColumnLength = Math.max(...columns.map((column) => column.length))
    for (let i = 0; i < maxColumnLength; i++) {
      columns.forEach((column, index) => {
        if (column[i]) {
          result[index % numColumns].push(column[i])
        }
      })
    }
    return result
  }

  const columns: ImageData[][] = Array.from({ length: numColumns }, () => [])
  const heights: number[] = Array.from({ length: numColumns }, () => 0)
  const sortedImages = data.sort((a, b) => {
    return b.sizes.thumbnail.height - a.sizes.thumbnail.height
  })

  sortedImages.forEach((image) => {
    const thisHeight = image.sizes.thumbnail.height
    const minHeightColumn = heights.indexOf(Math.min(...heights))
    columns[minHeightColumn].push(image)
    heights[minHeightColumn] += thisHeight
  })

  for (let column of columns) {
    shuffleArray(column, seed)
  }
  shuffleArray(columns, seed)

  return columns
}

export function getOrderedImages(seed?: string) {
  const columns = masonry(4, seed)
  const maxColumnLength = Math.max(...columns.map((column) => column.length))
  const orderedImages: ImageData[] = []
  for (let i = 0; i < maxColumnLength; i++) {
    columns.forEach((column) => {
      if (column[i]) {
        orderedImages.push(column[i])
      }
    })
  }
  return orderedImages
}

export function shuffleArray(array: any[], seed: string) {
  let generator = seedrandom(seed)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(generator() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
