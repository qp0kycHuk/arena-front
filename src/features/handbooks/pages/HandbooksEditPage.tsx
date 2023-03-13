import { PageContent } from "@layouts/PageContent";
import { HandbooksEditPositions } from "../components/HandbooksEdit/HandbooksEditPositions";
import { HandbooksEditTags } from "../components/HandbooksEdit/HandbooksEditTags";
import { useDocumentTitle } from "@hooks/useDocumentTitle";


interface IHandbooksEditPageProps {
}

export function HandbooksEditPage(props: IHandbooksEditPageProps) {
    useDocumentTitle('Справочники')

    return (
        <PageContent className="p-8">
            <div className="text-2xl font-semibold mb-10">Справочники</div>
            <HandbooksEditTags />
            <div className="border-t border-gray border-opacity-20 my-6"></div>
            <HandbooksEditPositions />
        </PageContent>
    );
}