/**
 * Created by eason on 16-9-26.
 */
'use strict';
const EventEmitter = require('events').EventEmitter;
const {BgColor,FontColor,Light} = require('../define/color');
const Bridge = require('./bridge');

class Canvas extends EventEmitter{
    constructor(height,width){
        super();
        this.canvas = [];
        this.emptyGird = '  ';
        this.bridge = new Bridge();

        this.clear(height,width);

        this.on('onKeyDown',(chunk)=>{
            let queue = [];
            queue.unshift(this.display);
            while(queue.length!==0){
                let ele = queue.pop();
                ele.emit('onKeyDown',chunk);
                if(!ele.children||ele.children.length===0) continue;
                for(let i in ele.children){
                    queue.unshift(ele.children[i]);
                }
            }
        });
        this.bridge.readin((chunk)=>{
            this.emit('onKeyDown',chunk);
        });
    }

    clear(height,width){
        for(let i=0;i<height;i++){
            this.canvas[i]=[];
            for(let j=0;j<width;j++){
                this.canvas[i][j]=[this.emptyGird,FontColor.black,BgColor.white,Light.true];
            }
        }
    }

    setPoint(x,y,char,style){
        if(x>this.canvas[0].length-1||y>this.canvas.length-1) return;
        let result = '',
            font = style[0][0],
            bg = style[0][1],
            light = style[0][2];
        char += '';
        if(char.charAt(0)=='@') {
            let gird='';
            for(let i=0;i<this.emptyGird.length-1;i++){
                gird += ' ';
            }
            switch (char.charAt(1)){
                case 'L':
                    result = '|'+gird;
                    break;
                case 'R':
                    result = gird+'\\';
                    break;
                case 'U':
                    result = '`'+gird;
                    break;
                case 'D':
                    result = '_'+gird;
                    break;
                case 'B':
                    result = gird+' ';
                    font = style[1][0];
                    bg = style[1][1];
                    light = style[1][2];
                    break;
            }
        }
        else if(char.length>this.emptyGird.length) result = char.substr(0,this.emptyGird.length);
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
        this.clear(this.canvas.length,this.canvas[0].length);
        if(this.display !== display)  this.display = display;
        if(!display.visible) return;
        let queue = [];
        queue.unshift(display);
        while(queue.length!==0){
            let ele = queue.pop();
            let i = 0;
            while(i < ele.array.length){
                if(ele.y+i+1 > this.canvas.length) break;
                if(ele.y+i < 0) {
                    i++;
                    continue;
                }
                let j = 0;
                while(j < ele.array[i].length){
                    if(ele.x+j+1 > this.canvas[0].length) break;
                    if(ele.x+j < 0||ele.array[i][j]=='') {
                        j++;
                        continue;
                    }
                    this.setPoint(ele.x + j,ele.y + i,ele.array[i][j],[ele.lineStyle,ele.fillStyle]);
                    j++;
                }
                i++;
            }
            if(!ele.children) continue;
            for(let i in ele.children){
                queue.unshift(ele.children[i]);
            }
        }

        this.bridge.input(this.canvas);
    }
}

module.exports = Canvas;
