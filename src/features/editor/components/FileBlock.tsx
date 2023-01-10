import { DocumentIcon } from '@assets/icons/stroke';
import { NodeViewWrapper } from '@tiptap/react';
import * as React from 'react';

export interface IFileBlockProps {
}

export function FileBlock(props: any) {
    return (
        <NodeViewWrapper data-drag-handle>
            <div className={`flex items-center p-4 bg-primary ${props.selected ? 'bg-opacity-20' : 'bg-opacity-10'}  rounded-lg`}>
                <DocumentIcon className="text-2xl mr-3" />
                <div className="content">{props.node.attrs.name}</div>
            </div>
        </NodeViewWrapper>
    );
}
