import { SimpleForm, TextInput, Create } from 'react-admin';

const CreateCategory = () => {
    return (
        <Create redirect="list">
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Create>
    )
};

export default CreateCategory;