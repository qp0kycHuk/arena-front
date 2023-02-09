import { useEffect } from 'react';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { SettingsIcon, FoldersIcon, FileTextIcon } from '@assets/icons/stroke';
import { Button, Menu } from '@features/ui';
import { Link } from 'react-router-dom';
import { Search } from '@components/Search/Search';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchArticles } from '@store/articles/articles.thunk';
import { articlesEntityAdapter } from '@store/articles/articles.adapter';
import {  useFetchArticles } from '@store/articles/articles.hooks';

interface IArticleListProps {
}

export function ArticleList(props: IArticleListProps) {
    const articles = useFetchArticles()

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

            <Search className='mb-4' />

            {articles?.map((article, index) =>
                <div key={article.id}>
                    <Link className='peer' to={"/articles/" + article.id}>
                        <ArticleItem article={article} />
                    </Link>
                    <div className="border-t border-gray border-opacity-20 peer-hover:opacity-0"></div>
                </div>
            )}
        </div>

    );
}
