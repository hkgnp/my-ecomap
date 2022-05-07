import React, { ChangeEvent, useState } from "react";

const Card = (props: any) => {
  const { org, address, category, id } = props;
  const [editing, setEditing] = useState(false);
  const [editField, setEditField] = useState({ org, address, id });

  const updateResource = () => {
    !editing ? setEditing(true) : setEditing(false);
  };

  const handleForm = (e: ChangeEvent) => {
    setEditField((prevField) => ({
      ...prevField,
      [(e.target! as HTMLInputElement).name]: (e.target! as HTMLInputElement)
        .value,
    }));
  };

  const saveResource = () => {
    console.log(editField);
    setEditing(false);
  };

  return (
    <div className="relative h-48 px-5 py-1 bg-white border border-pink-400 rounded-lg shadow-md w-80">
      <div className="absolute bottom-2 right-2">
        {editing && (
          <React.Fragment>
            <button
              name={id}
              className="mr-2 px-4 py-2 text-xs font-semibold text-white bg-red-500 rounded-lg hover:bg-opacity-75"
              onClick={updateResource}
            >
              <i className="fa-solid fa-xmark"></i> Delete Resource
            </button>
            <button
              name={id}
              className="px-4 py-2 mr-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-opacity-75"
              onClick={saveResource}
            >
              <i className="fa-solid fa-floppy-disk"></i> Save
            </button>
          </React.Fragment>
        )}
        {!editing && (
          <button
            name={id}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-800 rounded-lg hover:bg-opacity-75"
            onClick={updateResource}
          >
            <i className="fa-solid fa-pencil"></i> Edit
          </button>
        )}
      </div>
      {!editing && <p className="mb-1 text-left text-pink-500">{props.org}</p>}
      {editing && (
        <input
          className="w-full px-2 py-1 mt-2 mb-3 text-sm leading-tight text-gray-700 border-blue-600 shadow shadow-purple-500"
          onChange={handleForm}
          name="org"
          value={editField.org}
        />
      )}
      <hr />
      {!editing && (
        <p className="mt-2 mb-1 text-sm text-left">
          <i className="fa-solid fa-location-pin"></i> {address}
        </p>
      )}
      {editing && (
        <input
          className="text-sm shadow shadow-purple-500 text-gray-700 leading-tight mb-3 border-blue-600 px-2 py-1 w-full"
          onChange={handleForm}
          name="address"
          value={editField.address}
        />
      )}
      <p className="mt-3 mb-3 text-sm text-left">
        <i className="fa-solid fa-house"></i> {category}
      </p>
    </div>
  );
};

export default Card;
