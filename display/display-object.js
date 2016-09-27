/**
 * Created by eason on 16-9-27.
 */
class DisplayObject{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.visible = true;
        this.array = [];
    }

    set parent(parent){}
    get parent(){}

    set visible(visible){};
    get visible(){};

    set x(x){}
    get x(){}

    set y(y){}
    get y(){}
}

module.export = DisplayObject;