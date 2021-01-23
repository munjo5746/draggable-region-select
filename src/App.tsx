import { useState } from "react";
import "./styles.css";

type Block = {
  top: number;
  order: number;
};

const HEIGHT = 5; // em
export default function App() {
  const [startBlock, setStartBlock] = useState<Block>();
  const [endBlock, setEndBlock] = useState<Block>();
  const [dragging, setDragging] = useState<boolean>(false);
  const [numDragBlocks, setNumDragBlocks] = useState<number>(1);
  const [regionHeight, setRegionHeight] = useState<number>(HEIGHT);

  return (
    <div className="App">
      {[...Array(6).keys()].map((num) => {
        return (
          <div
            key={num}
            data-order={num}
            onMouseDown={(e) => {
              const element = e.target as HTMLDivElement;
              const { top } = element.getBoundingClientRect();
              const orderAttr = element.getAttribute("data-order");
              if (!orderAttr) throw new Error('The "order" must be present.');

              const order = Number.parseInt(orderAttr, 10);

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
              const { top } = element.getBoundingClientRect();
              const orderAttr = element.getAttribute("data-order");
              if (!orderAttr) throw new Error('The "order" must be present.');

              const order = Number.parseInt(orderAttr, 10);

              if (endBlock.order !== order) {
                if (endBlock.order < order) {
                  console.log("down");
                } else {
                  console.log("up");
                }
              }

              setEndBlock({
                top,
                order
              });
              // if (dragging) setNumDragBlocks(numDragBlocks + 1);
            }}
            onMouseUp={() => {
              setDragging(false);
            }}
          ></div>
        );
      })}
      <div
        style={
          startBlock && endBlock
            ? {
                display: "block",
                top: startBlock.top,
                height: `${
                  regionHeight * (endBlock.order - startBlock.order) + HEIGHT
                }em`,
                pointerEvents: "none"
              }
            : { display: "none" }
        }
        className="selected-region"
      ></div>
    </div>
  );
}
