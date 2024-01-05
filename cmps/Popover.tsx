import { ReactNode, useEffect, useRef } from "react"


interface PopoverProps {
    isOpen: boolean
    children?: ReactNode
}

export function Popover({ isOpen, children }: PopoverProps) {
    return (
        isOpen &&
        <div className='popover-content absolute bottom-6 px-4 py-3 shadow-md rounded-xl bg-light dark:bg-dark'>
            {children}
        </div>
    )
}