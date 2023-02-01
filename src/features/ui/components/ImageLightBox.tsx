import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./Button";
import { CrossIcon } from "@assets/icons/stroke";


interface IImageLightBoxProps extends React.PropsWithChildren {
    src: string
}

export function ImageLightBox({ children, src }: IImageLightBoxProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)}>
                {children}
            </div>
            {isOpen && createPortal((
                <div className="fixed inset-0 bg-black bg-opacity-80 z-40 p-4 flex">
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                    <div className="m-auto max-w-full z-20">
                        <img src={src} alt="" className=" max-h-full max-w-full" />
                    </div>
                    <Button variant="text" icon className="fixed right-1 top-1 z-30" onClick={() => setIsOpen(false)}>
                        <CrossIcon className="text-white" />
                    </Button>
                </div>
            ), document.body)}

        </>
    );
}
