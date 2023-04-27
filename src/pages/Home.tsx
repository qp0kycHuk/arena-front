import { useDocumentTitle } from "@hooks/useDocumentTitle";
import { PageContent } from "@layouts/PageContent";

interface IHomeProps { }

export function Home(props: IHomeProps) {
    useDocumentTitle('Главная')


    return (<PageContent className='p-8'>
        <div className="text-3xl font-semibold">Home page</div>
    </PageContent>);
};