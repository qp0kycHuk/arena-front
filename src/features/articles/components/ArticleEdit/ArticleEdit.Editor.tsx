import { Editor, EditorControl, useEditor, useInitialContent } from "@features/editor";
import { getErrorMessage } from "@hooks/useErrorMessage";
import { toast } from "@lib/Toast";
import { IArticle } from "@models/Article";
import { IFile } from "@models/File";
import { ICreateRequest, useArticleControl } from "@store/articles";
import { articlesApi } from "@store/articles/articles.api";
import { IUploadRequest, useRemoveMutation, useUploadMutation } from "@store/files";
import { useAppDispatch } from "@store/index";
import { docExtention, imageExtention } from "@utils/const/extentions";
import { filterFiles } from "@utils/index";
import { useCallback, useContext, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Editor as EditorType } from '@tiptap/react';
import React from "react";
import { ArticleEditContext, useArticleEditEditorContext, useArticleEditUtilsContext } from "./ArticleEdit.Context";

// TODO try remove duplicate with ArticleEditImages component

interface IArticleEditEditorProps { }

export type ArticleEditEditorRef = React.ForwardedRef<EditorType | null>

export function ArticleEditEditor({ }: IArticleEditEditorProps) {
    const { editor, filePasteHandler } = useArticleEditEditorContext()

    return (
        <div>
            <EditorControl editor={editor} className='sticky z-10 -ml-4 -mr-4 top-2' />
            <Editor
                onPaste={filePasteHandler}
                editor={editor} className='min-h-[260px] flex flex-col' />
        </div>
    );
}
