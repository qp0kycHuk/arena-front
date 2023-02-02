import React, { useRef, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { useCreateTagMutation, useGetTagsQuery, ICreateRequest } from '@store/tag';
import { Tag } from '@components/Tag';
import { Button, getUnputClassNames } from '@features/ui';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { toast } from '@lib/Toast';
import { Combobox, Transition } from '@headlessui/react'
import { CrossIcon, HashIcon } from '@assets/icons/stroke';
import { ITag } from '@models/Tag';

interface IArticleEditTagsProps {
    onStartTransition?(): void
    onEndTransition?(): void
    addedTags: EntityId[],
    setAddedTags: React.Dispatch<React.SetStateAction<EntityId[]>>
}

export function ArticleEditTags({
    onStartTransition,
    onEndTransition,
    addedTags,
    setAddedTags,
}: IArticleEditTagsProps
) {
    const { data: tags } = useGetTagsQuery(null)
    const [create] = useCreateTagMutation()
    const [name, setName] = useState<string>('')
    const [isOpen, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    // filter tags ids for combobox
    const tagsWithoutAddedIds = tags?.ids.filter((id) => !addedTags?.includes(id))
    const tagsFilteredByName = tagsWithoutAddedIds?.filter((id) => {
        return tags?.entities[id]?.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    })

    function addTag(id?: EntityId) {
        if (!id || addedTags?.includes(id)) return
        setAddedTags((prev) => [...(prev || []), id])
        setOpen(false)
        setName('')
    }

    function removeTag(id?: EntityId) {
        if (!id) return
        setAddedTags((prev) => prev?.filter((itemId) => itemId !== id))
    }

    async function addTagRequest(id?: EntityId) {
        if (id) return addTag(id)
        if (name.trim().length === 0) return inputRef.current?.focus()


        const existingTag = Object.values(tags?.entities || {})
            .find((tag) => tag?.name.toLowerCase().trim() === name?.toLowerCase().trim())

        if (existingTag) return addTag(existingTag.id)

        const formData: ICreateRequest = new FormData()
        formData.append('name', name.trim())

        onStartTransition?.()
        const result = await create(formData)
        onEndTransition?.()
        const errorMessage = getErrorMessage((result as IResultWithError)?.error)

        if (errorMessage) {
            toast.error(errorMessage)
            return
        }
        const newTag = (result as IResultWithData<ITag>).data
        addTag(newTag.id)
    }

    return (
        <div className="flex items-center">
            <HashIcon className="text-2xl mr-1 text-gray" />
            <div className="relative mr-1">
                {/* TODO move Combobox to @features/ui  */}
                <Combobox value={name} onChange={(id) => addTag(id)}>
                    <div className="relative">
                        <Combobox.Input
                            ref={inputRef}
                            className={getUnputClassNames({ borderless: true, className: 'w-36' })}
                            placeholder='Напишите тэг...'
                            displayValue={() => name}
                            onChange={(event) => {
                                setName(event.target.value)
                                setOpen(true)
                            }}
                            onFocus={() => setOpen(true)}
                            onBlur={() => setOpen(false)}
                        />

                        <Transition
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            show={name.length >= 3 && isOpen && !!tagsFilteredByName?.length}
                        >
                            <Combobox.Options className="absolute ml-1 max-h-60 left-full top-1/2 -translate-y-1/2 w-full overflow-auto rounded-md bg-white py-1 shadow-md focus:outline-none z-10">
                                {tagsFilteredByName?.map((id) => (
                                    <Combobox.Option
                                        key={id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary text-white' : ''}`
                                        }
                                        value={id} >
                                        {tags?.entities[id]?.name}
                                    </Combobox.Option>
                                ))}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>

            <Button variant='text' onClick={() => addTagRequest()}>Добавить</Button>

            <div className="flex ml-auto gap-2">
                {addedTags?.map((id) => (
                    <Tag key={id} onClick={() => removeTag(id)}>
                        {tags?.entities[id]?.name} <CrossIcon className="ml-2" />
                    </Tag>
                ))}
            </div>
        </div>
    );
}
