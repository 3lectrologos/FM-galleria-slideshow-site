import data from '@/app/data/data.json'
import { notFound } from 'next/navigation'
import { ImageData } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Footer from '@/app/piece/[piece]/Footer'
import ImageWithButton from '@/app/piece/[piece]/ImageWithButton'

export default function Home({ params }: { params: { piece: string } }) {
  const name = decodeURI(params.piece)
  const imageIndex = data.findIndex((image) => image.name === name)
  if (imageIndex === -1) {
    return notFound()
  }
  const imageData: ImageData = data[imageIndex]

  return (
    <div
      className={`w-full flex-grow flex flex-col justify-between items-center`}
    >
      <div
        className={`max-w-[1500px] flex flex-row justify-between mt-[100px] px-10`}
      >
        <ImageDetails className={`shrink-0`} imageData={imageData} />
        <div className={`min-w-0 w-[500px]`} />
        <ImageText imageData={imageData} />
      </div>
      <Footer
        imageData={imageData}
        index={imageIndex + 1}
        total={data.length}
      />
    </div>
  )
}

function ImageDetails({
  imageData,
  className = '',
}: {
  imageData: ImageData
  className?: string
}) {
  return (
    <div className={twMerge(`relative pb-[11px]`, className)}>
      <ImageWithButton imageData={imageData} />
      <div
        className={`absolute top-0 right-16 translate-x-full pl-16 pb-16 flex flex-col gap-y-6 bg-white`}
      >
        <span className={`textStyle-h1 w-[380px]`}>{imageData.name}</span>
        <span className={`textStyle-sh1 text-darkgray`}>
          {imageData.artist.name}
        </span>
      </div>
      <div
        className={`absolute bottom-[11px] -right-[30px] translate-x-full translate-y-1/2`}
      >
        <Image
          src={imageData.artist.image.slice(1)}
          alt={imageData.artist.name}
          width={128}
          height={128}
        />
      </div>
    </div>
  )
}

function ImageText({ imageData }: { imageData: ImageData }) {
  return (
    <div className={`flex flex-col`}>
      <span className={`textStyle-display text-lightgray`}>
        {imageData.year}
      </span>
      <span className={`w-[350px] textStyle-body text-darkgray -mt-9`}>
        {imageData.description}
      </span>
      <div className={`h-0 grow`} />
      <Link
        className={`textStyle-link2 text-darkgray uppercase underline hover:text-black transition-colors`}
        href={imageData.source}
        target="_blank"
      >
        go to source
      </Link>
    </div>
  )
}
