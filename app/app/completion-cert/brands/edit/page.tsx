import ErrorTemplate from "@/components/ui-elements/error-template";
import DashboardLayout from "@/layouts/dashboard";
import EditCompletionBrandPageForm from "./edit-form";
import { getOneCompletionCertBrand } from "@/functions/completion-cert/brands/get-one";

type Props = {
    searchParams: Promise<{
        id?: string,
    }>
}

const CompletionBrandEditPage = async ({ searchParams }: Props) => {

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

    const brand = await getOneCompletionCertBrand(objectId);

    return (
        <EditCompletionBrandPageForm
            objectId={objectId}
            content={brand.content}
            name={brand.name}
        />
    )
}

export default CompletionBrandEditPage