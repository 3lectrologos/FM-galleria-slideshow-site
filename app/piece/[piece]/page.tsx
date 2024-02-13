import { notFound } from 'next/navigation'
import { ImageData } from '@/app/types'
import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Footer from '@/app/piece/[piece]/Footer'
import ImageWithButton from '@/app/piece/[piece]/ImageWithButton'
import { getOrderedImages } from '@/app/util'

export default function Home({ params }: { params: { piece: string } }) {
  const name = decodeURI(params.piece)
  const data = getOrderedImages()
  const imageIndex = data.findIndex((image) => image.name === name)
  if (imageIndex === -1) {
    return notFound()
  }
  const imageData: ImageData = data[imageIndex]

  return (
    <div className={`w-full flex-grow flex flex-col items-center`}>
      <div
        className={twMerge(
          `w-full flex flex-col justify-between px-6 tablet:px-10`,
          `tablet:max-w-[900px]`,
          `desktop:max-w-[1500px] desktop:mt-[100px] desktop:flex-row`
        )}
      >
        <ImageDetails className={`shrink-0`} imageData={imageData} />
        <div
          className={twMerge(
            `h-[100px]`,
            `tablet:h-16`,
            `desktop:min-w-0 desktop:w-[500px]`
          )}
        />
        <ImageText imageData={imageData} />
      </div>
      <div className={`flex-grow desktop:h-20`} />
      <Footer
        imageData={imageData}
        index={imageIndex + 1}
        total={data.length}
        nextName={data[imageIndex + 1]?.name}
        prevName={data[imageIndex - 1]?.name}
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
    <div className={twMerge(`relative`, className)}>
      <ImageWithButton imageData={imageData} />
      <div
        className={twMerge(
          `absolute flex flex-col justify-between -translate-y-[54px]`,
          `tablet:right-0 tablet:top-0 tablet:w-[445px] tablet:translate-y-0`,
          `desktop:h-full desktop:top-0 desktop:right-16 desktop:translate-x-full desktop:translate-y-0`
        )}
      >
        <div
          className={twMerge(
            `flex flex-col w-[280px] gap-y-2 bg-white p-6`,
            `tablet:w-auto tablet:p-0 tablet:pl-16 tablet:pb-16 tablet:gap-y-6`,
            `tablet:pr-10 desktop:pr-0`,
            `desktop:w-auto desktop:gap-y-6`
          )}
        >
          <span className={`textStyle-h1 w-full desktop:w-[320px]`}>
            {imageData.name}
          </span>
          <span className={`textStyle-sh1 text-darkgray`}>
            {imageData.artist.name}
          </span>
        </div>
        <div
          className={twMerge(
            `relative w-16 h-16 translate-x-4`,
            `tablet:w-32 tablet:h-32 tablet:self-end`,
            `tablet:mr-[55px] desktop:mr-0`,
            `desktop:self-start desktop:translate-y-1/2`
          )}
        >
          <Image
            className={`desktop:translate-x-1/2 desktop:ml-[30px]`}
            src={imageData.artist.image.slice(1)}
            alt={imageData.artist.name}
            fill={true}
            sizes="(max-width: 729px) 64px, 128px"
          />
        </div>
      </div>
    </div>
  )
}

function ImageText({ imageData }: { imageData: ImageData }) {
  return (
    <div
      className={`relative flex flex-col pb-20 desktop:pb-0 desktop:pr-[50px]`}
    >
      <span
        className={`absolute right-0 textStyle-display text-lightgray tablet:left-0 desktop:left-auto desktop:right-0`}
      >
        {imageData.year}
      </span>
      <span
        className={twMerge(
          `w-full textStyle-body text-darkgray z-10 mt-[75px]`,
          `tablet:w-[70%] tablet:self-center`,
          `desktop:self-auto desktop:w-[350px] desktop:mt-[115px]`
        )}
      >
        {imageData.description}
      </span>
      <div className={`h-10 desktop:h-0 desktop:grow`} />
      <Link
        className={twMerge(
          `textStyle-link2 text-darkgray uppercase underline hover:text-black transition-colors`,
          `tablet:w-[70%] tablet:self-center`,
          `desktop:self-auto desktop:w-auto`
        )}
        href={imageData.source}
        target="_blank"
      >
        go to source
      </Link>
    </div>
  )
}
