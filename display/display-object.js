/**
 * Created by eason on 16-9-27.
 */
const EventEmitter = require('events').EventEmitter;
const BgColor = require('./../define/color').BgColor;
const FontColor = require('./../define/color').FontColor;
const Light = require('./../define/color').Light;

class DisplayObject extends EventEmitter{
    constructor(height,width){
        super();
        this.x = 0;
        this.y = 0;

        this.fontColor = FontColor.black;
        this.bgColor = BgColor.white;
        this.light = Light.true;

        this.visible = true;

        this.array = [];

        let i=0;

        while(i < height){
            this.array[i]=[];
            let j=0;
            while(j < width){
                this.array[i][j]='';
                j++;
            }
            i++;
        }
    }
}

module.exports = DisplayObject;