import { toast } from "@lib/Toast";

export function thunkErrorHandler(state: any, action: any) {
    toast.error(action.payload.message)
}