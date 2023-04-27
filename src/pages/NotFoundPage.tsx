import { Button } from "@features/ui";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { PageContent } from "@layouts/PageContent";

interface IHomeProps { }

export function NotFoundPage(props: IHomeProps) {
    useDocumentTitle('Страница не найдена')


    return (
        <PageContent className='p-8'>
            <div className="text-3xl font-semibold">Страница не найдена</div>
            <Button className="mt-6">На главную</Button>
        </PageContent>
    );
};