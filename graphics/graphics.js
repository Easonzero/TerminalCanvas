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
        let c_x = Math.ceil(x),
            c_y = Math.ceil(y),
            f_x = Math.floor(x),
            f_y = Math.floor(y);
        if(c_x!==f_x||c_y!==f_y) {
            this.o.array[f_y][f_x] = '@R'+char.charAt(0) || '';
        }else{
            this.o.array[c_y][c_x] = char || '';
        }
    }

    drawLine(x0,y0,x,y){
        if(x<x0) {
            let term = x;
            x = x0;
            x0 = term;
        }
        if(y<y0) {
            let term = y;
            y = y0;
            y0 = term;
        }

        let _x,_y,t = (x-x0)/(y-y0);

        if(t >= 1)
            for(_x=x0;_x<=x;_x++){
                t = (_x-x0)/(x-x0);
                _y = y0+t*(y-y0);
                this.drawPoint(_x,_y,'#');
            }
        else
            for(_y=y0;_y<=y;_y++){
                t = (_y-y0)/(y-y0);
                _x = x0+t*(x-x0);
                this.drawPoint(_x,_y,'#');
            }
    }

    drawPath(points){
        let s;

        for(s=0;s<points.length-1;s++){
            this.drawLine(points[s][0],points[s][1],points[s+1][0],points[s+1][1]);
        }

        this.drawLine(points[s][0],points[s][1],points[0][0],points[0][1]);
    }

    toDisplayObject(){
        return this.o;
    }
}

module.exports = Graphics;