import { Marker, Popup } from "react-leaflet";
import html2canvas from "html2canvas";

interface Resource {
  postal: number;
  org: string;
  address: string;
  latitude: number;
  longitude: number;
  category: string;
}

const printMap = async () => {
  const canvas: HTMLElement = await html2canvas(
    document.querySelector("#mapId") as HTMLElement,
    {
      allowTaint: true,
      useCORS: true,
    }
  );
  document.body.appendChild(canvas);
  window.print();
};

const SetMarker = (props: Resource) => {
  return (
    <Marker position={[props.latitude, props.longitude]}>
      <Popup>
        <span className="text-green-600">{props.org}</span>
        <br />
        <span className="text-purple-600">{props.address}</span>
        <br />
        <span className="text-blue-600">{props.category}</span>
        <br />
        <button
          className="absolute right-2 bottom-2 py-1 px-2 rounded-full text-xs bg-blue-500 text-white"
          onClick={printMap}
        >
          <i className="fa-solid fa-print"></i>
        </button>
      </Popup>
    </Marker>
  );
};

export default SetMarker;
