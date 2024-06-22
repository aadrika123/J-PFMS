// import React from "react";
// import {
//   MapContainer as LeafletMap,
//   TileLayer,
//   Marker,
//   Popup,
//   GeoJSON,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import jharkhandData1 from "./Json/jharkhand.json";

// interface CustomMapProps {
//   center: [number, number];
//   zoom: number;
//   scrollWheelZoom?: boolean;
// }

// const CustomMap: React.FC<CustomMapProps> = ({
//   center,
//   zoom,
//   scrollWheelZoom = false,
// }) => {
//   return (
//     <LeafletMap
//       center={center}
//       zoom={zoom}
//       scrollWheelZoom={scrollWheelZoom}
//       style={{ height: "400px", width: "100%" }}
//       className="rounded-xl"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <GeoJSON
//         data={jharkhandData1 as any}
//         style={{ color: "blue", weight: 2 }}
//       />
//       <Marker position={center}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </LeafletMap>
//   );
// };

// export default CustomMap;
