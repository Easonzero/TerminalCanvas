/**
 * Created by eason on 16-9-27.
 */
let DisplayObject = require('./display-object');

class Container extends DisplayObject{
    constructor(height,width){
        super(height,width);
        this.children = [];
    }

    addChild(child){
        if(!child) return;
        this.children.push(child);
        child.parent = this;
    }

    addChildren(children){
        for(let child of children){
            this.children.push(child);
            child.parent = this;
        }
    }

    removeChild(index){
        this.children.splice(index, 1);
    }

    removeAll(){
        this.children.length = 0;
    }
}

module.exports = Container;