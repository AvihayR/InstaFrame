import localFont from 'next/font/local'
export const instaFont = localFont({ src: '../assets/fonts/insta.ttf' })

import HeartIcon from './icons/HeartIcon'
import { NavBar } from './NavBar'


export function Header() {

    return (
        <header className='app-header flex px-3 py-2 border-b justify-center md:border-b-0 md:border-r md:py-5 md:h-screen md:sticky top-0'>
            <NavBar />
            <div className="search-container flex flex-1 items-center gap-5 md:hidden">
                <HeartIcon className='' />
                <input type="text" className='search max-w-xs flex grow rounded-md px-2' placeholder='Search..' />
            </div>
            <div className="logo-container hidden grow justify-end xs:flex md:hidden">
                <h1 className={`logo text-2xl ${instaFont.className} `}>
                    InstaFrame
                </h1>
            </div>
        </header>
    )
}