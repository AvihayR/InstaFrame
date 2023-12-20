import '../assets/styles/main.scss'
import type { Metadata } from 'next'
import { Header } from '@/cmps/Header'

export const metadata: Metadata = {
  title: 'Instaframe',
  description: 'The platform to share and frame your memories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body className='block md:flex flex-row'>
        <Header />
        <main className="main-page flex flex-col items-center justify-between py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
