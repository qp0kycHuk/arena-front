import { BookmarkIcon, PencilIcon } from '@assets/icons/stroke';
import { Button } from '@features/ui';
import { IArticle } from '@models/Article';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IArticleViewButtonsProps {
    article?: IArticle
    isLoading?: boolean
}

export function ArticleViewButtons({ article, isLoading }: IArticleViewButtonsProps) {

    if (!article || isLoading) {
        return (
            <div className="flex gap-4">
                <Button variant='contur' color='gray' disabled>
                    <PencilIcon className="text-2xl" />
                </Button>
                <Button variant='contur' color='gray' disabled>
                    <BookmarkIcon className="text-2xl" />
                </Button>
            </div>
        )
    }

    return (
        <div className="flex gap-4">
            <Link to={"/articles/edit/" + article?.id}>
                <Button variant='contur' color='gray'>
                    <PencilIcon className="text-2xl" />
                </Button>
            </Link>
            <Button variant='contur' color='gray'>
                <BookmarkIcon className="text-2xl" />
            </Button>
        </div>
    );
}
