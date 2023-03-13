import { BriefcaseIcon } from "@assets/icons/stroke";
import { HandbooksEdit } from "./HandbooksEdit";
import { useFetchPositions } from "@store/positions/positions.hooks";


interface IHandbooksEditPositionsProps {
}

export function HandbooksEditPositions(props: IHandbooksEditPositionsProps) {
    const positions = useFetchPositions()


    return (
        <div>
            <div className="flex items-center mb-7">
                <BriefcaseIcon className="text-2xl text-gray mr-2" />
                <div className="font-semibold">Должности</div>
            </div>
            <HandbooksEdit initialHandbooks={positions.items} />
        </div>
    );
}