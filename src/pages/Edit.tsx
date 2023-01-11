import * as React from 'react';
import { PageContainer } from '@layouts/PageContainer';
import { Editor, useEditor } from '@features/editor';
import { testContent } from '@features/editor/data';

export interface IEditProps {
}

export function Edit(props: IEditProps) {
    const editor = useEditor({
        content: testContent,
    })

    return (
        <PageContainer>
            <div className="rounded-2xl bg-white dark:bg-opacity-5 dark:text-white p-8 flex-grow relative">
                <Editor editor={editor} />
            </div>
        </PageContainer>
    );
}