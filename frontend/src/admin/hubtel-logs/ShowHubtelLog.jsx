import { Show, SimpleShowLayout, TextField, DateField, RichTextField } from 'react-admin';

const ShowHubtelLog = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="ResponseCode" />
            <TextField source="Status" />
            <TextField source="Data.PaymentDetails.MobileMoneyNumber" />
            <TextField source="Data.PaymentDetails.PaymentType" />
            <TextField source="Data.PaymentDetails.Channel" />
            <TextField source="Data.CheckoutId" />
            <TextField source="Data.SalesInvoiceId" />
            <TextField source="Data.ClientReference" />
            <TextField source="Data.Status" />
            <TextField source="Data.Amount" />
            <TextField source="Data.CustomerPhoneNumber" />
            <TextField source="Data.Description" />
            <DateField source="createdAt" />
            <DateField source="updatedAt" />
        </SimpleShowLayout>
    </Show>
);

export default ShowHubtelLog;