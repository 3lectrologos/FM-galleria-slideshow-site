'use client'

import { ImageData } from '@/app/types'
import data from '@/app/data/data.json'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { PuffLoader } from 'react-spinners'
import Link from 'next/link'

function arrange(
  images: ImageData[],
  totalWidth: number,
  numColumns: number,
  gap: number
): ImageData[][] {
  const imageWidth = (totalWidth - gap * (numColumns + 1)) / numColumns
  const columns: ImageData[][] = Array.from({ length: numColumns }, () => [])
  console.log(totalWidth, imageWidth)

  images.forEach((image, index) => {
    const column = index % numColumns
    columns[column].push(image)
  })

  console.log(columns)
  return columns
}

export default function ImageGrid({ className = '' }: { className?: string }) {
  const [columns, setColumns] = useState<ImageData[][]>([])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 580) {
        setColumns(arrange(data, window.innerWidth, 1, 40))
      } else if (window.innerWidth < 950) {
        setColumns(arrange(data, window.innerWidth, 2, 40))
      } else if (window.innerWidth < 1300) {
        setColumns(arrange(data, window.innerWidth, 3, 40))
      } else if (window.innerWidth < 1700) {
        setColumns(arrange(data, window.innerWidth, 4, 40))
      } else {
        setColumns(arrange(data, window.innerWidth, 5, 40))
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (columns.length === 0) {
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
