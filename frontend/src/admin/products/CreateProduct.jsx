import { SimpleForm, TextInput, Create } from 'react-admin';

const CreateProduct = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="price" />
            <TextInput source="description" />
            <TextInput source="image" />
        </SimpleForm>
    </Create>
);

export default CreateProduct;