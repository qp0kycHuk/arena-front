import * as React from 'react';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserQuery } from '@store/auth';
import { ICreateRequest, IUpdateRequest, useArticleControl, useGetByIdQuery } from '@store/articles';
import { Editor, EditorControl, useEditor, useInitialContent, Links, useLinks } from '@features/editor';
import { Button } from '@features/ui';
import { Spiner } from '@components/Spiner';
import { IArticle } from '@models/Article';
import { toast } from '@lib/Toast';
import { getErrorMessage } from '@hooks/useErrorMessage';
import { ArticleEditImages } from './ArticleEdit.Images';
import { ArticleEditAnons } from './ArticleEdit.Anons';
import { ArticleEditTags } from './ArticleEdit.Tags';
import { EntityId } from '@reduxjs/toolkit';
import { filterFiles } from '@utils/index';
import { docExtention, imageExtention } from '@utils/const/extentions';
import { ArticleEditEditor } from './ArticleEdit.Editor';
import type { Editor as EditorType } from '@tiptap/react';
import { ArticleEditContext, ArticleEditContextProvider, ArticleEditMainContext, useArticleEditMainContext } from './ArticleEdit.Context';
import { useContext } from 'react';
import { ArticleEditTitle } from './ArticleEdit.Title';
import { ArticleEditLinks } from './ArticleEdit.Links';

interface IArticleEditProps {
    articleId?: string | number
}

// TODO links, editor images, editor files

export function ArticleEdit({ articleId }: IArticleEditProps) {
    const { submitHandler } = useContext(ArticleEditContext)
    const { loading } = useArticleEditMainContext()

    return (

        <form className="" onSubmit={submitHandler}>
            <div className="text-[26px] font-semibold mb-7">Новая статья</div>
            <div className="border border-gray border-opacity-30 rounded-2xl">
                <div className="px-8 py-6">
                    <ArticleEditTitle />
                    <ArticleEditEditor />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditAnons />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditImages />
                </div>
                {/* <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <Uploader uploader={videoUploader} >
                        <div className="font-semibold">Видео</div>
                    </Uploader>
                </div> */}
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditLinks />
                </div>
                <div className="border-t border-gray border-opacity-30"></div>
                <div className="px-8 py-6">
                    <ArticleEditTags />
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <Button type='submit' disabled={loading}>{loading ? <Spiner /> : 'Сохранить'}</Button>
                <Button variant='light'>Отмена</Button>
            </div>
        </form>

    );
}


