import * as React from 'react';
import { Editor } from '@tiptap/react';
import { MenuButton } from './MenuButton';
import { useCallback } from 'react';

export interface IMenuBarProps {
    editor: Editor
}

export function MenuBar({ editor }: IMenuBarProps) {
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])

    function tabShift() {

    }


    return (
        <div className='flex items-center gap-1 flex-wrap mb-5'>
            <MenuButton
                onClick={() => editor.chain().focus().shiftTab().run()}>
                shiftTab &lt;-
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().addTab().run()}>
                addTab -&gt;
            </MenuButton>
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
                isActive={editor.isActive('bold')}
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}>
                B
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('italic')}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}>
                <div className="italic">I</div>
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('underline')}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}>
                <div className="underline">U</div>
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('strike')}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}>
                <div className="line-through">S</div>
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('link')}
                onClick={setLink}>
                Link
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('codeBlock')}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
                &lt;/&gt;
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('bulletList')}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                disabled={!editor.can().chain().focus().toggleBulletList().run()}>
                BulletList
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('orderedList')}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                disabled={!editor.can().chain().focus().toggleOrderedList().run()}>
                OrderedList
            </MenuButton>
            <MenuButton
                isActive={editor.isActive({ textAlign: 'left' })}
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                disabled={!editor.can().chain().focus().setTextAlign('left').run()}>
                Left
            </MenuButton>
            <MenuButton
                isActive={editor.isActive({ textAlign: 'center' })}
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                disabled={!editor.can().chain().focus().setTextAlign('center').run()}>
                Center
            </MenuButton>
            <MenuButton
                isActive={editor.isActive({ textAlign: 'right' })}
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                disabled={!editor.can().chain().focus().setTextAlign('right').run()}>
                Right
            </MenuButton>
            <MenuButton
                isActive={editor.isActive('blockquote')}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}>
                ©
            </MenuButton>
            <label>
                <input
                    type="color"
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                /> color
            </label>
            <label>
                <input
                    type="color"
                    onInput={(event: React.ChangeEvent<HTMLInputElement>) => editor.chain().focus().setHighlight({ color: event.target.value }).run()}
                    value={editor.getAttributes('textStyle').highlight}
                /> highlight
            </label>
        </div>
    );
}
