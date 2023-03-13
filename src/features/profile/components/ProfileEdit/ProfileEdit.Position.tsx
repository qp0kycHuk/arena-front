import { Select } from "@features/ui";
import { useUserEditContext } from "./ProfileEdit.Context";
import { useFetchPositions } from "@store/positions/positions.hooks";
import React from "react";

interface IProfileEditPositionProps {
}
export function ProfileEditPosition(props: IProfileEditPositionProps) {
    const { user, update } = useUserEditContext()
    const positions = useFetchPositions()

    function changeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        const newPosition = positions.entities[event.target.value]

        update({
            positions: newPosition ? [newPosition] : []
        })
    }

    return (
        <label className="block w-full">
            <div className="mb-2 text-sm font-medium">Должность</div>
            <Select className="w-full"
                value={user.positions?.[0]?.id || 'default'}
                onChange={changeHandler}>
                <option disabled hidden value='default'>Выберите</option>
                {positions.ids.map((id) => (
                    <option key={id} value={id}>{positions.entities[id]?.name}</option>
                ))}
            </Select>
        </label>
    );
}