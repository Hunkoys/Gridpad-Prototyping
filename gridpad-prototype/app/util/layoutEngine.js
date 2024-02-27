const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { contentRect, target } = entry;
    target._onResize(contentRect);
  }
});

class LayoutEngine {
  move(block, section, { left, top, width }) {
    // height is calculated by the resize observer

    // CASE 1: There is no page
    if (!section) {
      block.el.style.position = 'absolute';
      resizeObserver.unobserve(block.el);
      return;
    }

    if (left) block.left = left;
    if (top) block.top = top;
    if (width) block.width = width;
    // check if block is already in the section
    if (!section.blocks.includes(block)) {
      this.add(block, section);
    }
    this.calculateGridLayout(section);
  }

  add(block, section) {
    section.add(block);
    block.el._onResize = (contentRect) => {
      const gridHeight = Math.ceil(contentRect.height / section.gridSize);
      if (gridHeight !== block.height) {
        block.height = gridHeight;
        this.calculateGridLayout(section);
      }
    };
    resizeObserver.observe(block.el);
  }

  calculateGridLayout(section) {
    // blocks that grow downwards should push blocks below themn down if they collide or overlap
    // We need to iterate through the blocks and calculate weather any block is colliding with another
    // If it is then we need to push the block below it down

    // This whole sub-section can be extracted into `genereateGridTemplate` method.
    // This relies on the fact that js sorts it's keys in order if they are numbers
    const rowNames = {};
    const colNames = {};

    for (const block of section.blocks) {
      if (!colNames[block.left]) colNames[block.left] = '';
      if (!colNames[block.right]) colNames[block.right] = '';
      if (!rowNames[block.top]) rowNames[block.top] = '';
      if (!rowNames[block.bottom]) rowNames[block.bottom] = '';

      colNames[block.left] += `${block.id}-start `;
      colNames[block.right] += `${block.id}-end `;
      rowNames[block.top] += `${block.id}-start `;
      rowNames[block.bottom] += `${block.id}-end `;
    }

    let gridTemplateColumns = [];
    let gridTemplateRows = [];
    let last = 0;
    for (const column in colNames) {
      const width = Number(column) - last;
      last = Number(column);
      gridTemplateColumns.push(`${width * section.gridSize}px [ ${colNames[column]}]`);
    }
    last = 0;
    for (const row in rowNames) {
      const height = Number(row) - last;
      last = Number(row);
      gridTemplateRows.push(`${height * section.gridSize}px [ ${rowNames[row]}]`);
    }

    section.gridTemplateColumns = gridTemplateColumns;
    section.gridTemplateRows = gridTemplateRows;
  }
}

export default new LayoutEngine();

// // CASE 2: There is a page but block is in it
// if (page.el.contains(block.el)) {
//   // We can implement the check in the LL
//   // See if anything changed
//   // micro optimization

//   // Rough checking, we can do a more precise check later
//   let delta = 0;
//   delta += left === block.left ? 0 : 1;
//   delta += top === block.top ? 0 : 1;
//   delta += right === block.right ? 0 : 1;
//   delta += bottom === block.bottom ? 0 : 1;

//   if (delta === 0) return;

//   this.calculateLayout(page);
// }
// // CASE 3: There is a page and block is NOT in it
// else {
//   // Calculate the width of the block
//   // then Place the block in the DOM for height calculation
//   // then run the layout calculation

//   let existingBlock = page.blocks;
//   let right = right === 'max' ? page.width; // We could account for margin later

//   while (existingBlock) {
//     if (existingBlock.top > top || existingBlock.bottom <= top) {
//       existingBlock = existingBlock.next;
//       continue;
//     }
//     right = Math.min(right, existingBlock.x);
//   }

//   let w = right - x;

//   if (w > 0) {
//     if (existingBlock.width === -1) {
//       existingBlock.width = w;
//       resizeObserver.observe(existingBlock.el);
//       const next = page.blocks;
//       page.blocks = existingBlock;
//       existingBlock.next = next;
//     }
//   }

//   existingBlock.el._onResize = (contentRect) => {
//     // Only going to be used for the height

//     const newHeight = Math.ceil(contentRect.height / page.gridSize);

//     if (newHeight !== existingBlock.height) {
//       existingBlock.height = newHeight;
//       this.calculateLayout(page);
//     }
//   };
// }
