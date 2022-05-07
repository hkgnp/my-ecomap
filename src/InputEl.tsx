import { useState, useEffect } from "react";
import axios from "axios";
import { LatLngExpression } from "leaflet";

const InputEl = (props: any) => {
  const [postalCode, setPostalCode] = useState("");
  const handleForm = (e: any) => {
    setPostalCode(e.target.value);
  };

  useEffect(() => {
    if (postalCode.length === 6) {
      handleSubmit();
    }
  }, [postalCode]);

  const handleSubmit = async () => {
    // Get Lat Lng
    const response = await axios({
      method: "get",
      url: "https://developers.onemap.sg/commonapi/search",
      params: {
        searchVal: postalCode,
        returnGeom: "Y",
        getAddrDetails: "Y",
        pageNum: "1",
      },
    });

    const { LATITUDE, LONGITUDE } = response.data.results[0];
    const position: LatLngExpression = [
      parseFloat(LATITUDE),
      parseFloat(LONGITUDE),
    ];

    props.map.flyTo(position, 16);

    const mObj = { position: position, postalCode: postalCode };
    props.updateMarkerObj(mObj);

    setPostalCode("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-40 px-2 py-1 leading-tight text-gray-700 bg-white border-none appearance-none task-field h-15 focus:outline-none"
        placeholder="Key in a postal code."
        name="postalCode"
        onChange={handleForm}
        value={postalCode}
      />
    </form>
  );
};

export default InputEl;
