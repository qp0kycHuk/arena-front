import { useEffect } from 'react';
import { ArticleItem, ArticleItemPlacehlder } from '../ArticleItem/ArticleItem';
import { SettingsIcon, FoldersIcon, FileTextIcon } from '@assets/icons/stroke';
import { Button, Menu } from '@features/ui';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from '@components/Search/Search';
import { useAppDispatch, useAppSelector } from '@store/index';
import { fetchArticles } from '@store/articles/articles.thunk';
import { articlesEntityAdapter } from '@store/articles/articles.adapter';
import { useFetchArticles } from '@store/articles/articles.hooks';
import { useDebouncedCallback } from 'use-debounce';
import { getRoute } from '@utils/index';

interface IArticleListProps {
}
const SEARCH_QUERY_NAME = 's'

export function ArticleList(props: IArticleListProps) {
    const { data: articles, loading } = useFetchArticles()
    let [searchParams, setSearchParams] = useSearchParams();

    const searchedArticles = articles.filter((article) => {
        const searchString = searchParams.get(SEARCH_QUERY_NAME)
        if (searchString) {
            return article.name.toLowerCase().includes(searchString.toLowerCase())
        }
        return true
    })

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchParams({ [SEARCH_QUERY_NAME]: event.target.value })

    }
    const debouncedChangeHandler = useDebouncedCallback(changeHandler, 800)

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
                    <Link to={getRoute().articles.create()}>
                        <Button className='justify-start w-full' size='small' color='gray' variant='text'> <FileTextIcon className="mr-2" /> Статья </Button>
                    </Link>

                </Menu>
            </div>

            <Search
                onChange={debouncedChangeHandler}
                initialValue={searchParams.get(SEARCH_QUERY_NAME) || ''}
                className='mb-4' />

            {loading && new Array(10).fill(1).map((_, index) =>
                <div key={index}>
                    <ArticleItemPlacehlder />
                    <div className="border-t border-gray border-opacity-20"></div>
                </div>
            )}
            {searchedArticles?.length <= 0 && !loading && 'Здесь ничего нет'}
            {searchedArticles?.map((article, index) =>
                <div key={article.id}>
                    <Link className='peer' to={getRoute().articles(article.id)}>
                        <ArticleItem article={article} />
                    </Link>
                    <div className="border-t border-gray border-opacity-20 peer-hover:opacity-0"></div>
                </div>
            )}
        </div>

    );
}
