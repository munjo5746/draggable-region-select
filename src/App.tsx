import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

type Position = {
  top: number;
  left: number;
};

const HEIGHT = 5; // em
export default function App() {
  const [startPosition, setStartPosition] = useState<Position>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [numDragBlocks, setNumDragBlocks] = useState<number>(1);
  const [regionHeight, setRegionHeight] = useState<number>(HEIGHT);

  return (
    <div className="App">
      {[...Array(6).keys()].map((num) => {
        return (
          <div
            key={num}
            onMouseDown={(e) => {
              const {
                left,
                top
              } = (e.target as HTMLDivElement).getBoundingClientRect();
              setStartPosition({
                left,
                top
              });
              setDragging(true);
            }}
            onMouseOver={() => {
              if (dragging) setNumDragBlocks(numDragBlocks + 1);
            }}
            onMouseUp={() => {
              setDragging(false);
            }}
          ></div>
        );
      })}
      <div
        style={
          startPosition
            ? {
                display: "block",
                top: startPosition.top,
                height: `${regionHeight * numDragBlocks}em`,
                pointerEvents: "none"
              }
            : { display: "none" }
        }
        className="selected-region"
      ></div>
    </div>
  );
}
