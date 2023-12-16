import localFont from 'next/font/local'
import Image from 'next/image'
export const instaFont = localFont({ src: '../assets/fonts/insta.ttf' })
import HeartIcon from './icons/HeartIcon'
import { NavBar } from './NavBar'


export function Header() {
    return (
        <header className='app-header flex px-2 py-4 border-b justify-center xs:px-4 md:border-b-0 md:border-r'>
            <NavBar />
            <div className="search-container flex items-center gap-5 md:hidden">
                <HeartIcon className='' />
                <input type="text" className='search flex grow rounded-md px-2' placeholder='Search..' />
            </div>
            <div className="logo-container hidden grow justify-end xs:flex md:hidden">
                <h1 className={`logo text-2xl ${instaFont.className} `}>
                    InstaFrame
                </h1>
            </div>
        </header>
    )
}