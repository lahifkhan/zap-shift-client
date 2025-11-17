import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [stores, setStores] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        setStores(data);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    console.log(location);

    const district = stores.find((store) =>
      store.district.toLowerCase().includes(location.toLowerCase())
    );
    console.log(district);
    const cordinate = [district.latitude, district.longitude];
    mapRef.current.flyTo(cordinate, 14);
  };

  const position = [23.685, 90.3563];
  return (
    <div className="w-11/12 mx-auto mt-8 mb-32 bg-base-100 p-8 rounded-2xl">
      <div className="space-y-5">
        <h1 className="text-3xl font-bold text-secondary">
          We are available in 64 districts
        </h1>

        <form onSubmit={handleSearch}>
          <div className="join">
            <div>
              <label className="input">
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </g>
                </svg>
                <input type="search" name="location" placeholder="Search" />
              </label>
            </div>
            <button className="btn btn-primary  text-black rounded-r-full join-item">
              Search
            </button>
          </div>
        </form>
      </div>
      <p className="text-secondary font-bold text-2xl mt-15 mb-4">
        We deliver almost all over Bangladesh
      </p>
      <div>
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="w-full h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stores.map((store, index) => (
            <Marker
              position={[store.latitude, store.longitude]}
              className="w-full h-[800px]"
              key={index}
            >
              <Popup>
                {store.district}
                <br /> {store.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
