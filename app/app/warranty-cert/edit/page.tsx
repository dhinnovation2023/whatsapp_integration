import { getAllWarrantyBrands } from "@/functions/warranty/fetch-all-brands"
import EditWarrantyForm from "./edit-warranty-cert-form";
import { notFound } from "next/navigation";
import { getOneWarrantyCustomerData } from "@/functions/warranty/customers/get-one";

type Props = {
    searchParams: Promise<{
        id?: string,
    }>
}

const EditWarrantyCertPage = async ({ searchParams }: Props) => {

    const objectId = (await searchParams).id;

    if (!objectId) {
        notFound();
    }

    const customerData = await getOneWarrantyCustomerData(objectId);
    const brands = await getAllWarrantyBrands({ currentPage: 1, customLimit: 0 })

    return (
        <EditWarrantyForm
            brands={brands.map(brand => ({ name: brand.name, id: brand._id.toString() }))}
            data={{
                brand: customerData.brand,
                currentDate: customerData.currentDate,
                customerName: customerData.customerName,
                customerType: customerData.customerType,
                dateOfSupply: customerData.dateOfSupply,
                invoiceNo: customerData.invoiceNo,
                location: customerData.location,
                phone: customerData.phone,
                productName: customerData.productName,
                villaNo: customerData.villaNo,
                warrantyPeriod: customerData.warrantyPeriod,
            }}
        />
    )
}

export default EditWarrantyCertPage