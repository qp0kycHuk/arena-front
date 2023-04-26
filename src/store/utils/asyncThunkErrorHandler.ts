import { toast } from "@lib/Toast";

export function asyncThunkErrorHandler(state: any, action: any) {
    console.trace(action);
    
    toast.error(action.payload.message)
}