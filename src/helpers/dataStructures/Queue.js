class Queue {
    constructor() {
        this.items = [];
    }

    empty = () => {
        return this.items.length == 0;

    }

    enqueue = (el) => {
        this.items.push(el)
    }

    dequeue = () => {
        if (this.empty()) {
            return null;
        }

        return this.items.shift();
    }

    front = () => {
        if (this.empty()) {
            return null;
        }

        return this.items[0];
    }
}

export default Queue;