import { fetchAllServiceBrands } from "@/functions/service/brands/fetch-all-brands"
import { getOneServiceCustomer } from "@/functions/service/customers/get-one";
import { notFound } from "next/navigation";
import EditServiceCustomerForm from "./edit-form";

type Props = {
    searchParams: Promise<{
        id: string,
    }>
}

const EditServiceCustomersPage = async ({ searchParams }: Props) => {

    const objectId = (await searchParams).id;

    if (!objectId) {
        notFound();
    }

    const brands = await fetchAllServiceBrands({
        currentPage: 1,
        customLimit: 0,
    })

    const customerData = await getOneServiceCustomer(objectId);

    return (
        <EditServiceCustomerForm
            data={{
                brand: customerData.brand,
                customerName: customerData.customerName,
                customerType: customerData.customerType,
                dateOfService: customerData.dateOfService,
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

export default EditServiceCustomersPage