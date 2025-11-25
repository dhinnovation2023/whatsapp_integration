import { getOneWarrantyCustomerData } from "@/functions/warranty/customers/get-one";
import { fetchOneWarrantyBrand } from "@/functions/warranty/fetch-one-brand";
import DashboardLayout from "@/layouts/dashboard";
import { notFound } from "next/navigation";
import PDFViewerSection from "./pdf";
import ErrorTemplate from "@/components/ui-elements/error-template";

type Props = {
  searchParams: Promise<{
    customerId?: string,
  }>
}

const GenarteWarrantyPDFPage = async ({
  searchParams,
}: Props) => {

  const customerId = (await searchParams).customerId;

  if (!customerId) {
    notFound();
  }

  const customerData = await getOneWarrantyCustomerData(customerId);
  if (!customerData) {
    notFound();
  }

  const brandData = await fetchOneWarrantyBrand(customerData.brand);
  if (!brandData) {
    return (
      <DashboardLayout
        pageTitle="Generate PDF"
      >
        <ErrorTemplate
          error="Brand selected for this warranty has been deleted or not available."
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout
      pageTitle="Generate Warranty PDF"
      hidePageHeader
      fullwidth
    >
      <PDFViewerSection
        customerData={{
          _id: `${customerData._id}`,
          currentDate: customerData.currentDate instanceof Date ? customerData.currentDate.getTime() : customerData.currentDate,
          customerName: customerData.customerName,
          customerType: customerData.customerType,
          dateOfSupply: customerData.dateOfSupply instanceof Date ? customerData.dateOfSupply.getTime() : customerData.dateOfSupply,
          invoiceNo: customerData.invoiceNo,
          location: customerData.location,
          phone: customerData.phone,
          productName: customerData.productName,
          villaNo: customerData.villaNo,
          warrantyPeriod: customerData.warrantyPeriod,

          // Brand data
          brandName: brandData.name,
          brandContent: brandData.content,
        }}
      />
    </DashboardLayout>
  )
}

export default GenarteWarrantyPDFPage