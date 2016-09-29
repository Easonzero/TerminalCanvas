/**
 * Created by eason on 16-9-29.
 */
const Canvas = require('./core/canvas');
const Container = require('./display/container');
const Graphics = require('./graphics/graphics');
const BgColor = require('./define/color').BgColor;
const FontColor = require('./define/color').FontColor;
const Light = require('./define/color').Light;

let TC = {};
TC.Canvas = Canvas;
TC.Container = Container;
TC.Graphics = Graphics;
/*-----define-----*/
TC.BgColor = BgColor;
TC.FontColor = FontColor;
TC.Light = Light;

module.exports = TC;