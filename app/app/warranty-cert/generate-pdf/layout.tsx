import ReduxProvider from "@/providers/redux-provider";
import { PropsWithChildren } from "react";

const GenerateWarrantyPDFLayout = ({ children }: PropsWithChildren) => {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}

export default GenerateWarrantyPDFLayout