import { SimpleForm, TextInput, Edit, SelectInput } from 'react-admin';

const EditUser = () => {
    const transform = data => ({
        name: data.name,
        role: data.role,
    });

    return (
        <Edit transform={transform} mutationMode="pessimistic">
            <SimpleForm>
                <TextInput source="name" />
                <SelectInput source="role" choices={[
                    { id: 'user', name: 'User' },
                    { id: 'admin', name: 'Admin' },
                ]} />
            </SimpleForm>
        </Edit>
    )
};

export default EditUser;