import { useState } from 'react'
import { handleCatchBlock } from '@/functions/common';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { TranslateLanguageApiRequestDataInterface } from '@/app/api/translate/route';
import axios from 'axios';
import LinkifyText from '@/components/ui-elements/linkify-text';

const TranslatableText = ({ text, hideTranslatable }: {
    text: string,
    hideTranslatable?: boolean,
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
            >
                <LinkifyText
                    text={output || text}
                />
            </p>

            {/* translate option */
                !hideTranslatable && (
                    <div
                        className='w-full flex justify-end'
                    >

                        <button
                            className='text-blue-900 cursor-pointer text-xs mt-2'
                            onClick={translateMessage}
                            title='Translate'
                        >
                            {
                                isLoading ? (
                                    <p>Translating...</p>
                                ) : output ? (
                                    <p>Show origin</p>
                                ) : (
                                    <p>Translate</p>
                                )
                            }
                        </button>
                    </div>
                )
            }


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