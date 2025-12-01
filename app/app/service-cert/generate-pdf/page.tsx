import { fetchOneServiceBrand } from "@/functions/service/brands/fetch-one-brand";
import { getOneServiceCustomer } from "@/functions/service/customers/get-one"
import DashboardLayout from "@/layouts/dashboard";
import { notFound } from "next/navigation";
import ServiceCustomerPDF from "./pdf";

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

    const customerData = await getOneServiceCustomer(objectId);

    if (!customerData.brand) {
        notFound();
    }

    const brandData = await fetchOneServiceBrand(customerData.brand)
    console.log("brandData: ", brandData);

    return (
        <DashboardLayout
            pageTitle="Service Customers PDF"
            hidePageHeader
        >
            <ServiceCustomerPDF
                customerData={{
                    _id: `${customerData._id}`,
                    customerName: customerData.customerName,
                    customerType: customerData.customerType,
                    dateOfService: customerData.dateOfService instanceof Date ? customerData.dateOfService.getTime() : customerData.dateOfService,
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