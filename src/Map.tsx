import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Circle,
  Tooltip,
} from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import SetMarker from "./SetMarker";
import InputEl from "./InputEl";
import { youAreHereIcon } from "./pins";
import DropdownSelect from "./DropdownSelect";

interface MarkerObj {
  display: boolean;
  circle: boolean;
  position: LatLngExpression;
  postalCode: string;
}

const Map = (props: { resources: any[] }) => {
  const [map, setMap] = useState(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [markerObj, setMarkerObj] = useState<MarkerObj>({
    display: false,
    circle: false,
    position: [0, 0],
    postalCode: "",
  });
  const [resources, setResources] = useState(props.resources);
  const defaultCenter: LatLngTuple = [1.35, 103.82];

  useEffect(() => {
    // Get unique categories to create toggles
    let categoryArr: string[] = ["-- Filter --"];
    for (let r of resources) {
      if (r.category !== categoryArr[categoryArr.length - 1]) {
        categoryArr.push(r.category);
      }
    }
    setCategories(categoryArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length, resources.length]);

  // Draw marker from postal code
  const updateMarkerObj = (mObj: any) => {
    setMarkerObj((prevMObj) => ({
      ...prevMObj,
      display: true,
      circle: true,
      position: mObj.position,
      postalCode: mObj.postalCode,
    }));
  };

  const toggleService = (e: any) => {
    const arr = resources.filter((r) => r.category === e.target.value);
    setResources(arr);
  };

  const resetCategories = () => {
    setResources(props.resources);
  };

  const { display, circle, postalCode, position } = markerObj;

  return (
    <div className="">
      <div
        className="absolute flex flex-col content-between text-right top-5 right-5"
        style={{ zIndex: "9999" }}
      >
        <a
          className="text-xs bg-red-600 py-1 px-0 mb-2 text-white text-center rounded"
          href="mailto:my-ecomap@pngs.cc"
        >
          Report an error
        </a>
        <InputEl map={map} updateMarkerObj={updateMarkerObj} />
        <div className="flex items-start justify-end mt-2">
          {categories.length < 3 && (
            <button
              onClick={resetCategories}
              className="px-3 py-1 ml-1 text-sm text-white bg-red-600 rounded-full"
            >
              Reset (Showing {categories[1]})
            </button>
          )}
          {categories.length > 3 && (
            <select
              className="py-0 px-2 w-36 h-8 text-sm form-select"
              onChange={toggleService}
            >
              {categories.map((c, index) => (
                <DropdownSelect key={index} name={c} />
              ))}
            </select>
          )}
        </div>
      </div>
      <MapContainer
        id="mapId"
        center={defaultCenter}
        zoom={12}
        className="absolute inset-0"
        //@ts-ignore
        whenCreated={setMap}
        tap={false}
        preferCanvas={true}
      >
        <TileLayer
          url={`https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png`}
          attribution='<img src="https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
        />
        {resources.map((r, index) => (
          <SetMarker
            key={index}
            org={r.org}
            postal={r.postal}
            address={r.address}
            latitude={r.latitude}
            longitude={r.longitude}
            category={r.category}
          />
        ))}
        {display && (
          <Marker position={position} icon={youAreHereIcon}>
            <Tooltip permanent direction="top" offset={[-16, -12]}>
              Singapore {postalCode}
            </Tooltip>
          </Marker>
        )}
        {circle && <Circle center={position} radius={500} />}
      </MapContainer>
    </div>
  );
};

export default Map;
