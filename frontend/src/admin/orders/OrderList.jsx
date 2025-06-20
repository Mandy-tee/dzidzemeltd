import { List, DataTable } from 'react-admin';

const OrderList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="firstName" />
            <DataTable.Col source="lastName" />
            <DataTable.Col source="email" />
            <DataTable.Col source="phone" />
            <DataTable.Col source="address" />
            <DataTable.Col source="deliveryStatus" />
            <DataTable.Col source="paymentStatus" />
        </DataTable>
    </List>
);

export default OrderList;