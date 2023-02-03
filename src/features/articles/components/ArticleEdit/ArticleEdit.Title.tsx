import { useContext } from "react";
import { ArticleEditContext, useArticleEditMainContext } from "./ArticleEdit.Context";

interface IArticleEditTitleProps { }

export function ArticleEditTitle(props: IArticleEditTitleProps) {
    const { article } = useArticleEditMainContext()
    const { titleRef } = useContext(ArticleEditContext)

    return (
        <div ref={titleRef} className='mb-8 text-3xl width-placeholder'
            contentEditable data-placeholder='Введите название статьи'
            dangerouslySetInnerHTML={{ __html: article?.name || '' }}
            onInput={() => {
                if (titleRef?.current) {
                    titleRef.current.innerHTML = titleRef.current.textContent || ''
                    const selection = window.getSelection();
                    const range = document.createRange();
                    selection?.removeAllRanges();
                    range.selectNodeContents(titleRef.current);
                    range.collapse(false);
                    selection?.addRange(range);
                    titleRef.current.focus();
                }
            }} ></div>
    );
}