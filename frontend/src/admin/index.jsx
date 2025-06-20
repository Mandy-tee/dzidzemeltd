import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import CreateProduct from "./products/CreateProduct";
import EditProduct from "./products/EditProduct";
import CreateCategory from "./categories/CreateCategory";
import EditCategory from "./categories/EditCategory";
import ProductList from "./products/ProductList";

const dataProvider = jsonServerProvider(import.meta.env.VITE_BACKEND_URL);

const MyAdmin = () => (
  <Admin basename="/admin" dataProvider={dataProvider}>
    <Resource
      icon={CategoryIcon}
      name="categories"
      list={ListGuesser}
      create={CreateCategory}
      edit={EditCategory}
    />
    <Resource
      icon={InventoryIcon}
      name="products"
      list={ProductList}
      create={CreateProduct}
      edit={EditProduct}
    />
  </Admin>
);

export default MyAdmin;