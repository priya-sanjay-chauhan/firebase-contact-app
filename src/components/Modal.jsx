import React from 'react'
import { createPortal } from 'react-dom'
import { IoIosClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
    return createPortal(
        <div>
            {isOpen && (

                <div className='grid place-items-center absolute top-0 z-40 backdrop-blur h-screen w-screen' >
                    <div className='m-auto relative z-50 min-w-[360px] bg-white p-4'>
                        <div className='flex justify-end '>
                            <IoIosClose onClick={onClose} className='cursor-pointer text-xl' />
                        </div>
                        {children}
                    </div>
                </div>
            )}
        </div>,
        document.getElementById("modal-root")
    )
}

export default Modal