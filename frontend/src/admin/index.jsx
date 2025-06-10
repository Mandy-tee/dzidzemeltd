import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import CreateProduct from "./products/CreateProduct";

const dataProvider = jsonServerProvider(import.meta.env.VITE_BACKEND_URL);

const MyAdmin = () => (
  <Admin basename="/admin" dataProvider={dataProvider}>
    <Resource name="products" list={ListGuesser} create={CreateProduct} />
    {/* <Resource name="comments" list={ListGuesser} /> */}
  </Admin>
);

export default MyAdmin;