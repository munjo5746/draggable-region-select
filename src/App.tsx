import { CSSProperties, useCallback, useState } from "react";
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

  const getBlockData = useCallback((div: HTMLDivElement) => {
    const { top } = div.getBoundingClientRect();
    const orderAttr = div.getAttribute("data-order");

    if (!orderAttr) throw new Error('The "order" must be present.');

    const order = Number.parseInt(orderAttr, 10);

    return { top, order };
  }, []);
  let selectedRegionStyle: CSSProperties = {};
  if (startBlock && endBlock) {
    selectedRegionStyle = {
      display: "block",
      top: startBlock.top,
      height: `${HEIGHT * (endBlock.order - startBlock.order) + HEIGHT}em`
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
    <div className="App">
      {[...Array(6).keys()].map((num) => {
        return (
          <div
            key={num}
            data-order={num}
            onMouseDown={(e) => {
              const element = e.target as HTMLDivElement;
              const { top, order } = getBlockData(element);

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
              const { top, order } = getBlockData(element);

              if (endBlock.order === order) return;

              if (endBlock.order < order) {
                setEndBlock({
                  top,
                  order
                });
              } else {
                // cursor stays on the same block as the endBlock
                //  or cusor moves upwards.
                if (startBlock.order > order) {
                  // cursor moves up but still below the startBlock
                  setStartBlock({
                    top,
                    order
                  });
                } else {
                  setEndBlock({
                    top,
                    order
                  });
                }
              }
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
}
