import DashboardLayout from "@/layouts/dashboard";
import { notFound } from "next/navigation";
import CompletionCertCustomerPDF from "./pdf";
import { getOneCompletionCertCustomer } from "@/functions/completion-cert/customers/get-one";
import { getOneCompletionCertBrand } from "@/functions/completion-cert/brands/get-one";

type Props = {
    searchParams: Promise<{
        customerId?: string,
    }>
}

const GeneratePDFPage = async ({ searchParams }: Props) => {

    const objectId = (await searchParams).customerId;

    if (!objectId) {
        notFound();
    }

    const customerData = await getOneCompletionCertCustomer(objectId);

    if (!customerData.brand) {
        notFound();
    }

    const brandData = await getOneCompletionCertBrand(customerData.brand)

    return (
        <DashboardLayout
            pageTitle="Service Customers PDF"
            hidePageHeader
        >
            <CompletionCertCustomerPDF
                customerData={{
                    _id: `${customerData._id}`,
                    customerName: customerData.customerName,
                    customerType: customerData.customerType,
                    dateOfCompletion: customerData.dateOfCompletion instanceof Date ? customerData.dateOfCompletion.getTime() : customerData.dateOfCompletion,
                    invoiceNo: customerData.invoiceNo,
                    location: customerData.location,
                    phone: customerData.phone,
                    productName: customerData.productName,
                    villaNo: customerData.villaNo,
                    nthService: customerData.nthService,
                    uploads: customerData.uploads,
                    createdAt: customerData.createdAt,

                    // Brand data
                    brandName: brandData.name,
                    brandContent: brandData.content,
                }}
            />
        </DashboardLayout>
    )
}

export default GeneratePDFPage