export const getBlockData = (div: HTMLDivElement, cellHeight: number) => {
  const orderAttr = div.getAttribute("data-order");

  if (!orderAttr) throw new Error('The "order" must be present.');

  const order = Number.parseInt(orderAttr, 10);

  return { top: order * cellHeight, order };
};
