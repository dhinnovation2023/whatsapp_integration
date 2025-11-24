import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface WarrantyPDFInitialStateInterface {
    data?: {
        // customers
        _id: string,
        invoiceNo: string,
        productName: string,
        customerType: string,
        customerName: string,
        phone: string,
        location: string,
        dateOfSupply: Date | number,
        warrantyPeriod: string,
        currentDate: Date | number,
        villaNo: string,

        // brand
        brandName: string,
        brandContent: string,
    }
}

const WarrantyPDFInitailState: WarrantyPDFInitialStateInterface = {}

const counterSlice = createSlice({
    name: "warrantty-pdf",
    initialState: WarrantyPDFInitailState,
    reducers: {
        saveCustomerData: (state, action: PayloadAction<WarrantyPDFInitialStateInterface>) => {
            state.data = action.payload.data;
        },
    },
});

export const { saveCustomerData } = counterSlice.actions;
export default counterSlice.reducer;
