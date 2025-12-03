import { handleCatchBlock } from '@/functions/common';
import { ProductsModelInterface } from '@/models/accounting/products';
import { Fragment, useState } from 'react'
import { RiAddLargeLine, RiCloseLargeLine, RiErrorWarningLine, RiLoader4Line, RiSearchLine } from '@remixicon/react';
import { GetAllProductsRequestData } from '@/functions/accounting/products/get-all-products';
import axios from 'axios';
import ErrorTemplate from '@/components/ui-elements/error-template';
import { QuotationsModelInterface } from '@/models/accounting/quotation';

const ProductsSelectionPopup = ({ onSelect }: {
    onSelect: (product: QuotationsModelInterface["products"]) => void,
}) => {
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchText, setSearchtext] = useState<string>('');

    const [products, setProducts] = useState<ProductsModelInterface[]>([]);

    async function handleSearchSubmit() {
        setInProgress(true);
        setError(null);
        try {

            if (!searchText) {
                throw new Error("Please type somthing...")
            }

            const requestData: GetAllProductsRequestData = {
                currentPage: 1,
                searchText,
            }

            const { data } = await axios.post<ProductsModelInterface[]>('/api/accounting/products/get-all', requestData);
            setProducts(data);
            console.log(data);

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }
        setInProgress(false);
    }

    return (
        <>
            <button
                className='py-2 px-4 bg-foreground text-background rounded-md cursor-pointer'
                onClick={() => setIsOpen(prev => !prev)}
                type='button'
            >Select Product</button>
            {
                isOpen && (
                    <div
                        className='fixed top-0 left-0 z-50 w-full h-full bg-foreground/10 flex items-center justify-center'
                    >
                        <div
                            className='max-w-[500px] w-full min-h-[400px] bg-background rounded-2xl shadow-2xl p-5 space-y-2'
                        >
                            <div
                                className='flex items-center shadow rounded-2xl overflow-hidden pl-5'
                            >
                                <input
                                    type="text"
                                    className='outline-none w-full'
                                    placeholder='Type something to search'
                                    value={searchText}
                                    onChange={(event) => {
                                        setSearchtext(event.target.value);
                                    }}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            handleSearchSubmit();
                                        }
                                    }}
                                />
                                <button
                                    className='shrink-0 max-w-[50px] min-h-[50px] w-full bg-foreground text-background flex items-center justify-center cursor-pointer'
                                    onClick={handleSearchSubmit}
                                    type='button'
                                >
                                    {
                                        inProgress ? (
                                            <RiLoader4Line
                                                size={20}
                                                className='animate-spin'
                                            />
                                        ) : (
                                            <RiSearchLine
                                                size={20}
                                            />
                                        )
                                    }
                                </button>
                                <button
                                    className='shrink-0 max-w-[50px] min-h-[50px] w-full flex items-center justify-center cursor-pointer bg-foreground/10'
                                    type='button'
                                    onClick={() => setIsOpen(prev => !prev)}
                                >
                                    <RiCloseLargeLine
                                        size={20}
                                    />
                                </button>
                            </div>

                            {
                                error && (
                                    <ErrorTemplate
                                        error={error}
                                    />
                                )
                            }

                            {
                                products.length === 0 && (
                                    <div
                                        className='w-full py-10 px-4 flex items-center text-center justify-center gap-3 opacity-60'
                                    >
                                        <RiErrorWarningLine
                                            size={20}
                                        />
                                        <p>No Products Found</p>
                                    </div>
                                )
                            }

                            {
                                products.map((product, index) => (
                                    <Fragment
                                        key={index}
                                    >
                                        {
                                            index !== 0 && (
                                                <hr
                                                    className={`border-foreground/30`}
                                                />
                                            )
                                        }
                                        <div
                                            className='flex items-center w-full justify-between py-2 px-3 hover:bg-background-2/50'
                                        >
                                            <div>
                                                <p><strong>Name:</strong> {product.name}</p>
                                                <p><strong>Price:</strong> {product.price}</p>
                                            </div>
                                            <button
                                                className='shrink-0 max-w-[50px] w-full min-h-[50px] rounded-md bg-foreground text-white flex justify-center items-center cursor-pointer'
                                                type='button'
                                                onClick={() => {
                                                    if (!product._id) {
                                                        return;
                                                    }

                                                    const data: QuotationsModelInterface["products"] = [
                                                        {
                                                            price: product.price,
                                                            productId: product._id,
                                                            qty: 1,
                                                            tax: true,
                                                        }
                                                    ]

                                                    onSelect(data);
                                                }}
                                            >
                                                <RiAddLargeLine
                                                    size={20}
                                                />
                                            </button>
                                        </div>
                                    </Fragment>
                                ))
                            }

                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductsSelectionPopup