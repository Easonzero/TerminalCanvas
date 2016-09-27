/**
 * Created by eason on 16-9-27.
 */
let DisplayObject = require('./display-object');

class Container extends DisplayObject{
    constructor(height,width){
        this.height = height;
        this.width = width;
        this.children = [];
    }
    get children(){}
    set children(children){
        if(children.length!==0)
            return;
    }

    addChild(child){
        if(!child) return;
        this.children.push(child);
    }

    removeChild(index){
        this.children.splice(index, 1);
    }

    removeAll(){
        this.children.length = 0;
    }
}

module.export = Container;