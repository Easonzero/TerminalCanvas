/**
 * Created by eason on 16-9-26.
 */
'use strict';
const Canvas = require('./core/canvas');
const DisplayObject = require('./display/display-object');
const BgColor = require('./define/color').BgColor;

let canvas = new Canvas(5,10);

let object = new DisplayObject(2,2);
object.x = 1;
object.y = 1;
object.bgColor = BgColor.cyan;

canvas.render(object);