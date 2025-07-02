import { List, DataTable } from 'react-admin';

const HubtelLogList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="ResponseCode" />
            <DataTable.Col source="Status" />
            <DataTable.Col source="createdAt" />
            <DataTable.Col source="updatedAt" />
        </DataTable>
    </List>
);

export default HubtelLogList;