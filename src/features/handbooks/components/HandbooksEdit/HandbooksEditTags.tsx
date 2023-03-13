import { HashIcon } from "@assets/icons/stroke";
import { HandbooksEdit } from "./HandbooksEdit";
import { useFetchTags } from "@store/tags/tags.hooks";


interface IHandbooksEditTagsProps {
}

export function HandbooksEditTags(props: IHandbooksEditTagsProps) {
    const tags = useFetchTags()


    return (
        <div>
            <div className="flex items-center mb-7">
                <HashIcon className="text-2xl text-gray mr-2" />
                <div className="font-semibold">Тэги</div>
            </div>
            <HandbooksEdit initialHandbooks={tags.items} />
        </div>
    );
}