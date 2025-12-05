'use client';

import { QuotationsModelInterface } from '@/models/accounting/quotation'
import { RiErrorWarningLine } from '@remixicon/react'
import React, { ChangeEvent, Dispatch, Fragment, SetStateAction, useEffect } from 'react'

const NotesFields = ({ formData, setFormData }: {
    formData: QuotationsModelInterface,
    setFormData: Dispatch<SetStateAction<QuotationsModelInterface>>,
}) => {

    function addOneNewNote() {
        setFormData(prev => ({
            ...formData,
            note: prev.note ? [...prev.note, { heading: '', content: '' }] : [{ heading: '', content: '' }]
        }))
    }

    function removeOneNote(index: number) {
        setFormData(prev => {
            if (!prev.note) {
                return prev;
            }

            const update = prev.note.filter((_, idx) => idx !== index);
            return ({
                ...prev,
                note: update,
            })
        })
    }

    useEffect(() => console.log(formData), [])

    function inputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) {
        setFormData(prev => {

            if (!prev.note) {
                return prev;
            }

            const update = prev.note.map((note, idx) => {
                if (idx === index) {
                    return ({
                        ...note,
                        [event.target.name]: event.target.value,
                    });
                } else {
                    return note;
                }
            })

            return ({
                ...prev,
                note: update,
            })
        })
    }

    return (
        <div
            className='space-y-5'
        >
            {formData.note ? formData.note.length > 0 ? formData.note.map((note, index) => (
                <Fragment>
                    {
                        index !== 0 && (
                            <hr
                                className='border-stroke-light'
                            />
                        )
                    }
                    <div
                        className="space-y-2"
                        key={index}
                    >
                        <input
                            type="text"
                            placeholder="Heading"
                            className='w-full bg-white py-2 px-3 rounded-xl border border-stroke-light'
                            value={note.heading}
                            name='heading'
                            onChange={(event) => inputChange(event, index)}
                        />
                        <textarea
                            placeholder="Content"
                            className='w-full bg-white py-2 px-3 rounded-xl border border-stroke-light'
                            rows={4}
                            name='content'
                            onChange={(event) => inputChange(event, index)}
                            value={note.content}
                        ></textarea>

                        <button
                            className='bg-red-600/10 text-red-600 py-2 px-3 rounded-2xl cursor-pointer'
                            type='button'
                            onClick={() => removeOneNote(index)}
                        >
                            Remove
                        </button>
                    </div>
                </Fragment>
            )) : (
                <div
                    className='flex items-center gap-2 py-3 px-5 bg-background rounded-2xl'
                >
                    <RiErrorWarningLine
                        size={20}
                    />
                    <p>Notes is empty</p>

                    <button
                        className='font-semibold cursor-pointer'
                        type='button'
                        onClick={addOneNewNote}
                    >
                        Add Notes
                    </button>
                </div>
            ) : null}

            <div
                className='flex justify-end w-full'
            >
                <button
                    className='font-semibold cursor-pointer'
                    onClick={addOneNewNote}
                    type='button'
                >Add Note</button>
            </div>
        </div>
    )
}

export default NotesFields