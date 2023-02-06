import { useGetByIdQuery } from '@store/articles';
import { ArticleViewImage } from './ArticleView.Image';
import { ArticleViewTitle } from './ArticleView.Title';
import { ArticleViewBody } from './ArticleView.Body';
import { ArticleViewDates } from './ArticleView.Dates';
import { ArticleViewButtons } from './ArticleView.Buttons';
import { ArticleViewImages } from './ArticleView.Images';
import { Tag } from '@components/Tag';
import { useFetchArticleById } from '@store/articles/articles.slice';
import { EntityId } from '@reduxjs/toolkit';

interface IArticleViewProps {
    articleId: EntityId
}

export function ArticleView({ articleId }: IArticleViewProps) {
    const article = useFetchArticleById(articleId)

    return (
        <div className="relative flex flex-grow bg-white rounded-2xl dark:bg-opacity-5 dark:text-white" >
            <div className='flex-1 p-8'>
                <div className="flex items-center mb-7">
                    <ArticleViewImage article={article} />
                    <ArticleViewTitle article={article} />
                </div>
                <ArticleViewBody article={article} />
                <ArticleViewImages article={article} />
            </div>
            <div className='min-w-[266px] w-[266px] py-8 px-6 border-l border-gray border-opacity-30'>
                <ArticleViewButtons article={article} />
                <div className="my-8">
                    <ArticleViewDates article={article} />
                </div>
                <div className="flex flex-wrap gap-2">
                    {article?.tags.map((tag) => <Tag key={tag.id}>#{tag.name}</Tag>)}
                </div>
            </div>
        </div>
    );
}
