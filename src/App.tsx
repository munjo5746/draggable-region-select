import { useRef } from "react";
import "./styles.css";

export default function App() {
  const selectedRegionRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="App">
      {[...Array(10).keys()].map(() => {
        return <div></div>;
      })}
      <div ref={selectedRegionRef} className="selected-region"></div>
    </div>
  );
}
