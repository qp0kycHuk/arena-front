import { Dialog as DialogComponent, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

export interface IDialogProps extends React.PropsWithChildren {
    isOpen: boolean
    close(): void
}

export function Dialog({ isOpen, close, children }: IDialogProps) {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <DialogComponent as="div" className="relative z-50" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogComponent.Panel className="m-auto">
                                {children}
                            </DialogComponent.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </DialogComponent>
        </Transition>

    )
}
