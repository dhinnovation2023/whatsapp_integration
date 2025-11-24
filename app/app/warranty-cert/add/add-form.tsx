'use client'

import ErrorTemplate from '@/components/ui-elements/error-template';
import InputGroup, { InputGroupDataInterface } from '@/components/ui/input-group';
import { handleCatchBlock } from '@/functions/common';
import DashboardLayout from '@/layouts/dashboard';
import { WarrantyCustomersModelInterface } from '@/models/warranty/customers';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react'

const WarrantyCertAddForm = ({ brands }: {
    brands: {
        name: string,
        id: string,
    }[],

}) => {

    const router = useRouter();

    const [inProgress, setInProgress] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<WarrantyCustomersModelInterface>({
        invoiceNo: '',
        brand: '',
        productName: '',
        customerType: '',
        customerName: '',
        location: '',
        phone: '',
        dateOfSupply: new Date(),
        warrantyPeriod: '',
        currentDate: new Date(),
        villaNo: '',
    });

    const fieldsData: InputGroupDataInterface[] = [
        {
            label: "Invoice No.",
            name: "invoiceNo",
            placeholder: "Enter Invoice No.",
            type: "text",
            required: true,
            value: formData.invoiceNo,
            onChange: handleInputOnchange,
            disabled: inProgress,
        },
        {
            label: "Brand",
            name: "brand",
            placeholder: "Select Brand",
            onChange: handleInputOnchange,
            disabled: inProgress,
            required: true,
            type: "select",
            value: formData.brand,
            options: brands.map(brand => ({ label: brand.name, value: brand.id }))
        },
        {
            label: "Product name",
            name: 'productName',
            onChange: handleInputOnchange,
            placeholder: "Enter Product Name",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.productName,
        },
        {
            label: "Customer Type",
            name: "customerType",
            onChange: handleInputOnchange,
            placeholder: "Select Customer Type",
            disabled: inProgress,
            required: true,
            type: "select",
            value: formData.customerType,
            options: [
                { label: 'Client', value: 'client' },
                { label: 'Contractor', value: 'contractor' },
            ],
        },
        {
            label: "Customer Name",
            name: "customerName",
            onChange: handleInputOnchange,
            placeholder: "Enter Customer Name",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.customerName,
        },
        {
            label: "Phone No.",
            name: "phone",
            onChange: handleInputOnchange,
            placeholder: "Enter Phone",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.phone,
        },
        {
            label: "Location",
            name: "location",
            onChange: handleInputOnchange,
            placeholder: "Enter Location",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.location,
        },
        {
            label: "Villa No.",
            name: "villaNo",
            onChange: handleInputOnchange,
            placeholder: "Enter Villa No.",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.villaNo,
        },
        {
            label: "Date of Supply",
            name: "dateOfSupply",
            onChange: handleInputOnchange,
            placeholder: "Date of Supply",
            disabled: inProgress,
            required: true,
            type: "date",
            value: formData.dateOfSupply instanceof Date ? `${formData.dateOfSupply.getFullYear()}-${(formData.dateOfSupply.getMonth() + 1).toString().padStart(2, '0')}-${formData.dateOfSupply.getDate().toString().padStart(2, '0')}` : undefined,
        },
        {
            label: "Warranty Period",
            name: "warrantyPeriod",
            onChange: handleInputOnchange,
            placeholder: "Enter Warranty Period",
            disabled: inProgress,
            required: true,
            type: "text",
            value: formData.warrantyPeriod,
        },
        {
            label: "Current Date",
            name: "currentDate",
            onChange: handleInputOnchange,
            placeholder: "Current Date",
            disabled: inProgress,
            required: true,
            type: "date",
            value: formData.currentDate instanceof Date ? `${formData.currentDate.getFullYear()}-${(formData.currentDate.getMonth() + 1).toString().padStart(2, '0')}-${formData.currentDate.getDate().toString().padStart(2, '0')}` : undefined,
        },
    ]

    function handleInputOnchange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {

        if (event.target instanceof HTMLInputElement && event.target.type === "date" && event.target.valueAsDate) {
            setFormData(prev => ({
                ...prev,
                [event.target.name]: event.target.type === "date" ? event.target.valueAsDate : new Date(),
            }))
            return;
        }

        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value,
        }))
    }

    async function handleFormSubmit (event: FormEvent) {
        event.preventDefault();
        setError(null);
        setInProgress(true);

        try {
            
            for (const field of fieldsData) {
                if (field.required && !field.value) {
                    throw new Error(`Required field ${field.label} is empty`);
                }
            }

            const requestData: WarrantyCustomersModelInterface = formData;
            await axios.post('/api/warranty/customers/add-one', requestData);

            router.push('/app/warranty-cert');

        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setInProgress(false);
    }

    return (
        <DashboardLayout
            pageTitle='Add New Warranty'
        >
            <div
                className='max-w-[800px] w-full mx-auto py-10 px-3'
            >
                <form
                    className='space-y-3'
                    onSubmit={handleFormSubmit}
                >
                    {fieldsData.map((field, index) => (
                        <InputGroup
                            {...field}
                            key={index}
                        />
                    ))}

                    {
                        error && (
                            <ErrorTemplate
                                error={error}
                            />
                        )
                    }

                    <button
                        className='py-3 px-4 bg-foreground text-background rounded-2xl cursor-pointer'
                    >
                        Add Customer
                    </button>

                </form>
            </div>
        </DashboardLayout>
    )
}

export default WarrantyCertAddForm