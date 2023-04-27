import { Button } from "@features/ui";
import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { PageContent } from "@layouts/PageContent";
import { Link } from "react-router-dom";

interface IHomeProps { }

export function NotFoundPage(props: IHomeProps) {
    useDocumentTitle('Страница не найдена')


    return (
        <PageContent className='p-8'>
            <div className="text-3xl font-semibold">Страница не найдена</div>
            <Link to={'/'}>
                <Button className="mt-6">На главную</Button>
            </Link>
        </PageContent>
    );
};