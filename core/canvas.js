/**
 * Created by eason on 16-9-26.
 */
'use strict';
const BgColor = require('./../define/color').BgColor;
const FontColor = require('./../define/color').FontColor;
const Light = require('./../define/color').Light;
const Bridge = require('./bridge');

class Canvas extends EventEmitter{
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
        this.bridge.readin((chunk)=>{
            this.emit('onKeyDown',chunk);
        });
    }

    setPoint(x,y,char,font,bg,light){
        if(x>this.canvas[0].length-1||y>this.canvas.length-1) return;
        let result = '';
        char += '';
        if(char.length>this.emptyGird.length) result = char.substr(0,this.emptyGird.length);
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

    render(display){
        if(!display.visible) return;
        let queue = [];
        queue.unshift(display);
        while(queue.length!==0){
            let ele = queue.pop();
            let i = 0;
            while(i < ele.array.length){
                let j = 0;
                while(j < ele.array[i].length){
                    this.setPoint(ele.x + j,ele.y + i,ele.array[i][j],ele.fontColor,ele.bgColor,ele.light);
                    j++;
                }
                i++;
            }
            if(!display.children||display.children.length===0) break;
            for(let i in display.children){
                queue.unshift(display.children[i]);
            }
        }
        this.bridge.input(this.canvas);
    }
}

module.exports = Canvas;