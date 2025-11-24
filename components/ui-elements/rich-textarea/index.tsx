'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useState } from 'react';

export default function TiptapEditor({
    value,
    setValue,
    reset,
    disableUseEffect,
    disableEmptyOnClick
}: {
    value: string,
    setValue: (html: string) => void,
    reset: number,
    disableUseEffect?: boolean,
    disableEmptyOnClick?: boolean,
}) {

    const [disableClearing, setDisableClearing] = useState<boolean>(disableEmptyOnClick || false);

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            setValue(editor.getHTML());
        },
        immediatelyRender: false,
    });

    useEffect(() => {

        if (disableUseEffect) {
            return;
        }

        editor?.commands.setContent(value ||'<p>Hello World!</p>');
    }, [reset, editor, disableUseEffect, value])

    return (
        <div className="border border-stroke-light p-4 rounded-2xl bg-background">
            {/* Options */}
            <div
                className='flex items-end gap-3'
            >

                {
                    [
                        {
                            label: "h1",
                            value: "1",
                        },
                        {
                            label: "h2",
                            value: "2",
                        },
                        {
                            label: "h3",
                            value: "3",
                        },
                        {
                            label: "h4",
                            value: "4",
                        },
                        {
                            label: "h5",
                            value: "5",
                        },
                        {
                            label: "h6",
                            value: "6",
                        },
                        {
                            label: "Paragraph",
                            value: "p",
                        },
                    ].map((option, index) => (
                        <button
                            key={index}
                            type='button'
                            className='text-sm py-2 px-3 font-semibold rounded-md bg-background shadow-md cursor-pointer hover:bg-background-2 active:shadow-none active:scale-95'
                            onClick={() => {
                                if (option.value === "p") {
                                    editor?.chain().focus().setParagraph().run();
                                } else {
                                    const headingValue = parseInt(option.value);
                                    if (headingValue > 0 && headingValue <= 6) {
                                        // eslint-disable-next-line
                                        editor?.chain().focus().setHeading({ level: headingValue as any }).run();
                                    }
                                }
                            }}
                        >
                            {option.label}
                        </button>
                    ))
                }

            </div>

            {/* Content */

                editor ?
                    <EditorContent
                        editor={editor}
                        className='outline-none mt-5'
                        onClick={() => {

                            if (disableClearing) {
                                return;
                            }

                            editor?.commands.setContent('');
                            setDisableClearing(true)
                        }}
                    />
                    : <p
                        className='mt-3'
                    >Loading...</p>
            }
        </div>
    );
}