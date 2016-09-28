/**
 * Created by eason on 16-9-27.
 */
const DisplayObject = require('../display/display-object');
class Graphics {
    constructor(height,width){
        this.o = new DisplayObject(height,width);
    }
    setStyle(font,bg,light){
        this.font = font;
        this.bg = bg;
        this.light = light;
    }

    drawPoint(x,y,char){
        this.o.array[y][x] = char;
    }

    drawLine(x0,y0,x,y){

    }

    toDisplayObject(){
        return this.o;
    }
}

module.export = Graphics;