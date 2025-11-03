import React from 'react'

const ListItems = ({ listItems }: {
    listItems: string[],
}) => {
    return (
        <ul
            className='list-disc ml-7'
        >
            {listItems.map((item, index) => (
                <li
                    key={index}
                >{item}</li>
            ))}
        </ul>
    )
}

export default ListItems