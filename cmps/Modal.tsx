import { ReactNode } from "react"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}


export function Modal({ isOpen, onClose, children }: ModalProps) {
    function handleContentClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation()
    }

    if (!isOpen) return null
    return (
        <div onClick={onClose} className="modal-overlay">
            <article onClick={handleContentClick} className={`modal-content`}>
                {children}
            </article>
        </div>
    )
}