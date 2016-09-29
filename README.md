# TerminalCanvas
一个用于在linux终端上创建画布的node模块

###Installation
* npm install canvas-terminal [-g]

###Getting Started

```javascript
const Canvas = require('../index').Canvas;
const Graphics = require('../index').Graphics;
const BgColor = require('../index').BgColor;
const FontColor = require('../index').FontColor;


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
```
简单说明:   
`Canvas`是核心类,负责将数据渲染到terminal上.`Container`是容器类,负责承载数据.`Graphics`是绘制类,负责通过内部方法生成图像数据.

框架通常的使用流程是:
* 创建一个固定长宽的`Canvas`类实例
* 创建一个固定长宽的`Container`类实例
* 通过`Graphics`类创建出各种图像数据,并放入`Container`容器实例中
* 最后将`Container`实例交给`Canvas`实例渲染即可.

###API
####`Canvas` extends `EventEmitter`
* 属性

<table>
    <tr>
        <td>emptyGird</td>
        <td>string</td>
        <td>空格子的填充元素，格子大小按照该元素大小进行计算</td>
    </tr>
</table>

* 方法

<table>
    <tr>
        <td>constructor</td>
        <td>结构体，创建一个固定大小的渲染区间</td>
        <td>@height int 渲染区间的高度<br>@width int 渲染区间的宽度</td>
    </tr>
    <tr>
        <td>render</td>
        <td>渲染函数，将数据渲染到terminal上</td>
        <td>@display DisplayObject 需要渲染的DisplayObject</td>
    </tr>
    <tr>
        <td>setPoint</td>
        <td>直接在终端上绘制一个点的方法</td>
        <td>@x int@y int 横竖坐标，起始点在画布左上角<br>@char string 填充字符，超过单位长度会进行截取<br>@font FontColor@bg BgColor@light Light 填充风格，详见Color部分</td>
    </tr>
    <tr>
        <td>clear</td>
        <td>清屏函数</td>
        <td></td>
    </tr>
</table>

####`Container` extends `DisplayObject`
* 属性

<table>
    <tr>
        <td>children</td>
        <td>array</td>
        <td>空格子的填充元素，格子大小按照该元素大小进行计算</td>
    </tr>
</table>

* 方法

<table>
    <tr>
        <td>constructor</td>
        <td>结构体，创建一个固定大小的数据容器</td>
        <td>@height int 数据容器的高度<br>@width int 数据容器的宽度</td>
    </tr>
    <tr>
        <td>addChild</td>
        <td>添加一个子节点</td>
        <td>@child DisplayObject 子节点</td>
    </tr>
    <tr>
        <td>removeChild</td>
        <td>去除一个子节点</td>
        <td>@index int 删除子节点的序号 </td>
    </tr>
    <tr>
        <td>removeAll</td>
        <td>去除所有子节点</td>
        <td></td>
    </tr>
</table>

####`Graphics`

* 方法

<table>
    <tr>
        <td>constructor</td>
        <td>结构体，创建一个固定大小的数据容器</td>
        <td>@height int 数据容器的高度<br>@width int 数据容器的宽度</td>
    </tr>
    <tr>
        <td>setStyle</td>
        <td>设置绘制风格</td>
        <td>@font FontColor@bg BgColor@light Light 绘制风格，详见Color部分</td>
    </tr>
    <tr>
        <td>drawPoint</td>
        <td>绘制点</td>
        <td>@x int@y int 点坐标<br>@char string 绘制字符 </td>
    </tr>
    <tr>
        <td>drawLine</td>
        <td>绘制直线</td>
        <td>@x0 int@y0 int 起点坐标<br>@x int@y int 终点坐标</td>
    </tr>
    <tr>
        <td>toDisplayObject</td>
        <td>将绘制结果转成DisplayObject</td>
        <td>@RETURN DisplayObject</td>
    </tr>
</table>

####`DisplayObject` extends `EventEmitter`
* 属性

<table>
    <tr>
        <td>x</td>
        <td>int</td>
        <td>横坐标</td>
    </tr>
    <tr>
        <td>y</td>
        <td>int</td>
        <td>纵坐标</td>
    </tr>
    <tr>
        <td>fontColor</td>
        <td>FontColor</td>
        <td>字色，默认黑色</td>
    </tr>
    <tr>
        <td>bgColor</td>
        <td>BgColor</td>
        <td>背景色，默认白色</td>
    </tr>
    <tr>
        <td>light</td>
        <td>Light</td>
        <td>是否高亮，默认高亮</td>
    </tr>
    <tr>
        <td>visible</td>
        <td>boolean</td>
        <td>是否可见</td>
    </tr>
</table>

* 方法

<table>
    <tr>
        <td>constructor</td>
        <td>结构体，创建一个固定大小的数据容器</td>
        <td>@height int 数据容器的高度<br>@width int 数据容器的宽度</td>
    </tr>
    <tr>
        <td>on</td>
        <td>设置监听器</td>
        <td>@event string 监听事件,目前可以监听事件有@onKeyDown，<br>回调参数是按下的按键值<br>@callback function 回调函数</td>
    </tr>    
</table>

####`Color`
<table>
    <tr>
        <td>FontColor</td>
        <td>字色类</td>
        <td>terminal字色号映射</td>
    </tr>
    <tr>
        <td>BgColor</td>
        <td>背景色类</td>
        <td>terminal背景色号映射</td>
    </tr>
    <tr>
        <td>Light</td>
        <td>高亮类</td>
        <td>terminal高亮号映射</td>
    </tr>
</table>
