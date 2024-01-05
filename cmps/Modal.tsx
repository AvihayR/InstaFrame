import { ReactNode, useEffect } from "react"
import CloseIcon from "./icons/CloseIcon"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}


export function Modal({ isOpen, onClose, children }: ModalProps) {

    useEffect(() => {
        window.addEventListener('keydown', escKeyPress)

        return () => {
            window.removeEventListener('keydown', escKeyPress)
        }
    }, [])

    function escKeyPress(ev: KeyboardEvent) {
        if (ev.key === "Escape") {
            onClose()
        }
    }

    function handleContentClick(event: React.MouseEvent<HTMLElement>) {
        event.stopPropagation()
    }

    if (!isOpen) return null
    return (
        <div onClick={onClose} className="modal-overlay relative">
            <article onClick={handleContentClick} className={`modal-content`}>
                <CloseIcon className="close-btn" onClick={onClose} />
                {children}
            </article>
        </div>
    )
}