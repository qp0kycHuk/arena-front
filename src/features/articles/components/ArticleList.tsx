import * as React from 'react';
import { ArticleItem } from './ArticleItem';
import { useGetQuery } from '@store/articles';
import { SettingsIcon, FoldersIcon, FileTextIcon } from '@assets/icons/stroke';
import { Button, Menu } from '@features/ui';
import { Link } from 'react-router-dom';

interface IArticleListProps {
}

export function ArticleList(props: IArticleListProps) {
    const { data: articles } = useGetQuery(null)

    return (
        <div>
            <div className="flex items-center mb-8">
                <div className="text-2xl font-semibold">Статьи</div>
                <Button variant='contur' color='gray' className='ml-auto'>
                    <SettingsIcon className="text-2xl" />
                </Button>
                <Menu align='end' menuButton={
                    <Button className='ml-4 px-7'> Добавить </Button>
                }>
                    <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FoldersIcon className="mr-2" /> Папка </Button>
                    <Link to="/articles/create">
                        <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FileTextIcon className="mr-2" /> Статья </Button>
                    </Link>

                </Menu>
            </div>

            {articles?.map((article, index) =>
                <div key={article.id}>
                    {index > 0 && <div className="border-t border-gray border-opacity-20"></div>}
                    <Link to={"/articles/" + article.id}>
                        <ArticleItem article={article} />
                    </Link>
                </div>)}
        </div>

    );
}
