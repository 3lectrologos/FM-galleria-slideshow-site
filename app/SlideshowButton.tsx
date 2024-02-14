'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { getOrderedImages } from '@/app/util'

export default function SlideshowButton({
  className = '',
}: {
  className?: string
}) {
  const firstPieceUrl = encodeURI(`/piece/${getOrderedImages()[0].name}`)
  const pathname = usePathname()
  const [buttonText, setButtonText] = useState('start slideshow')
  const [buttonUrl, setButtonUrl] = useState(firstPieceUrl)

  useEffect(() => {
    const nameUri = pathname.split('/')
    if (nameUri.length > 1 && nameUri[1] === 'piece') {
      setButtonText('stop slideshow')
      setButtonUrl('/')
    } else {
      setButtonText('start slideshow')
      setButtonUrl(firstPieceUrl)
    }
  }, [pathname, firstPieceUrl])

  return (
    <Link
      href={buttonUrl}
      className={twMerge(
        `textStyle-link1 uppercase text-darkgray hover:text-black transition-colors cursor-pointer`,
        className
      )}
    >
      {buttonText}
    </Link>
  )
}
