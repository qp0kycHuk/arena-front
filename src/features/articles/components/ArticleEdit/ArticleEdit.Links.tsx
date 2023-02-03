import { Links } from "@features/editor";
import { useContext } from "react";
import { ArticleEditContext } from "./ArticleEdit.Context";


interface IArticleEditLinksProps {
}
export function ArticleEditLinks(props: IArticleEditLinksProps) {
    const { linksController } = useContext(ArticleEditContext)

    return (
        <Links controller={linksController}></Links>
    );
}