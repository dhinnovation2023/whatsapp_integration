import ErrorTemplate from '@/components/ui-elements/error-template';
import InputGroup, { InputGroupDataInterface } from '@/components/ui/input-group'
import DashboardLayout from '@/layouts/dashboard'
import AddServiceCustomerPageForm from './add-form';
import { fetchAllServiceBrands } from '@/functions/service/brands/fetch-all-brands';

const AddServiceCustomerPage = async () => {

    const brands = await fetchAllServiceBrands({
        currentPage: 1,
        customLimit: 0,
    })

    return (
        <AddServiceCustomerPageForm
            brands={brands.map((brand) => ({ name: brand.name, id: brand._id.toString() }))}
        />
    )
}

export default AddServiceCustomerPage