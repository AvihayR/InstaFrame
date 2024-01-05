import { ReactNode, useEffect, useRef } from "react"


interface PopoverProps {
    isOpen: boolean
    children?: ReactNode
}

export function Popover({ isOpen, children }: PopoverProps) {
    return (
        <div className='popover-content absolute bottom-6'>
            {children}
        </div>
    )
}