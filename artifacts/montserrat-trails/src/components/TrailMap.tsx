import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { LatLng } from "@/data/trailRoutes";

// Custom pin icon (SVG) styled to match the app's mountain/trail theme,
// avoids the bundler asset-path issues that come with Leaflet's default marker images.
const trailIcon = L.divIcon({
  className: "trail-map-pin",
  html: `
    <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.716 23.284 0 15 0z"
        fill="#166534" stroke="#ffffff" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="6.5" fill="#ffffff"/>
    </svg>
  `,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
});

interface TrailMapProps {
  lat: number;
  lng: number;
  name: string;
  /** Real recorded GPS route (ordered [lat, lng] pairs). When present, the route
   * is drawn as a polyline and the map fits to its bounds instead of the single pin. */
  route?: LatLng[];
  className?: string;
}

// Fits the map view to the route bounds once, on mount.
function FitToRoute({ route }: { route: LatLng[] }) {
  const map = useMap();
  useEffect(() => {
    if (route.length < 2) return;
    const bounds = L.latLngBounds(route.map(([lat, lng]) => L.latLng(lat, lng)));
    map.fitBounds(bounds, { padding: [16, 16] });
  }, [map, route]);
  return null;
}

export default function TrailMap({ lat, lng, name, route, className }: TrailMapProps) {
  const hasRoute = !!route && route.length > 1;

  return (
    <div
      className={className}
      aria-label={name}
      // Prevent the page from scrolling when the cursor passes over the map
      onWheel={(e) => e.stopPropagation()}
    >
      <MapContainer
        center={[lat, lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {hasRoute ? (
          <>
            <Polyline
              positions={route as LatLng[]}
              pathOptions={{ color: "#166534", weight: 4, opacity: 0.85 }}
            />
            <Marker position={route![0]} icon={trailIcon} />
            <FitToRoute route={route as LatLng[]} />
          </>
        ) : (
          <Marker position={[lat, lng]} icon={trailIcon} />
        )}
      </MapContainer>
    </div>
  );
}
