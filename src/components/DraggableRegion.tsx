import React, { CSSProperties, useEffect, useRef, useState } from "react";

import { getBlockData } from "./DraggableRegion.utils";
import { Block } from "./DraggableRegion.types";

import "./DraggableRegion.css";

interface DraggableRegionProps {
  numOfCells: number;
}

const DraggableRegion: React.FC<DraggableRegionProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellDimension, setCellDimension] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0
  });
  useEffect(() => {
    if (!containerRef.current) return;

    const { width, height } = containerRef.current.getBoundingClientRect();
    setCellDimension({
      width,
      height: height / props.numOfCells!
    });
  }, [containerRef, props.numOfCells]);

  const [startBlock, setStartBlock] = useState<Block>();
  const [endBlock, setEndBlock] = useState<Block>();
  const [draggingDirection, setDraggingDirection] = useState<"upward" | "downward">();
  const [dragging, setDragging] = useState<boolean>(false);

  let selectedRegionStyle: CSSProperties = {};
  if (startBlock && endBlock) {
    selectedRegionStyle = {
      display: "block",
      top: draggingDirection === "downward" ? startBlock.top : endBlock.top,

      width: cellDimension.width,
      // total selected region height + the current endblock height
      height: `${
        cellDimension.height * Math.abs(endBlock.order - startBlock.order) + cellDimension.height
      }px`
    };

    if (dragging) {
      selectedRegionStyle = {
        ...selectedRegionStyle,
        pointerEvents: "none"
      };
    }
  } else {
    selectedRegionStyle = { display: "none" };
  }

  return (
    <div ref={containerRef} className="draggable-region">
      {[...Array(props.numOfCells).keys()].map((num) => {
        return (
          <div
            key={num}
            data-order={num}
            onMouseDown={(e) => {
              const element = e.target as HTMLDivElement;
              const { top, order } = getBlockData(element, cellDimension.height);

              setStartBlock({
                top,
                order
              });
              setEndBlock({
                top,
                order
              });
              setDragging(true);
            }}
            onMouseOver={(e) => {
              if (!dragging || !startBlock || !endBlock) return;

              const element = e.target as HTMLDivElement;
              const { top, order } = getBlockData(element, cellDimension.height);

              if (endBlock.order === order) return;

              // first set the endBlock to caculate the total height of the selected region
              setEndBlock({
                top,
                order
              });

              // second, set the direction to find out which block to draw the region from
              setDraggingDirection(startBlock.order < order ? "downward" : "upward");
            }}
            onMouseUp={() => {
              setDragging(false);
            }}
          ></div>
        );
      })}
      <div
        style={selectedRegionStyle}
        className="selected-region"
        onMouseUp={(e) => {
          e.preventDefault();
          // When user stops dragging and mouse up,
          //  it actually happens on the selected-region.
          // So we should set dragging to false here.

          setDragging(false);
        }}
      ></div>
    </div>
  );
};

export default DraggableRegion;
