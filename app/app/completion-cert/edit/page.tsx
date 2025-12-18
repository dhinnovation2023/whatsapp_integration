import { notFound } from "next/navigation";
import EditServiceCustomerForm from "./edit-form";
import { getAllCompletionCertBrands } from "@/functions/completion-cert/brands/get-all";
import { getOneCompletionCertCustomer } from "@/functions/completion-cert/customers/get-one";

type Props = {
    searchParams: Promise<{
        id: string,
    }>
}

const EditCompletionCertCustomerPage = async ({ searchParams }: Props) => {

    const objectId = (await searchParams).id;

    if (!objectId) {
        notFound();
    }

    const brands = await getAllCompletionCertBrands({
        currentPage: 1,
        customLimit: 0,
    })

    const customerData = await getOneCompletionCertCustomer(objectId);

    return (
        <EditServiceCustomerForm
            data={{
                brand: customerData.brand,
                customerName: customerData.customerName,
                customerType: customerData.customerType,
                dateOfCompletion: customerData.dateOfCompletion,
                invoiceNo: customerData.invoiceNo,
                location: customerData.location,
                nthService: customerData.nthService,
                phone: customerData.phone,
                productName: customerData.productName,
                uploads: customerData.uploads,
                villaNo: customerData.villaNo,
                _id: customerData._id?.toString(),
            }}
            brands={brands.map((brand) => ({ name: brand.name, id: brand._id.toString() }))}
        />
    )
}

export default EditCompletionCertCustomerPage