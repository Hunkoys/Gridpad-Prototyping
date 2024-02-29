import { checkRight } from '@/app/util/crowdChecker';
import layoutEngine from '@/app/util/layoutEngine';
import Block from '@/app/block/block';

export default function setupClick({ app, defaultGridSize }) {
  app.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('section')) {
      const section = e.target._block;
      const gridX = Math.floor(e.offsetX / defaultGridSize);
      const gridY = Math.floor(e.offsetY / defaultGridSize);

      // Check distance from right block/wall
      let { width, height } = checkRight(section, gridX, gridY);

      const block = new Block(defaultGridSize, width, height);
      layoutEngine.move(block, e.target._block, {
        left: gridX,
        top: gridY,
      });
    }
  });
}
