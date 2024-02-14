class Person {
  hello() {
    return 'hello';
  }
}

const person = new Person();
const person2 = new Person();

console.log(person.hello === person2.hello);
