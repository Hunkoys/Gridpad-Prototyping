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
    if (block.section !== section) {
      this.add(block, section);
    }
    this.calculateGridLayout(section);
  }

  add(block, section) {
    if (block.section) {
      block.section.remove(block);
    }
    block.section = section;
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
    for (let a = 0; a < section.blocks.length; a++) {
      for (let b = a + 1; b < section.blocks.length; b++) {
        const A = section.blocks[a];
        const B = section.blocks[b];
        if (A.right > B.left && A.left < B.right) {
          if (A.bottom > B.top && A.top < B.bottom) {
            B.top = A.bottom;
          }
        }
      }
    }

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
