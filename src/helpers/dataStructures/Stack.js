// Stack class
class Stack {
  constructor() {
    this.items = [];
  }

  elements = () => {
    return this.items;
  };

  push = (element) => {
    console.log("push", element);
    this.items.push(element);
  };
  pop = () => {
    if (this.items.length === 0) return "Underflow";
    return this.items.pop();
  };

  top = () => {
    return this.items[this.items.length - 1];
  };

  isEmpty = () => {
    return this.items.length === 0;
  };
}

export default Stack;
