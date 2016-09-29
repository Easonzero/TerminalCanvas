/**
 * Created by eason on 16-9-27.
 */
const DisplayObject = require('../display/display-object');
const BgColor = require('./../define/color').BgColor;
const FontColor = require('./../define/color').FontColor;
const Light = require('./../define/color').Light;

class Graphics {
    constructor(height,width){
        this.o = new DisplayObject(height,width);
    }
    setStyle(font,bg,light){
        this.font = font||FontColor.black;
        this.bg = bg||BgColor.white;
        this.light = light||Light.true;
    }

    drawPoint(x,y,char){
        this.o.array[y][x] = char||'';
    }

    drawLine(x0,y0,x,y){
        let _y,t;

        for(let _x=x0;_x<x;_x++){
            t = (_x-x0)/(x-x0);
            _y = y0+t*(y-y0);
            this.drawPoint(_x,_y,'#');
        }
    }

    toDisplayObject(){
        return this.o;
    }
}

module.exports = Graphics;