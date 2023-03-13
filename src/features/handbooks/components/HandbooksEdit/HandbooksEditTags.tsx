import { HashIcon } from "@assets/icons/stroke";
import { HandbooksEdit } from "./HandbooksEdit";
import { useFetchTags, useTagControl } from "@store/tags/tags.hooks";
import { EntityId } from "@reduxjs/toolkit";
import { IUpdateRequest } from "@store/tags/tags.api";
import { IHandbook } from "@models/Handbook";

interface IEditHandbook extends IHandbook {
    key?: EntityId
}

interface IHandbooksEditTagsProps {
}

export function HandbooksEditTags(props: IHandbooksEditTagsProps) {
    const tags = useFetchTags()
    const { upsert: upsertTag, remove: removeTag } = useTagControl()

    async function submitHandler(handbooks: Partial<IEditHandbook>[], removedIds: EntityId[]) {
        const updatedPromises = handbooks.map((handbook) => {
            const formData: IUpdateRequest = new FormData()
            formData.append('name', handbook.name as string)

            if (handbook.id) {
                formData.append('id', handbook.id as string)
            }

            return upsertTag(formData)
        })

        const removePromises = removedIds.map((id) => {
            return removeTag(id)
        })

        return await Promise.all([
            ...updatedPromises,
            ...removePromises
        ])
    }

    return (
        <div>
            <div className="flex items-center mb-7">
                <HashIcon className="text-2xl text-gray mr-2" />
                <div className="font-semibold">Тэги</div>
            </div>
            <HandbooksEdit onSubmit={submitHandler} initialHandbooks={tags.items} />
        </div>
    );
}