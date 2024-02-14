'use client'

import Image from 'next/image'
import { ImageData } from '@/app/types'
import { twMerge } from 'tailwind-merge'
import { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

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
  useLayoutEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.target !== document.getElementById('theater-image')) {
        onClose()
      }
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      id="theater-image-container"
      className={`fixed top-0 left-0 w-full h-full z-20 flex flex-col justify-center items-center p-6 tablet:p-12 bg-black/85`}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-center`}
      >
        <div className={`relative max-h-full`}>
          <button
            className={twMerge(
              `absolute top-0 right-0 p-1.5 translate-x-1/2 -translate-y-1/2 self-end`,
              `textStyle-theater uppercase text-white text-right`,
              `hover:fill-lightgray/50 transition-opacity`
            )}
            onClick={onClose}
          >
            <div
              className={`w-7 h-7 bg-black rounded-full fill-white/80 hover:bg-white/25 hover:fill-white transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z" />
              </svg>
            </div>
          </button>
          <img
            id="theater-image"
            className={`max-h-full object-scale-down`}
            src={imageData.images.gallery.slice(1)}
            alt={imageData.name}
          />
        </div>
      </div>
    </motion.div>
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
