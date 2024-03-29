import { checkRight } from '@/app/util/crowdChecker';
import layoutEngine from '@/app/util/layoutEngine';
import Block from '@/app/elements/block/block';

export default function setupClick({ app, defaultGridSize }) {
  app.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('section')) {
      const section = e.target._block;

      const point = {
        left: Math.floor(e.offsetX / defaultGridSize),
        top: Math.floor(e.offsetY / defaultGridSize),
      };

      // Check distance from right block/wall
      const height = 1;
      const width = checkRight(point, section);

      const block = new Block(defaultGridSize, width, height);
      layoutEngine.move(block, section, point);
    }
  });
}
