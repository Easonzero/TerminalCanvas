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

let graphics = new Graphics(33,33);

graphics.setStyle(FontColor.black,BgColor.cyan);
graphics.drawPath([
    [5,1],[7,1]
]);
let line = graphics.toDisplayObject();

graphics.clear();

graphics.setLineStyle(FontColor.black,BgColor.cyan);
graphics.drawCycle(10,10,9);
let cycle = graphics.toDisplayObject();

container.addChild(line);
container.addChild(cycle);

line.x = 1;
line.y = 1;
line.on('onKeyDown',(key)=>{
    switch (key){
        case 'w':
	        line.scale(2);
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

cycle.x = 10;
cycle.y = 10;

setInterval(()=>{
     canvas.render(container);
},200);
