import { ArticleItem } from "@features/articles";
import { Button } from "@features/ui";
import { toast } from "@lib/Toast";
import { useGetQuery } from "@store/articles";


interface IHomeProps { }

export function Home(props: IHomeProps) {
    const { data: articles } = useGetQuery(null)
    console.log(articles);


    return (<div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white">
        <div className="text-3xl font-semibold">Home page</div>
    </div>);
};