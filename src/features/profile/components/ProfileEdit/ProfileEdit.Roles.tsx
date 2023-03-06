import { Select } from "@features/ui";
import { useUserEditContext } from "./ProfileEdit.Context";
import { useFetchRoles } from "@store/roles/roles.hooks";
import React from "react";

interface IProfileEditRoleProps {
}
export function ProfileEditRoles(props: IProfileEditRoleProps) {
    const { user, update } = useUserEditContext()
    const roles = useFetchRoles()

    // function changeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
    //     const newPosition = roles.entities[event.target.value]

    //     update({
    //         roles: newPosition ? [newPosition] : []
    //     })
    // }

    

    return (
        <label className="block w-full">
            <div className="mb-2 text-sm font-medium">Отчество</div>
            <Select className="w-full"
                value={user.roles?.[0]?.id || 'default'} >
                <option disabled hidden value='default'>Выберите</option>
                {roles.ids.map((id) => (
                    <option key={id} value={id}>{roles.entities[id]?.name}</option>
                ))}
            </Select>
        </label>
    );
}