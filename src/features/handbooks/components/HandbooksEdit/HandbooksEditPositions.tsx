import { BriefcaseIcon } from "@assets/icons/stroke";
import { HandbooksEdit } from "./HandbooksEdit";
import { useFetchPositions, usePositionControl } from "@store/positions/positions.hooks";
import { EntityId } from "@reduxjs/toolkit";
import { IHandbook } from "@models/Handbook";
import { IUpdateRequest } from "@store/positions/positions.api";

interface IEditHandbook extends IHandbook {
    key?: EntityId
}

interface IHandbooksEditPositionsProps {
}

export function HandbooksEditPositions(props: IHandbooksEditPositionsProps) {
    const positions = useFetchPositions()

    const { upsert: upsertPosition, remove: removePosition } = usePositionControl()

    async function submitHandler(handbooks: Partial<IEditHandbook>[], removedIds: EntityId[]) {
        const updatedPromises = handbooks.map((handbook) => {
            const formData: IUpdateRequest = new FormData()
            formData.append('name', handbook.name as string)

            if (handbook.id) {
                formData.append('id', handbook.id as string)
            }

            return upsertPosition(formData)
        })

        const removePromises = removedIds.map((id) => {
            return removePosition(id)
        })

        return await Promise.all([
            ...updatedPromises,
            ...removePromises
        ])
    }

    return (
        <div>
            <div className="flex items-center mb-7">
                <BriefcaseIcon className="text-2xl text-gray mr-2" />
                <div className="font-semibold">Должности</div>
            </div>
            <HandbooksEdit onSubmit={submitHandler} initialHandbooks={positions.items} />
        </div>
    );
}