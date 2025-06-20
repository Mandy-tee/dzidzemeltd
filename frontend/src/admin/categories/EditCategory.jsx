import { useState } from 'react';
import useDrivePicker from "react-google-drive-picker";
import { SimpleForm, TextInput, Edit, WithRecord } from 'react-admin';
import EditToolbar from '../common/EditToolbar';

const EditCategory = () => {
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
        description: data.description,
        image: fileId || data.image,
    });

    return (
        <Edit mutationMode="pessimistic" transform={transform}>
            <SimpleForm toolbar={<EditToolbar />}>
                <TextInput source="name" />
                <TextInput source="description" />
                <WithRecord
                    label="image"
                    render={record => (
                        <div className="flex flex-row justify-between w-full">
                            <input className="p-2 w-2/4" type="text" value={fileId || record.image} readOnly />
                            <button
                                onClick={handleOpenPicker}
                                className="border-2 p-2 w-1/4"
                                type="button">Pick Image from Google Drive</button>
                        </div>
                    )}
                />
            </SimpleForm>
        </Edit>
    )
};

export default EditCategory;