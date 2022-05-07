const DropdownSelect = (props: { name: string }) => {
    return (
        <option value={props.name} className="px-4 py-3 rounded-full">
            {props.name}
        </option>
    );
};
export default DropdownSelect;
