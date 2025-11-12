import { useState } from 'react'
import { RiLoader4Line, RiResetLeftLine, RiTranslate2 } from '@remixicon/react';
import { handleCatchBlock } from '@/functions/common';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { TranslateLanguageApiRequestDataInterface } from '@/app/api/translate/route';
import axios from 'axios';

const TranslatableText = ({ text }: {
    text: string,
}) => {
    const [output, setOutput] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function translateMessage() {

        if (output) {
            setOutput(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {

            const requestData: TranslateLanguageApiRequestDataInterface = {
                text,
                languageCode: "en",
            }

            const { data } = await axios.post<string>('/api/translate', requestData);
            setOutput(data);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setIsLoading(false);
    }

    return (
        <div>
            <p
                className='wrap-break-word'
            >{output || text}</p>

            {/* translate option */}
            <div
                className='w-full flex justify-end'
            >

                <button
                    className='py-2 px-4 rounded-full shadow-md shadow-blue-900/10 bg-blue-900 text-white cursor-pointer'
                    onClick={translateMessage}
                    title='Translate'
                >
                    {
                        isLoading ? (
                            <RiLoader4Line
                                size={15}
                                className='animate-spin'
                            />
                        ) : output ? (
                            <RiResetLeftLine
                                size={15}
                            />
                        ) : (
                            <RiTranslate2
                                size={15}
                            />
                        )
                    }
                </button>
            </div>

            {
                error && (
                    <ErrorTemplate
                        error={error}
                    />
                )
            }
        </div>
    )
}

export default TranslatableText