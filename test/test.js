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

let graphics = new Graphics();//创建绘图类Graphics

//绘制一条线
graphics.setLineStyle(FontColor.black,BgColor.cyan);
graphics.setFillStyle(FontColor.white,BgColor.black);
graphics.drawPath([
    [5,1],[7,7]
]);
let line = graphics.toDisplayObject();

graphics.clear();//清除绘制缓存，准备下次绘制

//绘制一个圆
graphics.setLineStyle(FontColor.black,BgColor.cyan);
graphics.drawCycle(10,10,9,' ',true);
let cycle = graphics.toDisplayObject();

//将线和圆放入container容器中
container.addChild(cycle);
container.addChild(line);

//初始化线和圆的位置
line.x = 1;
line.y = 1;
cycle.x = 10;
cycle.y = 10;

//初始化线的事件响应
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
        case 'z':
            line.scale(2);
            break;

    }
});

//初始化渲染循环
setInterval(()=>{
    canvas.render(container);
},200);
