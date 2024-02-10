'use client'

import { ImageData } from '@/app/types'
import data from '@/app/data/data.json'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { PuffLoader } from 'react-spinners'
import Link from 'next/link'
import { shuffleArray } from '@/app/util'

function masonry(images: ImageData[], numColumns: number): ImageData[][] {
  if (numColumns === 0) {
    return []
  }

  const columns: ImageData[][] = Array.from({ length: numColumns }, () => [])
  const heights: number[] = Array.from({ length: numColumns }, () => 0)
  const sortedImages = images.sort((a, b) => {
    return b.sizes.thumbnail.height - a.sizes.thumbnail.height
  })

  sortedImages.forEach((image, index) => {
    const thisHeight = image.sizes.thumbnail.height
    const minHeightColumn = heights.indexOf(Math.min(...heights))
    columns[minHeightColumn].push(image)
    heights[minHeightColumn] += thisHeight
  })

  const seed = '42'
  for (let column of columns) {
    shuffleArray(column, seed)
  }
  shuffleArray(columns, seed)

  return columns
}

export default function ImageGrid({ className = '' }: { className?: string }) {
  const [numColumns, setNumColumns] = useState(0)
  const columns = useMemo(() => masonry(data, numColumns), [numColumns])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 580) {
        setNumColumns(1)
      } else if (window.innerWidth < 950) {
        setNumColumns(2)
      } else if (window.innerWidth < 1300) {
        setNumColumns(3)
      } else if (window.innerWidth < 1700) {
        setNumColumns(4)
      } else {
        setNumColumns(5)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (numColumns === 0) {
    return <Loading />
  }

  return (
    <div className={twMerge(`flex flex-row gap-x-10`, className)}>
      {columns.map((column, index) => (
        <div key={index} className={`flex flex-col gap-y-10`}>
          {column.map((imageData) => (
            <ImageCard
              key={imageData.name}
              name={imageData.name}
              artist={imageData.artist.name}
              path={imageData.images.thumbnail.slice(1)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

function ImageCard({
  name,
  artist,
  path,
}: {
  name: string
  artist: string
  path: string
}) {
  return (
    <Link
      className={`relative w-fit h-fit group cursor-pointer`}
      role="button"
      aria-label={name}
      tabIndex={0}
      href={`/piece/${name}`}
    >
      <img className={`object-contain`} src={path} alt={name} />
      <div
        className={`absolute top-0 w-full h-full bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <div
        className={`absolute flex flex-col justify-end bottom-0 w-full h-[170px] bg-gradient-to-b from-black/0 to-black/[84%]`}
      >
        <div className={`flex flex-col gap-y-2 ml-8 mr-12 mb-8`}>
          <span className={`textStyle-h2 text-white`}>{name}</span>
          <span className={`textStyle-sh2 text-white/75`}>{artist}</span>
        </div>
      </div>
    </Link>
  )
}

function Loading() {
  return (
    <div className={`mt-64`}>
      <PuffLoader className={``} color="#E5E5E5" size={150} />
    </div>
  )
}
