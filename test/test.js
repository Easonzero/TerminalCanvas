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
let container = new Container();

let graphics = new Graphics();

graphics.setLineStyle(FontColor.black,BgColor.cyan);
graphics.setFillStyle(FontColor.white,BgColor.black);
graphics.drawPath([
    [5,1],[7,1]
]);
let line = graphics.toDisplayObject();

graphics.clear();

graphics.setLineStyle(FontColor.black,BgColor.cyan);
graphics.drawCycle(10,10,9,' ',true);
let cycle = graphics.toDisplayObject();

container.addChild(cycle);
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
        case 'z':
            line.scale(2);
            break;

    }
});

cycle.x = 10;
cycle.y = 10;

setInterval(()=>{
     canvas.render(container);
},200);
