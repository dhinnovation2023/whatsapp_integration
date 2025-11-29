import ErrorTemplate from "@/components/ui-elements/error-template";
import { fetchOneServiceBrand } from "@/functions/service/brands/fetch-one-brand";
import DashboardLayout from "@/layouts/dashboard";
import EditServiceBrandPageForm from "./edit-form";

type Props = {
    searchParams: Promise<{
        id?: string,
    }>
}

const ServiceBrandEditPage = async ({ searchParams }: Props) => {

    const objectId = (await searchParams).id;

    if (!objectId) {
        return (
            <DashboardLayout
                pageTitle="Service Brands Error"
            >
                <ErrorTemplate
                    error={"Object id is not valid"}
                />
            </DashboardLayout>
        )
    }

    const brand = await fetchOneServiceBrand(objectId);

    return (
        <EditServiceBrandPageForm
            objectId={objectId}
            content={brand.content}
            name={brand.name}
        />
    )
}

export default ServiceBrandEditPage