Events:
  * Click
      Container will receive the event if it's the click location is not occupied
      which means it's allowed to add an element there
      Since we know what container got clicked
      add an element in that spot and fill above with more 1 high elements
        calculate width
        since it's blank set height 1

  * Enter
      We need to know what container we're in
      and adding another block below is always allowed
      Create a new block inside that container
      Calculate width
      it's blank, so just give it 1 height

  * Drag
      Mouse Down on block
      Drag, check for mouse over
        Calculate grid coordinates
        Check if on container
          if different, remove container 
        Check if allowed add it
        if not set absolute

      On let go, Stop listening

Container
  if a block was added in it, attach an observer
  if a block is remove, detach it

Blocks
  Default blocks: Are the normal style text blocks and used as spacer blocks.

Info needed in block
  * container
  * before
  * after

block.id
// block.container
containers = []

for now do:
Lookup:
  for con in container:
    if con[block.id]
    return con.

container.blocks = {
  id: block
}

layout calculation:
sort by row:
  for block in container.blocks:
    rowLayout[block.top] = [].push(block)
    columnLayout[block.left] = [].push(block)

calculate:
  for row in rowLayout:
    

container1
block1


container2

Blocks should always be in a section so we can control it’s deletion in a single place in the code

```JS
// this is dead code and only for reference

const listeners = [];

const MouseTracker = {
  addListener: (listener) => {
    listeners.push(listener);
  },
  removeListener: (listener) => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  },
  notify: (event) => {
    listeners.forEach((listener) => listener(event));
  },
};

let x, y;
let beforeScrollX, beforeScrollY;

document.addEventListener('mousemove', (e) => {
  x = e.pageX;
  y = e.pageY;
  beforeScrollX = window.scrollX;
  beforeScrollY = window.scrollY;
  MouseTracker.notify({ x, y });
});

document.addEventListener('scroll', (e) => {
  const deltaX = window.scrollX - beforeScrollX;
  const deltaY = window.scrollY - beforeScrollY;
  MouseTracker.notify({ x: x + deltaX, y: y + deltaY });
});

export default MouseTracker;
```