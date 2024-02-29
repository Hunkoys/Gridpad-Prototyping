export function checkRight(section, gridX, gridY) {
  let width = section.width - gridX;
  const height = 1; // Could be a param
  for (const block of section.blocks) {
    const hasBlockToTheRight = gridY + height > block.top && gridY < block.bottom && gridX < block.left;
    if (hasBlockToTheRight) {
      width = Math.min(width, block.left - gridX);
    }
  }
  return { width, height };
}
