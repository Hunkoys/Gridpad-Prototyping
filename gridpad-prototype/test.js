class Dog {
  color = ['brown'];
}

const rex = new Dog(); //?
const max = new Dog(); //?

rex.color.push('black');

console.log(rex.color === max.color);

max.color; //?
