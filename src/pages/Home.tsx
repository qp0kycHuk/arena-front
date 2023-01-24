import { Button } from "@features/ui";
import { toast } from "@lib/Toast";
import { useGetQuery } from "@store/articles";


interface IHomeProps { }

export function Home(props: IHomeProps) {
    const { data } = useGetQuery(null)

    return (<div>
        <h1 className="text-lg">Home page</h1>
        <div className="flex mt-10 gap-3">
            <pre>
                {JSON.stringify(data || {}, null, 2)}
            </pre>
        </div>
    </div>);
};