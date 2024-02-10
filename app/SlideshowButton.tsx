'use client'

import data from '@/app/data/data.json'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SlideshowButton({
  className = '',
}: {
  className?: string
}) {
  const firstPieceUrl = `/piece/${data[0].name}`
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
  }, [pathname])

  return (
    <Link
      href={buttonUrl}
      className={`textStyle-link1 uppercase text-darkgray hover:text-black transition-colors cursor-pointer`}
    >
      {buttonText}
    </Link>
  )
}
