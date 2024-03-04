import { checkRight } from '@/app/util/crowdChecker';
import layoutEngine from '@/app/util/layoutEngine';
import Block from '@/app/elements/block/block';

export default function setupClick({ app, defaultGridSize }) {
  app.addEventListener(
    'mousedown',
    (e) => {
      console.log('phase', e.eventPhase);
      if (e.ctrlKey) {
        e.preventDefault();
        if (document.activeElement.classList.contains('block')) {
          console.log('lhell');
          const block = document.activeElement._block;
          const section = block.section;
          const sectionOffsetX = e.clientX - section.el.offsetLeft;
          console.log('sectionOffsetX', sectionOffsetX);
          console.log('block.left', block.left);
          const maxWidth = Math.floor(sectionOffsetX / defaultGridSize) - (block.left - 1);

          console.log(maxWidth, block.width, e.target);
          block.maxWidth = maxWidth;

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
        block.maxWidth = checkRight(point, section);
        layoutEngine.move(block, section, point);
      }
    },
    true
  );
}
