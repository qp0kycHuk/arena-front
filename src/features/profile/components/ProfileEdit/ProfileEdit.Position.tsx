import { Select } from "@features/ui";
import { useUserEditContext } from "./ProfileEdit.Context";
import { useFetchPositions } from "@store/positions/positions.hooks";

interface IProfileEditPositionProps {
}
export function ProfileEditPosition(props: IProfileEditPositionProps) {
    const { user, update } = useUserEditContext()
    const positions = useFetchPositions()    

    return (
        <label className="block w-full">
            <div className="mb-2 text-sm font-medium">Отчество</div>
            <Select className="w-full"
                onChange={(event) => update({ patronymic: event.target.value })}>
                <option disabled selected hidden>Выберите</option>
                {positions.ids.map((id) => (
                    <option key={id} value={id}>{positions.entities[id]?.name}</option>
                ))}
            </Select>
        </label>
    );
}