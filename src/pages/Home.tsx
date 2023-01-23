import { Button } from "@features/ui";
import { toast } from "@lib/Toast";
import { useUserQuery } from "src/store/auth/auth.api";


interface IHomeProps {

}

export function Home(props: IHomeProps) {
    const { data } = useUserQuery(null)
    return (<div>
        <h1 className="text-lg">Home page</h1>
        <div className="flex mt-10 gap-3">
            {JSON.stringify(data || {})}
        </div>
    </div>);
};