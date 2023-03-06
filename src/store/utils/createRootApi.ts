import axios from "axios"
import Cookies from "js-cookie"

export function createRootApi() {
    const token = Cookies.get(process.env.REACT_APP_CSRF_COOKIE_NAME as string)
    const api = axios.create({
        withCredentials: true,
        headers: {
            [process.env.REACT_APP_CSRF_HEADER_NAME as string]: token
        }
    })

    return api
}