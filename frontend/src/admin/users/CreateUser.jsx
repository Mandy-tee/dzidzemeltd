import { SimpleForm, TextInput, Create, SelectInput } from 'react-admin';

const CreateUser = () => {
    return (
        <Create redirect="list">
            <SimpleForm>
                <TextInput source="name" />
                <TextInput type="email" source="email" />
                <TextInput type="password" source="password" />
                <SelectInput defaultValue="user" source="role" choices={[
                    { id: 'user', name: 'User' },
                    { id: 'admin', name: 'Admin' },
                ]} />
            </SimpleForm>
        </Create>
    )
};

export default CreateUser;