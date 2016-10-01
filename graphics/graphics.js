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
        let r_x = Math.round(x),
            r_y = Math.round(y);
        if(r_x>x) {
            this.o.array[r_y][r_x] = '@L';
        }else if(r_x<x) {
            this.o.array[r_y][r_x] = '@R';
        }else if(r_y>y) {
            this.o.array[r_y][r_x] = '@U';
        }else if(r_y<y){
            this.o.array[r_y][r_x] = '@D';
        }else{
            this.o.array[r_y][r_x] = char || '';
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