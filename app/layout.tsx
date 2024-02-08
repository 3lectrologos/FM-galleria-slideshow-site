import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import './globals.css'
import Title from '@/app/Title'

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Galleria slideshow site',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={libreBaskerville.className}>
        <div
          className={`flex flex-col pt-10 items-center justify-start bg-white min-h-dvh min-w-dvw`}
        >
          <div className={`w-full flex-grow flex flex-col items-center`}>
            <Title className={`w-full px-10`} />
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
