class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);
  }

  makeSet = (x) => {
    this.parent[x] = x;
    this.rank[x] = 0;
  };

  find = (x) => {
    while (x !== this.parent[x]) {
      x = this.parent[x];
    }
    return x;
  };

  union = (x, y) => {
    const headx = this.find(x);
    const heady = this.find(y);

    if (headx === heady) return false;
    else if (this.rank[headx] > this.rank[heady]) this.parent[heady] = headx;
    else this.parent[headx] = heady;

    if (this.rank[headx] === this.rank[heady])
      this.rank[heady] = this.rank[heady] + 1;

    return true;
  };
}

export default UnionFind;
