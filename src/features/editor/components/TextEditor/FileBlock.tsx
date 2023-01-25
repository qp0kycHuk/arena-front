import { DocumentIcon } from '@assets/icons/stroke';
import { NodeViewWrapper } from '@tiptap/react';

interface IFileBlockProps { }

export function FileBlock(props: any) {
    return (
        <NodeViewWrapper data-drag-handle>
            <div className={`flex items-center p-4 bg-primary ${props.selected ? 'bg-opacity-20' : 'bg-opacity-10'}  rounded-lg`}>
                <DocumentIcon className="mr-3 text-2xl" />
                <div className="content">{props.node.attrs.name}</div>
            </div>
        </NodeViewWrapper>
    );
}
