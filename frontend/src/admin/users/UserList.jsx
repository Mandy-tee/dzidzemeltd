import { List, DataTable } from 'react-admin';

const UserList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="email" />
            <DataTable.Col source="role" />
            <DataTable.Col source="createdAt" />
            <DataTable.Col source="updatedAt" />
        </DataTable>
    </List>
);

export default UserList;