import Page from './app/page/page';
import './style.css';

const app = document.getElementById('app');

const page1 = Page(800, 1100);

// const block1 = Block();

// moveBlock(block1, page1, 0, 0);
// moveBlock(block1, null, 0, 0);

app.appendChild(page1.el);
