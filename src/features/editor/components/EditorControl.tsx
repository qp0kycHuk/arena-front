import * as React from 'react';
import { Editor } from '@tiptap/react';
import { MenuButton } from './MenuButton';
import {
    ArrowRedoIcon,
    ArrowUndoIcon,
    BoldIcon,
    BulletListIcon,
    ItalicIcon,
    OrderedListIcon,
    StrikeThroughIcon,
    UnderlineIcon,
    VideoIcon
} from '@assets/icons/stroke';
import { AlignMenu } from './AlignMenu';
import { EmojiMenu } from './EmojiMenu';
import { ImageMenu } from './ImageMenu';
import { DocumentMenu } from './DocumentMenu';
import { LinkMenu } from './LinkMenu';
import { ColorMenu } from './ColorMenu';
import { HighlightMenu } from './HighlightMenu';

interface IEditorControlProps extends React.HTMLProps<HTMLDivElement> {
    editor: Editor | null
}

export function EditorControl({ editor, className }: IEditorControlProps) {
    console.log(editor);

    if (!editor) {
        return null
    }

    return (
        <div className={`flex items-center gap-1 flex-wrap mb-5 rounded-lg py-2 px-4 bg-gray-100 dark:bg-gray-800 ${className}`}>
            <MenuButton
                title='Полужирный Ctrl+B'
                isActive={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}>
                <BoldIcon className="text-2xl" />
            </MenuButton>
            <MenuButton
                title='Курсивом Ctrl+I'
                isActive={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}>
                <ItalicIcon className="text-2xl" />
            </MenuButton>
            <MenuButton
                title='Подчеркнутый Ctrl+U'
                isActive={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}>
                <UnderlineIcon className="text-2xl" />
            </MenuButton>
            <MenuButton
                title='Перечеркнутый Ctrl+Shift+X'
                isActive={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}>
                <StrikeThroughIcon className="text-2xl" />
            </MenuButton>
            <ColorMenu editor={editor} />
            <HighlightMenu editor={editor} />
            <EmojiMenu editor={editor} />

            <div className="mx-2"></div>

            <AlignMenu editor={editor} />
            <MenuButton
                title='Список с маркерами Ctrl+Shift+8'
                isActive={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}>
                <BulletListIcon className="text-2xl" />
            </MenuButton>
            <MenuButton
                title='Нумерованный список Ctrl+Shift+7'
                isActive={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}>
                <OrderedListIcon className="text-2xl" />
            </MenuButton>

            <div className="mx-2"></div>
            <ImageMenu editor={editor} />
            <LinkMenu editor={editor} />

            <DocumentMenu editor={editor} />
            {/* TODO */}
            <MenuButton title='Видео' disabled>
                <VideoIcon className="text-2xl" />
            </MenuButton>
            <MenuButton
                title='Отменить Ctrl+Z'
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}>
                <ArrowUndoIcon className="text-2xl" />
            </MenuButton>
            <MenuButton
                title='Отменить отмену Ctrl+Shift+Z'
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}>
                <ArrowRedoIcon className="text-2xl" />
            </MenuButton>

            <div className="mx-2"></div>
            <MenuButton
                isActive={editor.isActive('heading', { level: 1 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                h1
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('heading', { level: 2 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                h2
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('heading', { level: 3 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                h3
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('heading', { level: 4 })}
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
                h4
            </MenuButton>
            <MenuButton
                title='Блок с кодом'
                isActive={editor.isActive('codeBlock')}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                &lt;/&gt;
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                ©
            </MenuButton>
        </div>
    );
}
