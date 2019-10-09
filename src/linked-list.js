const Node = require('./node');

class LinkedList {
    constructor() {
        this.t = null;
        this._tail = this.t;
        this.h = null;
        this._head = this.h;
        this.length = 0;
    }

    append(data) {
        let n = new Node(data);
        if(this.h === null){
            this.h = n;
            this._head = this.h;
            this.t = n;
            this._tail = this.t;
        }
        else {
            n.prev = this.t;
            this.t.next = n;
            this.t = n;
            this._tail = this.t;
        }
        this.length++;
        return this;
    }

    head() {
        if(this.length !== 0) {
            return this.h.data;
        }
        else {
            return null;
        }
    }

    tail() {
        if(this.length !== 0) {
            return this.t.data;
        }
        else {
            return null;
        }
    }

    at(index) {
        if(index === 0){
            return this.h.data;
        }
        let cur = this.h;
        if(this.length >= index){
            for(let i = 0;i !== index; i++){
                cur = cur.next;
            }
        }
        return cur.data;
    }

    insertAt(index, data) {
        if(this.h === null && index === 0){
            this.h = new Node(data);
            this._head = this.h;
            this.t = this.h;
            this._tail = this.t;
            return this;
        }
        let cur = this.h;
        let n = new Node( data );
        if(index === 0) {
            this.h.prev = n;
            n.next = this.h;
            this.h = n;
            this._head = this.h;
        }
        else {
            let i = 1;
            while(cur) {
                cur = cur.next;
                if( i === index ) {
                    n.prev = cur.prev;
                    cur.prev.next = n;
                    n.next = cur;
                    cur.prev = n;
                }
                i++;
            }
        }
        return this;
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this.h = null;
        this._head = this.h;
        this.t = null;
        this._tail = this.t;
        this.length = 0;
        return this;
    }

    deleteAt(index) {
        let cur = this.h;
        let count = 1;
        if( index === 0 && this.length > 1) {
            this.h = this.h.next;
            this._head = this.h;
            this.h.prev = null;
        }
        if( index === 0 && this.length < 1) {
            this.clear();
            return this;
        }
        else {
            while( cur ) {
                cur = cur.next;
                if ( cur === this.t ) {
                    this.t = this.t.prev;
                    this._tail = this.t;
                    this.t.next = null;
                }
                else if( count === index ) {
                    cur.prev.next = cur.next;
                    cur.next.prev = cur.prev;
                    break;
                }
                count++;
            }
        }
        return this;
    }

    reverse() {
        if(this.length < 2){
            return this;
        }
        let cur = this.h;
        let p = null;
        while( cur ){
            let next = cur.next;
            cur.next = p;
            cur.prev = next;
            p = cur;
            cur = next;
        }
        this.t = this.h;
        this._tail = this.t;
        this.h = p;
        this._head = this.h;
        return this;
    }

    indexOf(data) {
        let cur = this.h;
        for(let i = 0; i < this.length; i++){
            if (cur.data === data) {
                return i;
            }
            cur = cur.next;
        }
        return -1;
    }
}

module.exports = LinkedList;
