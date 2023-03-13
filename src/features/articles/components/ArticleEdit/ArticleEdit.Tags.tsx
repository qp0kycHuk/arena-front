import React, { useEffect, useRef, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import { Tag } from '@components/Tag';
import { Button, getUnputClassNames } from '@features/ui';
import { Combobox, Transition } from '@headlessui/react'
import { CrossIcon, HashIcon } from '@assets/icons/stroke';
import { ITag } from '@models/Tag';
import {  useArticleEditMainContext, useArticleEditUtilsContext } from './ArticleEdit.Context';
import { useFetchTags, useTagControl } from '@store/tags/tags.hooks';
import { ICreateRequest } from '@store/tags/tags.api';

interface IArticleEditTagsProps { }

export function ArticleEditTags({ }: IArticleEditTagsProps) {
    const { article, update } = useArticleEditMainContext()
    const { loadingStart, loadingEnd } = useArticleEditUtilsContext()
    const addedIds = article?.tags?.map((tag) => tag.id) || []

    const tags = useFetchTags()
    const { createTag } = useTagControl()
    const [name, setName] = useState<string>('')
    const [isOpen, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null)

    // filter tags ids for combobox
    const tagsWithoutAddedIds = name ? tags?.ids.filter((id) => !addedIds?.includes(id)) : []
    const tagsFilteredByName = tagsWithoutAddedIds?.filter((id) => {
        return tags?.entities[id]?.name.toLowerCase().trim().includes(name.toLowerCase().trim())
    })

    function addTag(tag?: ITag) {
        if (!tag) return
        const isTagAdded = addedIds.includes(tag.id)

        if (!isTagAdded) {
            update({
                tags: [
                    ...(article?.tags || []),
                    tag
                ]
            })
        }

        setOpen(false)
        setName('')
    }

    function removeTag(id?: EntityId) {
        if (!id) return

        update({
            tags: article?.tags?.filter((tag) => tag.id !== id)
        })
    }

    async function addTagRequest(id?: EntityId) {
        if (id) return addTag(tags?.entities[id])
        if (name.trim().length === 0) return inputRef.current?.focus()

        const existingTag = Object.values(tags?.entities || {})
            .find((tag) => tag?.name.toLowerCase().trim() === name?.toLowerCase().trim())

        if (existingTag) {
            return addTag(existingTag)
        }

        const formData: ICreateRequest = new FormData()
        formData.append('name', name.trim())

        loadingStart()
        const createdTag = await createTag(formData)
        loadingEnd()

        addTag(createdTag)
    }

    return (
        <div className="flex items-center">
            <HashIcon className="text-2xl mr-1 text-gray" />
            <div className="relative mr-1">
                {/* TODO move Combobox to @features/ui  */}
                <Combobox value={name} onChange={(id) => addTag(tags?.entities[id])}>
                    <div className="relative">
                        <Combobox.Input
                            ref={inputRef}
                            className={getUnputClassNames({ borderless: true, className: 'w-36' })}
                            placeholder='Напишите тэг...'
                            displayValue={() => name}
                            onKeyUp={(event: React.KeyboardEvent) => {
                                if (event.code === 'Enter') {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    addTagRequest()
                                }
                            }}
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
                                    <Combobox.Option key={id}
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
                {addedIds?.map((id) => (
                    <Tag key={id} onClick={() => removeTag(id)}>
                        {tags?.entities[id]?.name} <CrossIcon className="ml-2" />
                    </Tag>
                ))}
            </div>
        </div>
    );
}
