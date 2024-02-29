export function checkRight(point, section, height = 1) {
  const { left, top } = point;

  let width = section.width - left;
  for (const block of section.blocks) {
    const hasBlockToTheRight = top + height > block.top && top < block.bottom && left < block.left;
    if (hasBlockToTheRight) {
      width = Math.min(width, block.left - left);
    }
  }
  return width;
}
