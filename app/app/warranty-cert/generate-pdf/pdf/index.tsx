'use client';

import { WarrantyPDFInitialStateInterface } from "@/store/features/warranty-pdf-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveCustomerData } from "@/store/features/warranty-pdf-slice"

const index = ({ customerData }: {
    customerData: WarrantyPDFInitialStateInterface
}) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(saveCustomerData(customerData));
    }, [])

    return (
        <div>
            tEST CONTENT
        </div>
    )
}

export default index