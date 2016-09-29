/**
 * Created by eason on 16-9-26.
 */
'use strict';
const Canvas = require('./core/canvas');
const Graphics = require('./graphics/graphics');
const BgColor = require('./define/color').BgColor;
const FontColor = require('./define/color').FontColor;


let canvas = new Canvas(33,33);
let graphics = new Graphics(11,11);
graphics.setStyle(FontColor.black,BgColor.cyan);
graphics.drawLine(0,0,10,10);
let line = graphics.toDisplayObject();
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
   canvas.render(line);
},300);