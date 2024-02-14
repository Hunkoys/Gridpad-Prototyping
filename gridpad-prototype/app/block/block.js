import './block.scss';

export default function Block() {
  const block = document.createElement('div');
  block.className = 'block';

  // block.classList.add('block-free');

  return block;
}
