import { BookmarkIcon, ImageIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';
import { IArticle } from '@models/Article';
import * as React from 'react';

interface IArticleItemProps {
    article: IArticle
}

export function ArticleItem({ article }: IArticleItemProps) {
    const imageSrc = article?.image_src ? article.image_src : ''

    return (
        <div className="flex items-center px-4 py-3 -mx-4 rounded-2xl hover:bg-primary hover:bg-opacity-10">
            <div className="w-24 h-[76px] rounded-xl relative overflow-hidden flex bg-gray bg-opacity-10">
                {imageSrc && <img src={imageSrc} alt="" className="absolute object-cover w-full h-full" />}
                {!imageSrc && <ImageIcon className="m-auto text-3xl text-gray" />}
            </div>
            <div className='max-w-5xl ml-4'>
                <div className="mb-2 font-semibold">{article.name}</div>
                <div className="max-w-md text-xs text-gray">{article.excerpt}</div>
            </div>
            <div className="ml-auto text-right whitespace-nowrap">
                <div className="text-xs text-gray">Созд: {new Date(article.created_at).toLocaleDateString()}</div>
                <div className="text-xs text-gray">Ред: {new Date(article.updated_at).toLocaleDateString()}</div>
            </div>
            <Button variant='text' size='small' color='gray' className='px-3 ml-3'>
                <BookmarkIcon className="text-2xl fill-primary text-primary" />
            </Button>
        </div>
    );
}
