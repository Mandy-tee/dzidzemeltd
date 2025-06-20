import { useState } from 'react';
import useDrivePicker from "react-google-drive-picker";
import { SimpleForm, TextInput, Create } from 'react-admin';

const CreateCategory = () => {
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

    const transform = (data) => ({
        name: data.name,
        description: data.description,
        image: fileId,
    });

    return (
        <Create transform={transform} redirect="list">
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="description" />
                <div className="flex flex-row justify-between w-full">
                    <input className="p-2 w-2/4" type="text" value={fileId} readOnly />
                    <button
                        onClick={handleOpenPicker}
                        className="border-2 p-2 w-1/4"
                        type="button">Pick Image from Google Drive</button>
                </div>
            </SimpleForm>
        </Create>
    )
};

export default CreateCategory;