import React from "react";

import DraggableRegion from "./components/DraggableRegion";

import "./styles.css";

export default function App() {
  return (
    <div
      style={{
        width: "20em",
        height: "30em",
        border: "1px solid gray"
      }}
    >
      <DraggableRegion numOfCells={10} />
    </div>
  );
}
