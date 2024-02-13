'use client'

import Image from 'next/image'
import { ImageData } from '@/app/types'
import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ImageWithButton({
  imageData,
}: {
  imageData: ImageData
}) {
  const [theaterMode, setTheaterMode] = useState(false)

  return (
    <div className={`relative`}>
      <div>
        <Image
          className={twMerge(`hidden tablet:block`)}
          src={imageData.images.hero.large.slice(1)}
          alt={imageData.name}
          width={475}
          height={560}
          priority={true}
        />
      </div>
      <div className={`relative w-full h-[280px] tablet:hidden`}>
        <Image
          className={`object-cover`}
          src={imageData.images.hero.small.slice(1)}
          alt={imageData.name}
          fill={true}
          priority={true}
        />
      </div>
      <div
        className={twMerge(
          `absolute top-4 left-4 flex flex-row gap-x-[14px] w-[152px] h-10 bg-black/75 text-white justify-center items-center`,
          `tablet:top-auto tablet:bottom-4`,
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
  const imgWidth = imageData.sizes.gallery.width
  const imgHeight = imageData.sizes.gallery.height
  const defaultTopOffset = -48
  const [buttonOffset, setButtonOffset] = useState({
    top: 0,
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
        const divWidth = parseInt(widthString)
        const divHeight = parseInt(heightString)

        if (divWidth > imgWidth && divHeight > imgHeight) {
          const extraWidth = divWidth - imgWidth
          const extraHeight = divHeight - imgHeight
          setButtonOffset({
            top: extraHeight / 2,
            right: extraWidth / 2,
          })
        } else {
          const imgAspectRatio = imgWidth / imgHeight
          const divAspectRatio = divWidth / divHeight
          if (!imgAspectRatio || !divAspectRatio) return
          if (divAspectRatio > imgAspectRatio) {
            const actualImageWidth = divHeight * imgAspectRatio
            const extraWidth = divWidth - actualImageWidth
            setButtonOffset({ top: 0, right: extraWidth / 2 })
          } else if (divAspectRatio < imgAspectRatio) {
            const actualImageHeight = divWidth / imgAspectRatio
            const extraHeight = divHeight - actualImageHeight
            setButtonOffset({
              top: extraHeight / 2,
              right: 0,
            })
          }
        }
      }
    }

    computeButtonOffset()
    window.addEventListener('resize', computeButtonOffset)
    return () => window.removeEventListener('resize', computeButtonOffset)
  }, [imgWidth, imgHeight])

  return (
    <div
      id="theater-image-container"
      className={`fixed top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-center p-6 pt-12 tablet:p-12 bg-black/85`}
    >
      <div className={`relative w-full h-full flex flex-col`}>
        <button
          className={`absolute z-50 textStyle-theater uppercase text-white text-right hover:opacity-25 transition-opacity py-2`}
          style={{
            right: buttonOffset.right,
            top: defaultTopOffset + buttonOffset.top,
          }}
          onClick={onClose}
        >
          close
        </button>
        <div
          className={`relative flex-grow w-full h-full flex flex-col gap-10`}
        >
          <Image
            id="theater-image"
            className={`object-scale-down`}
            src={imageData.images.gallery.slice(1)}
            alt={imageData.name}
            fill={true}
            priority={true}
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
