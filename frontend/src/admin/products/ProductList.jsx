import { List, DataTable } from 'react-admin';

const ProductList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="name" />
            <DataTable.Col source="category.name" />
            <DataTable.Col source="createdAt" />
            <DataTable.Col source="updatedAt" />
        </DataTable>
    </List>
);

export default ProductList;