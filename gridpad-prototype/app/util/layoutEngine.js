const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const { contentRect, target } = entry;
    target._onResize(contentRect);
  }
});

// .move will be our interface to move the block.
// its role is to move the block if it can't be/is not in the page and remove the observer if present
// else, it will just give the block to the page.
// it will check if the block has a min height,
// in which case we attach a resize observer if it's not already attached
// if not then just trigger .calculateLayout
// .calculateLayout will calculate the layout of the page
// It is responsible for calculating the grid rows and columns

// The resize observer is to ensure full control of the block's height.
// It should always be divisible by the grid size.

// blocks have a left, top, right, bottom and are always numbers

class LayoutEngine {
  // if right is max then we calculate if there are any blocks to the right and use the most space
  // if any other fields is empty then don't change block's value
  // left and top should be absolute numbers

  move(block, section, { left, top, right, bottom }) {
    // The any of the sides is undefined then the value should be the same as the block

    // CASE 1: There is no page
    if (!section) {
      block.el.style.position = 'absolute';
      resizeObserver.unobserve(block.el);
      return;
    }

    // CASE 2: There is a page
    // section.blocks is a linked list with the blocks in it.

    // if right is not defined then we'll calculate how far it could go. If there is a block on the right, stop there, if not, use up to the edge of the section minus the margin
    // if bottom is not defined the just use 1 if the block doesn't contain anything, else
    // if the requested size and position is occupied in section.blocks then keep don't place the block in section.
    // also remove resize observer
    // else, add the block in the section.blocks
    // and add the resize observer

    // if it's not allowed, then block should stay positioned absolutely

    // else,
  }

  calculateLayout(page) {
    // page.blocks will be a linked list of blocks
    // I need to go through the list and find where I need to put a grid column
    // They will be where the block Starts and ends
    // I also need to get the grid rows, but I only need to know where the blocks starts and not where it ends
    // All of the values are going to Divisible by grid size
    // The block will automatically grow vertically by it's content
    // So I need to find the next block that will collide with it below
    // and set that block's grid start row as the block's end row
    // If it doesn't collide with the block below it, then we don't need to put a grid end row

    // Let's try using a map to store the grid rows and columns
    //

    const blockLeft = Math.floor(block.x * page.gridSize);
    const blockTop = Math.floor(block.y * page.gridSize);
    const blockRight = Math.ceil((block.x + block.width) * page.gridSize);
    const blockBottom = Math.ceil((block.y + block.height) * page.gridSize);
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
