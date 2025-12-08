'use client';

import { RiErrorWarningFill, RiLoader4Line } from '@remixicon/react';
import { ReactNode } from 'react'

const TableTemplate = ({
    dataRows,
    headerRow,
    inProgress,
}: {
    headerRow: string[],
    dataRows: (string | ReactNode)[][], // [ [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], ]
    inProgress: boolean,
}) => {
    return (
        <table
            className='w-full text-left bg-background rounded-2xl'
        >
            <thead
                className='hidden md:table-header-group'
            >
                <tr>
                    {headerRow.map((data, index) => (
                        <th
                            key={index}
                            className='py-4 px-6 min-w-max'
                        >
                            {data}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    !inProgress ? dataRows.map((row, index) => (
                        <tr
                            key={index}
                            className='hover:bg-background-2/50 odd:bg-background-2/50 flex flex-col md:table-row'
                        >
                            {
                                row.map((ElementItem, index) => {
                                    return (
                                        <td
                                            key={index}
                                            className='py-4 px-6 line'
                                        >
                                            {
                                                typeof ElementItem === "string" ? (
                                                    <p
                                                        className='line-clamp-1'
                                                        title={ElementItem?.toString()}
                                                    ><strong
                                                        className='inline md:hidden'
                                                    >{headerRow[index]}: </strong>{ElementItem}</p>
                                                ) : (
                                                    ElementItem
                                                )
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )) : (
                        <tr>
                            <td>
                                <div
                                    className='flex items-center gap-2 py-3 px-5'
                                >
                                    <RiLoader4Line
                                        size={20}
                                        className='animate-spin'
                                    />
                                    <p>Loading...</p>
                                </div>
                            </td>
                        </tr>
                    )
                }
                {dataRows.length === 0 && !inProgress ? (
                    <tr>
                        <td>
                            <div
                                className='flex items-center gap-2 py-3 px-5 text-red-600'
                            >
                                <RiErrorWarningFill
                                    size={20}
                                />
                                <p>Not found.</p>
                            </div>
                        </td>
                    </tr>
                ) : null}
            </tbody>
        </table>
    )
}

export default TableTemplate