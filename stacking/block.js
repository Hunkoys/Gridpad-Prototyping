function Grip() {
  const grip = document.createElement('div');
  grip.classList.add('grip');
  return grip;
}

function Block() {
  const block = document.createElement('div');
  block.classList.add('block');
  block.id = `block-${Math.random()}`;
  return block;
}

let hoveredBlock = null;

document.addEventListener('mouseover', (e) => {
  console.log(e.target);
  if (e.target.parentElement.classList.contains('block')) {
    hoveredBlock = e.target.parentElement;
  }
  else {
    hoveredBlock.classList.remove('block-resizable');
    hoveredBlock = null;
  }
});

let x, y
let beforeScrollX, beforeScrollY;

document.addEventListener('mousemove', (e) => {
  x = e.pageX;
  y = e.pageY;
  console.log('move', e.pageX, e.pageY);
  beforeScrollX = window.scrollX;
  beforeScrollY = window.scrollY;
});

document.addEventListener('scroll', (e) => {
  const deltaX = window.scrollX - beforeScrollX;
  const deltaY = window.scrollY - beforeScrollY;
  console.log('scroll',x + deltaX, y + deltaY);
});


document.addEventListener('click', (e) => {
  // console.table({
  //   client: { x: e.clientX, y: e.clientY },
  //   page: { x: e.pageX, y: e.pageY },
  //   screen: { x: e.screenX, y: e.screenY },
  //   offset: { x: e.offsetX, y: e.offsetY }
  // });

  console.log(document.getElementById('block-1').offsetLeft)
})

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && hoveredBlock) {
    hoveredBlock.classList.add('block-resizable');
    time = console.timeEnd('resize');
  }
  
});

document.addEventListener('keyup', (e) => {
  if (hoveredBlock) {
    hoveredBlock.classList.remove('block-resizable');
  }
});

deep.addEventListener('click', (e) => {
  console.log('deep')
});

// document.querySelectorAll('.page').forEach((page) => {
//   page.addEventListener('click', (event) => {
//     const position = [Math.floor(event.offsetX / gridSize), Math.floor(event.offsetY / gridSize)];

//     for (let i = 0; i < position[1]; i++) {
//       const block = Block();
//       block.style.gridColumn = `1 / ${page.columns + 1}`;
//       page.appendChild(block);
//     }

//     const block = Block();
//     block.style.gridColumn = `${position[0] + 1} / ${page.columns + 1}`;
//     page.appendChild(block);
//     block.focus();
//   });
// });

function modifyBlock (block, top, left, bottom, right) {
  block.style.gridRow = `${top} / ${bottom}`;
  block.style.gridColumn = `${left} / ${right}`;
}
