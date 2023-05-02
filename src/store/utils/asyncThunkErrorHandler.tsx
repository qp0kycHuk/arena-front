import { toast } from "@lib/Toast";

export function asyncThunkErrorHandler(state: any, action: any) {
    console.trace(action);
    if (action.payload.errors) {
        Object.entries(action.payload.errors).forEach(([key, errors]) => {
            toast.error(<>
                <div>{key}</div>
                {(errors as any[]).map(((message) => <div>{message}</div>))}
            </>)
        })
    } else {
        toast.error(action.payload.message)
    }
}