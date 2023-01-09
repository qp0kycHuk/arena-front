import * as React from 'react';
import { PageContainer } from '@layouts/PageContainer';
import { Editor } from '@features/editor';

export interface IEditProps {
}

export function Edit(props: IEditProps) {
    return (
        <PageContainer>
            <div className="rounded-2xl bg-white dark:bg-opacity-5 dark:text-white p-8 flex-grow relative">
            <Editor />
            </div>
        </PageContainer>
    );
}