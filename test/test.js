/**
 * Created by eason on 16-9-26.
 */
'use strict';
const Canvas = require('../index').Canvas;
const Container = require('../index').Container;
const Graphics = require('../index').Graphics;
const BgColor = require('../index').BgColor;
const FontColor = require('../index').FontColor;


let canvas = new Canvas(33,33);
let container = new Container(33,33);

let graphics = new Graphics(11,11);
graphics.setStyle(FontColor.black,BgColor.cyan);
graphics.drawPath([
    [3,9],[4,5]
]);

let line = graphics.toDisplayObject();
container.addChild(line);

line.x = 1;
line.y = 1;
line.on('onKeyDown',(key)=>{
    switch (key){
        case 'w':
            line.y--;
            break;
        case 'a':
            line.x--;
            break;
        case 's':
            line.y++;
            break;
        case 'd':
            line.x++;
            break;

    }
});

setInterval(()=>{
    canvas.render(container);
},200);