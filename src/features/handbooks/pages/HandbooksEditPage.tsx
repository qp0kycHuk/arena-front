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
            <div className="mb-10 text-2xl font-semibold">Справочники</div>
            <HandbooksEditTags />
            <div className="my-6 border-t border-gray border-opacity-20"></div>
            <HandbooksEditPositions />
        </PageContent>
    );
}