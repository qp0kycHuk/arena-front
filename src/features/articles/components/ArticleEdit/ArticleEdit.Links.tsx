import { Links, useLinks } from "@features/editor";
import {  useArticleEditMainContext } from "./ArticleEdit.Context";


interface IArticleEditLinksProps {
}
export function ArticleEditLinks(props: IArticleEditLinksProps) {
    const { article, update } = useArticleEditMainContext()
    const linksController = useLinks()
    
    return (
        <Links controller={linksController}></Links>
    );
}