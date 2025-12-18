import { getAllCompletionCertBrands } from '@/functions/completion-cert/brands/get-all';
import AddCompletionCertCustomerPageForm from './add-form';

const AddCompletionCertCustomerPage = async () => {

    const brands = await getAllCompletionCertBrands({
        currentPage: 1,
        customLimit: 0,
    })

    return (
        <AddCompletionCertCustomerPageForm
            brands={brands.map((brand) => ({ name: brand.name, id: brand._id.toString() }))}
        />
    )
}

export default AddCompletionCertCustomerPage