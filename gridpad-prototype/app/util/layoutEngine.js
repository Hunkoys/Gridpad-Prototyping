class LayoutEngine {
  move(block, page, x, y) {
    if (page) {
      if (!page.el.contains(block.el)) {
        page.appendChild(block);
      }

      const gridX = Math.floor(x * page.gridSize);
      console.log(gridX);
      const gridY = Math.floor(y * page.gridSize);

      page.gridTemplateColumns = `${gridX}px [${block.id}-start] auto [${block.id}-end]`;
      page.gridTemplateRows = `${gridY}px [${block.id}-start] auto [${block.id}-end]`;
    } else {
      block.el.style.position = 'absolute';
    }
  }
}

export default new LayoutEngine();
