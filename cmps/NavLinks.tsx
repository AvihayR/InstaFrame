'use client'

import CreateIcon from "./icons/CreateIcon"
import ExploreIcon from "./icons/ExploreIcon"
import HeartIcon from "./icons/HeartIcon"
import HomeIcon from "./icons/HomeIcon"
import SearchIcon from "./icons/SearchIcon"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const links = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Search', href: '', icon: SearchIcon, },
    { name: 'Explore', href: '/explore', icon: ExploreIcon },
    { name: 'Notifications', href: '', icon: HeartIcon },
    { name: 'Create', href: '/create', icon: CreateIcon },
]

export default function NavLinks() {
    const path = usePathname()

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={
                            clsx(
                                "icon-container flex items-end",
                                {
                                    'active': path === link.href
                                },
                            )
                        }
                    >
                        <LinkIcon className="" />
                        <span className="hidden ms-4 lg:block">{link.name}</span>
                    </Link>
                )
            })}
        </>
    )
}