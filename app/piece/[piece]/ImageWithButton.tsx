'use client'

import Image from 'next/image'
import { ImageData } from '@/app/types'
import { twMerge } from 'tailwind-merge'
import { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ImageWithButton({
  imageData,
}: {
  imageData: ImageData
}) {
  const [theaterMode, setTheaterMode] = useState(false)

  return (
    <div className={`relative`}>
      <Image
        src={imageData.images.hero.large.slice(1)}
        alt={imageData.name}
        width={475}
        height={560}
        priority={true}
      />
      <div
        className={twMerge(
          `absolute bottom-4 left-4 flex flex-row gap-x-[14px] w-[152px] h-10 bg-black/75 text-white justify-center items-center`,
          `hover:bg-white/25 transition-colors cursor-pointer`
        )}
        role="button"
        aria-label="view image"
        tabIndex={0}
        onClick={() => setTheaterMode(true)}
      >
        <div className={`w-3 h-3`}>
          <ViewImageIcon />
        </div>
        <div className={`textStyle-button uppercase pt-0.5`}>view image</div>
      </div>
      {theaterMode &&
        createPortal(
          <TheaterImage
            imageData={imageData}
            onClose={() => setTheaterMode(false)}
          />,
          document.body
        )}
    </div>
  )
}

function TheaterImage({
  imageData,
  onClose,
}: {
  imageData: ImageData
  onClose: () => void
}) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 })
  const defaultTopOffset = -40
  const [buttonOffset, setButtonOffset] = useState({
    top: defaultTopOffset,
    right: 0,
  })

  useEffect(() => {
    function computeButtonOffset() {
      const img: HTMLImageElement | null = document.getElementById(
        'theater-image'
      ) as HTMLImageElement
      if (img) {
        const { width: widthString, height: heightString } =
          window.getComputedStyle(img)
        const width = parseInt(widthString)
        const height = parseInt(heightString)
        const imgAspectRatio = imageSize.width / imageSize.height
        const divAspectRatio = width / height
        if (!imgAspectRatio || !divAspectRatio) return
        if (divAspectRatio > imgAspectRatio) {
          const actualImageWidth = height * imgAspectRatio
          const extraWidth = width - actualImageWidth
          setButtonOffset((offset) => ({
            top: defaultTopOffset,
            right: extraWidth / 2,
          }))
        } else if (divAspectRatio < imgAspectRatio) {
          const actualImageHeight = width / imgAspectRatio
          const extraHeight = height - actualImageHeight
          setButtonOffset((offset) => ({
            top: defaultTopOffset + extraHeight / 2,
            right: 0,
          }))
        }
      }
    }

    computeButtonOffset()
    window.addEventListener('resize', computeButtonOffset)
    return () => window.removeEventListener('resize', computeButtonOffset)
  }, [imageSize])

  return (
    <div
      className={`absolute top-0 left-0 w-dvw h-dvh z-20 flex flex-col justify-center items-center bg-black/85`}
    >
      <div className={`relative w-[75%] h-[75%] flex flex-col`}>
        <button
          className={`absolute z-50 textStyle-theater uppercase text-white text-right hover:opacity-25 transition-opacity`}
          style={{ right: buttonOffset.right, top: buttonOffset.top }}
          onClick={onClose}
        >
          close
        </button>
        <div
          className={`relative flex-grow w-full h-full flex flex-col gap-10`}
        >
          <Image
            id="theater-image"
            className={`object-contain max-w-[100%] max-h-[100%]`}
            src={imageData.images.gallery.slice(1)}
            alt={imageData.name}
            fill={true}
            onLoad={(event) => {
              const img = event.target as HTMLImageElement
              setImageSize({
                width: img.naturalWidth,
                height: img.naturalHeight,
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

function ViewImageIcon() {
  return (
    <svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
      <g fill="#FFF" fillRule="nonzero">
        <path d="M7.714 0l1.5 1.5-2.357 2.357 1.286 1.286L10.5 2.786l1.5 1.5V0zM3.857 6.857L1.5 9.214 0 7.714V12h4.286l-1.5-1.5 2.357-2.357zM8.143 6.857L6.857 8.143 9.214 10.5l-1.5 1.5H12V7.714l-1.5 1.5zM4.286 0H0v4.286l1.5-1.5 2.357 2.357 1.286-1.286L2.786 1.5z" />
      </g>
    </svg>
  )
}
