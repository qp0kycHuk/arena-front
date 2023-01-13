import { Button } from "@features/ui";
import { toast } from "@lib/Toast";

interface IHomeProps {

}

export function Home(props: IHomeProps) {

    return (<div>
        <h1 className="text-lg">Home page</h1>
        <div className="flex mt-10 gap-3">
            <Button onClick={() => { toast("Default Notification !"); }} variant="whitebg">Toast</Button>
            <Button onClick={() => { toast.success("success Notification !"); }} color="green">success</Button>
            <Button onClick={() => { toast.error("error Notification !"); }} color="red">error</Button>
            <Button onClick={() => { toast.info("info Notification !"); }}>info</Button>
            <Button onClick={() => { toast.warning("warning Notification !"); }} color="yellow">warning</Button>
            <Button onClick={() => {
                const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
                toast.promise(
                    resolveAfter3Sec,
                    {
                        pending: 'Promise is pending',
                        success: 'Promise resolved 👌',
                        error: 'Promise rejected 🤯'
                    }
                )
            }}  variant="whitebg">promise</Button>
        </div>
    </div>);
};