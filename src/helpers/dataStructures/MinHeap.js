const MAX = 1000000;
class MinHeap {
  constructor(len) {
    this.size = len;
    this.heap = [];
    this.indexOf = [];

    for (var i = 0; i < len; i++) {
      this.heap.push([MAX, i]);
      this.indexOf.push(i);
    }
  }

  swap = (ind1, ind2) => {
    this.indexOf[this.heap[ind1][1]] = ind2;
    this.indexOf[this.heap[ind2][1]] = ind1;

    const tmp = this.heap[ind1];
    this.heap[ind1] = this.heap[ind2];
    this.heap[ind2] = tmp;
  };

  parent = (ind) => {
    return Math.floor((ind - 1) / 2);
  };

  decreaseKey = (vertex, val) => {
    let index = this.indexOf[vertex];
    if (this.heap[index][0] <= val) return false;

    this.heap[index][0] = val;

    while (
      index !== 0 &&
      this.heap[index][0] < this.heap[this.parent(index)][0]
    ) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }

    return true;
  };

  extractMin = () => {
    if (this.size <= 0) return null;
    if (this.size == 1) {
      this.size = 0;
      this.indexOf[this.heap[0][1]] = -1;
      return this.heap[0][1];
    }

    const minElement = this.heap[0][1];
    this.indexOf[minElement] = -1;

    this.heap[0] = this.heap[this.size - 1];
    this.indexOf[this.heap[0][1]] = 0;

    this.size--;
    this.minHeapify(0);

    return minElement;
  };

  minHeapify = (par) => {
    const left = 2 * par + 1;
    const right = 2 * par + 2;
    let smallest = par;

    if (left < this.size && this.heap[left][0] < this.heap[smallest][0])
      smallest = left;
    if (right < this.size && this.heap[right][0] < this.heap[smallest][0])
      smallest = right;

    if (smallest != par) {
      this.swap(par, smallest);
      this.minHeapify(smallest);
    }
  };

  isEmpty = () => {
    if (this.size == 0) return true;
    else return false;
  };

  isPresent = (vertex) => {
    if (this.indexOf[vertex] === -1) return false;
    return true;
  };

  getMinValue = () => {
    return this.heap[0][0];
  };
}

export default MinHeap;
