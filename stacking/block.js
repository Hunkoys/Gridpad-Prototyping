function Block() {
  const block = document.createElement('div');
  block.classList.add('block');
  block.contentEditable = true;
  // block.innerText = 'Block';
  block.id = `block-${Math.random()}`;
  block.onclick = function (e) {
    e.stopPropagation();
  };
  return block;
}

document.querySelectorAll('.page').forEach((page) => {
  page.addEventListener('click', (event) => {
    const position = [Math.floor(event.offsetX / gridSize), Math.floor(event.offsetY / gridSize)];

    for (let i = 0; i < position[1]; i++) {
      const block = Block();
      block.style.gridColumn = `1 / ${page.columns + 1}`;
      page.appendChild(block);
    }

    const block = Block();
    block.style.gridColumn = `${position[0] + 1} / ${page.columns + 1}`;
    page.appendChild(block);
    block.focus();
  });
});
