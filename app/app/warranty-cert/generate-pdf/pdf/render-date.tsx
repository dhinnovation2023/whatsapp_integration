import React from 'react'

const RenderDateInPDF = ({
    date,
}: {
    date: Date | number,
}) => {

    if (date instanceof Date) {
        return (
            `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
        )
    }

    const convertedDate = new Date(date);

    return (
        `${convertedDate.getDate().toString().padStart(2, '0')}/${(convertedDate.getMonth() + 1).toString().padStart(2, '0')}/${convertedDate.getFullYear()}`
    )
}

export default RenderDateInPDF