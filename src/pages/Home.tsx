import { ArticleItem } from "@features/articles";
import { Button } from "@features/ui";
import { toast } from "@lib/Toast";
import { useGetQuery } from "@store/articles";


interface IHomeProps { }

export function Home(props: IHomeProps) {
    const { data: articles } = useGetQuery(null)
    console.log(articles);


    return (<div className="relative flex-grow p-8 bg-white rounded-2xl dark:bg-opacity-5 dark:text-white">
        <h1 className="text-lg">Home page</h1>
        {articles?.map((article) => <ArticleItem article={article} key={article.id} />)}

    </div>);
};