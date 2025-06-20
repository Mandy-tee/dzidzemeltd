import { DeleteButton, SaveButton, Toolbar } from "react-admin";

const EditToolbar = (props) => (
    <Toolbar className="flex flex-row justify-between" {...props}>
        <SaveButton alwaysEnable />
        <DeleteButton />
    </Toolbar>
);

export default EditToolbar;