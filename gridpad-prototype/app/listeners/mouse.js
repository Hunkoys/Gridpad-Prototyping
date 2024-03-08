import { checkRight } from '@/app/util/crowdChecker';
import Block from '@/app/elements/block/block';

export default function setupClick(layoutEngine) {
  const settings = layoutEngine.settings;
  const { app, defaultGridSize } = settings;

  app.addEventListener(
    'mousedown',
    (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        if (document.activeElement.classList.contains('block')) {
          const block = document.activeElement._block;
          const section = block.section;
          const sectionOffsetX = e.clientX - section.el.offsetLeft;
          const fixedWidth = Math.floor(sectionOffsetX / defaultGridSize) - (block.left - 1);

          block.fixedWidth = fixedWidth;

          layoutEngine.move(block, section, {});
        }
      } else if (e.target.classList.contains('section')) {
        const section = e.target._block;

        const point = {
          left: Math.floor(e.offsetX / defaultGridSize),
          top: Math.floor(e.offsetY / defaultGridSize),
        };

        // Check distance from right block/wall
        const height = 1;
        // const width = checkRight(point, section)
        const width = 1;

        const block = new Block(defaultGridSize, width, height);
        layoutEngine.move(block, section, point);
      }
    },
    true
  );
}
