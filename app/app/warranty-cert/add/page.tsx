import { getAllWarrantyBrands } from "@/functions/warranty/fetch-all-brands"
import WarrantyCertAddForm from "./add-form"

const AddWarrentyDetails = async () => {

  const brands = await getAllWarrantyBrands({ currentPage: 1, customLimit: 0 })

  return (
    <WarrantyCertAddForm
      brands={brands.map(brand => ({ name: brand.name, id: brand._id.toString() }))}
    />
  )
}

export default AddWarrentyDetails