/**
 * Created by eason on 16-9-26.
 */
'use strict';
const BgColor = require('./color').BgColor;
const FontColor = require('./color').FontColor;
const Light = require('./color').Light;
const Bridge = require('./bridge');

class Canvas {
    constructor(height,width){
        this.canvas = [];
        this.emptyGird = '  ';
        this.bridge = new Bridge();
        for(let i=0;i<height;i++){
            this.canvas[i]=[];
            for(let j=0;j<width;j++){
                this.canvas[i][j]=[this.emptyGird,FontColor.black,BgColor.white,Light.true];
            }
        }
    }

    setPoint(x,y,char,font,bg,light){
        if(x>this.canvas[0].length-1||y>this.canvas.length-1) return;
        let result = '';
        char += '';
        if(char.length>this.emptyGird.length) char.length=this.emptyGird.length;
        else{
            let left='',right='';
            for(let i=0;i<this.emptyGird.length-char.length;i++){
                i%2===0?(right+=' '):(left+=' ');
            }
            result = left + char + right;
        }

        this.canvas[y][x][0]=result;
        this.canvas[y][x][1]=font;
        this.canvas[y][x][2]=bg;
        this.canvas[y][x][3]=light;
    }

    draw(){
        setInterval((o)=>{
            this.setPoint(o.v%this.canvas[0].length==0?this.canvas[0].length-1:o.v%this.canvas[0].length-1,0,'  ',FontColor.black,BgColor.white,Light.true);
            this.setPoint(o.v%this.canvas[0].length,0,'  ',FontColor.white,BgColor.black,Light.true);
            o.v++;
            this.bridge.input(this.canvas);
        },1000,{v:0});
    }
}

module.exports = Canvas;