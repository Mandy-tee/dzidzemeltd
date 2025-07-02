import { List, DataTable } from 'react-admin';

const HubtelLogList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="Data.ClientReference" label="ClientReference" />
            <DataTable.Col source="Status" />
            <DataTable.Col source="Data.Amount" label="Amount" />
            <DataTable.Col source="Data.CheckoutId" label="CheckoutId" />
            <DataTable.Col source="Data.PaymentDetails.PaymentType" label="PaymentType" />
            <DataTable.Col source="Data.PaymentDetails.Channel" label="Channel" />
        </DataTable>
    </List>
);

export default HubtelLogList;