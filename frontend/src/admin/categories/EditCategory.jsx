import { SimpleForm, TextInput, Edit } from 'react-admin';

const EditCategory = () => {
    const transform = data => ({
        name: data.name,
        description: data.description,
    });

    return (
        <Edit mutationMode="pessimistic" transform={transform}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="description" />
            </SimpleForm>
        </Edit>
    )
};

export default EditCategory;