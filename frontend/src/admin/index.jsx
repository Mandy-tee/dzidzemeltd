import { Admin, Resource, ShowGuesser } from "react-admin";
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PeopleIcon from '@mui/icons-material/People';
import PrintIcon from '@mui/icons-material/Print';
import CreateProduct from "./products/CreateProduct";
import EditProduct from "./products/EditProduct";
import CreateCategory from "./categories/CreateCategory";
import EditCategory from "./categories/EditCategory";
import ProductList from "./products/ProductList";
import CategoryList from "./categories/CategoryList";
import OrderList from "./orders/OrderList";
import { authProvider } from "./authProvider";
import { dataProvider } from "./dataProvider";
import UserList from "./users/UserList";
import CreateUser from "./users/CreateUser";
import EditUser from "./users/EditUser";
import HubtelLogList from "./hubtel-logs/HubtelLogList";

const MyAdmin = () => (
  <Admin basename="/admin" dataProvider={dataProvider} authProvider={authProvider}>
    <Resource
      icon={GroupWorkIcon}
      name="categories"
      list={CategoryList}
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
    <Resource
      icon={LocalMallIcon}
      name="orders"
      list={OrderList}
      show={ShowGuesser}
    />
    <Resource
      icon={PeopleIcon}
      name="users"
      list={UserList}
      create={CreateUser}
      edit={EditUser}
    />
    <Resource
      icon={PrintIcon}
      name="hubtel-logs"
      options={{ label: 'HubtelLogs' }}
      list={HubtelLogList}
    />
  </Admin>
);

export default MyAdmin;