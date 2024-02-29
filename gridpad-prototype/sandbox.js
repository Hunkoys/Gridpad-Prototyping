let l = [];

const con = {
  add: (block) => {
    l.push(block);
    block.con = con;
  },
  remove: (block) => {
    l = l.filter((b) => b !== block);
    block.con = null;
  },
};

class Block {}

const b1 = new Block();

con.add(b1);
con; //?

b1.con?.remove(b1); //?
