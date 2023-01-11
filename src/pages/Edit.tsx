import * as React from 'react';
import { PageContainer } from '@layouts/PageContainer';
import { Editor, useEditor, useTitleEditor } from '@features/editor';
import { testContent } from '@features/editor/data';
import { EditorControl } from '@features/editor/components/EditorControl';

export interface IEditProps {
}

const article = {
    title: 'Название статьи',
    content: testContent,
}

export function Edit(props: IEditProps) {
    const editor = useEditor({
        placeholder: 'Напишите статью...',
        config: {
            content: article.content
        }
    })
    const titleEditor = useTitleEditor({
        placeholder: 'Введите название статьи',
        config: {
            content: article.title
        }
    })

    return (
        <PageContainer>
            <div className="rounded-2xl bg-white dark:bg-opacity-5 dark:text-white p-8 flex-grow relative">
                <div className="border border-gray border-opacity-30 rounded-2xl">
                    <div className="px-8 py-6">
                        <Editor className='mb-8' editor={titleEditor} />
                        <EditorControl editor={editor} className='-ml-4 -mr-4 sticky top-2 z-10' />
                        <Editor className='min-h-[260px] flex flex-col' editor={editor} />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}