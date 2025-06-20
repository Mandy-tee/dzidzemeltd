import { useState } from 'react';
import useDrivePicker from "react-google-drive-picker";
import { SimpleForm, TextInput, Edit, ReferenceInput, BooleanInput, NumberInput } from 'react-admin';
import EditToolbar from '../common/EditToolbar';

const EditProduct = () => {
    const [fileId, setFileId] = useState("");
    const [openPicker] = useDrivePicker();

    const handleOpenPicker = () => {
        openPicker({
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            developerKey: import.meta.env.VITE_GOOGLE_DRIVE_API_KEY,
            setParentFolder: import.meta.env.VITE_GOOGLE_DRIVE_PARENT_FOLDER,
            viewId: "DOCS_IMAGES",
            callbackFunction: (data) => {
                if (data.action === 'picked') {
                    setFileId(data?.docs[0]?.id);
                }
                console.log(data);
            },
        })
    }

    const transform = data => ({
        name: data.name,
        price: data.price,
        description: data.description,
        category: data.category.id,
        isFeatured: data.isFeatured,
        image: fileId || data.image,
        stock: data.stock,
    });

    return (
        <Edit mutationMode="pessimistic" transform={transform}>
            <SimpleForm toolbar={<EditToolbar />}>
                <TextInput source="name" />
                <TextInput source="price" />
                <TextInput source="description" />
                <ReferenceInput source="category.id" reference="categories" />
                <NumberInput source="stock" />
                <BooleanInput label="Featured?" source="isFeatured" />
                <div className="flex flex-row justify-between w-full">
                    <input className="p-2 w-2/4" type="text" value={fileId} readOnly />
                    <button
                        onClick={handleOpenPicker}
                        className="border-2 p-2 w-1/4"
                        type="button">Pick Image from Google Drive</button>
                </div>
            </SimpleForm>
        </Edit>
    )
};

export default EditProduct;