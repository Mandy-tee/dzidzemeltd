import { List, DataTable } from 'react-admin';

const CategoryList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="description" />
            <DataTable.Col source="createdAt" />
            <DataTable.Col source="updatedAt" />
        </DataTable>
    </List>
);

export default CategoryList;