import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface PopoverProps {
    isOpen: boolean
    children?: ReactNode
}

export function Popover({ isOpen, children }: PopoverProps) {
    function handleContentClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation()
    }

    return (
        isOpen &&
        <div onClick={handleContentClick} className='popover-content absolute bottom-6 left-0 px-2 py-3 shadow-md rounded-xl bg-light dark:bg-light-dark'>
            {children}
        </div>
    )
}