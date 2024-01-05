import { ReactNode, useEffect, useRef } from "react"


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
        <div onClick={handleContentClick} className='popover-content absolute bottom-6 px-4 py-3 shadow-md rounded-xl bg-light dark:bg-dark'>
            {children}
        </div>
    )
}