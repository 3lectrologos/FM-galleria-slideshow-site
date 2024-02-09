'use client'

import data from '@/app/data/data.json'
import { usePathname } from 'next/navigation'
import { ImageData } from '@/app/types'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import { className } from 'postcss-selector-parser'

function getUrls(pathname: string) {
  const nameUri = pathname.split('/').pop()
  if (!nameUri) return { prevUrl: '', nextUrl: '' }
  const name = decodeURI(nameUri)
  const index = data.findIndex((image) => image.name === name)
  const prevUrl = index === 0 ? '' : `/piece/${data[index - 1].name}`
  const nextUrl =
    index === data.length - 1 ? '' : `/piece/${data[index + 1].name}`
  return { prevUrl, nextUrl }
}

export default function Footer({
  index,
  total,
  imageData,
}: {
  index: number
  total: number
  imageData: ImageData
}) {
  const pathname = usePathname()
  const { nextUrl, prevUrl } = getUrls(pathname)

  return (
    <div className={`w-full`}>
      <FooterProgressBar index={index} total={total} />
      <div className={`flex flex-col px-6 py-[17px] tablet:px-10 tablet:py-6`}>
        <div className={`flex flex-row justify-between items-center`}>
          <FooterText imageData={imageData} />
          <FooterButtons previousUrl={prevUrl} nextUrl={nextUrl} />
        </div>
      </div>
    </div>
  )
}

function FooterText({ imageData }: { imageData: ImageData }) {
  return (
    <div className={`flex flex-col gap-y-2`}>
      <span className={`textStyle-h3`}>{imageData.name}</span>
      <span className={`textStyle-sh2 text-black/75`}>
        {imageData.artist.name}
      </span>
    </div>
  )
}

function FooterProgressBar({ index, total }: { index: number; total: number }) {
  const percentage = (index / total) * 100

  return (
    <div className={`relative flex flex-row w-full`}>
      <div className={`w-full h-px bg-gray`} />
      <div
        className={`absolute top-0 h-px bg-black`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}

function FooterButtons({
  nextUrl,
  previousUrl,
}: {
  nextUrl: string
  previousUrl: string
}) {
  return (
    <div className={`flex flex-row justify-between gap-x-2 tablet:gap-x-5`}>
      <FooterButton
        label="previous"
        url={previousUrl}
        icon={(props) => <PrevIcon {...props} />}
      />
      <FooterButton
        label="next"
        url={nextUrl}
        icon={(props) => <NextIcon {...props} />}
      />
    </div>
  )
}

function FooterButton({
  icon,
  label,
  url,
}: {
  icon: (_p: any) => React.ReactNode
  label: string
  url: string
}) {
  return (
    <Link
      href={url}
      className={twMerge(
        `p-2 group`,
        url || `pointer-events-none cursor-default`
      )}
      role="button"
      aria-label={label}
      tabIndex={0}
    >
      <div className={`w-[17.33px] h-4 tablet:w-[26px] tablet:h-6`}>
        {icon({
          className: twMerge(
            `stroke-black`,
            url ? 'opacity-100' : 'opacity-15',
            url && `transition-opacity group-hover:opacity-50`
          ),
        })}
      </div>
    </Link>
  )
}

function PrevIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z"
          strokeWidth="2"
        />
        <path fill="#D8D8D8" d="M.986.5h-1v22.775h1z" />
      </g>
    </svg>
  )
}

function NextIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 26 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z"
          strokeWidth="2"
        />
        <path fill="#D8D8D8" d="M24.708.5h1v22.775h-1z" />
      </g>
    </svg>
  )
}
