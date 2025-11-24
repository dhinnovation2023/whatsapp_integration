import { configureStore } from "@reduxjs/toolkit";
import WarrantyPdfSlice from "@/store/features/warranty-pdf-slice"

export const store = configureStore({
    reducer: {
        warrantyPdf: WarrantyPdfSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
