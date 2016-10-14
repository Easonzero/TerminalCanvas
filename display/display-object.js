/**
 * Created by eason on 16-9-27.
 */
const EventEmitter = require('events').EventEmitter;
const BgColor = require('./../define/color').BgColor;
const FontColor = require('./../define/color').FontColor;
const Light = require('./../define/color').Light;

class DisplayObject extends EventEmitter{
    constructor(width,height){
        super();
        this._x = 0;
        this._y = 0;

        this.lineStyle = [FontColor.black,BgColor.white,Light.true];
        this.fillStyle = [];

        this.visible = true;

        this.array = [];

        this.setSize(height||0,width||0);
    }

    set x(x){this._x = Math.round(x);}
    get x(){return this._x}
    set y(y){this._y = Math.round(y);}
    get y(){return this._y}

    scale(a){
        let width = Math.round(this.width*a),
            height = Math.round(this.height*a);

        this.setSize(height,width);
        let stack = [];
        let i=0;
        while(i < height){
            let j=0;
            while(j < width){
                if(this.array[i][j]!==''){
                    let char = this.array[i][j];
                    let x = j,y = i;
                    x = Math.round(a*x);
                    y = Math.round(a*y);
                    this.array[i][j]='';
                    stack.push([x,y,char]);
                }
                j++;
            }
            i++;
        }
        while(stack.length!==0){
            let ele = stack.pop();
            this.array[ele[1]][ele[0]] = ele[2];
        }
    }

    setSize(height,width){
        if(!this.height) this.height = 0;
        if(!this.width) this.width = 0;

        if(height <= this.height&&width <= this.width) return;

        let i=0;
        while(i < this.height){
            let j=this.width;
            while(j < width){
                this.array[i][j]='';
                j++;
            }
            i++;
        }

        while(i < height){
            this.array[i]=[];
            let j=0;
            while(j < width){
                this.array[i][j]='';
                j++;
            }
            i++;
        }

        this.height = Math.max(this.height,height);
        this.width = Math.max(this.width,width);
    }

    clear(){
        for(let i in this.array){
            for(let j in this.array[i]){
                this.array[i][j]='';
            }
        }
    }

    copy(o){
        for(let i in o.array){
            this.array[i] = [];
            for(let j in o.array[i]){
                this.array[i][j]=o.array[i][j];
            }
        }

        this.x = o.x;
        this.y = o.y;
        this.height = o.height;
        this.width = o.width;

        this.lineStyle = o.lineStyle;
        this.fillStyle = o.fillStyle;
        this.visible = o.visible;

        return this;
    }
}

module.exports = DisplayObject;