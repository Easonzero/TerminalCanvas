/**
 * Created by eason on 16-9-27.
 */
const DisplayObject = require('../display/display-object');
const {BgColor,FontColor,Light} = require('../define/color');

class Graphics {
    constructor(){
        this.o = new DisplayObject();
    }

    setLineStyle(font,bg,light){
        this.o.lineStyle = [font||FontColor.black,bg||BgColor.white,light||Light.true];
    }

    setFillStyle(font,bg,light){
        this.o.fillStyle = [font||FontColor.black,bg||BgColor.white,light||Light.true];
    }

    drawPoint(x,y,char,isFill){
        let r_x = Math.round(x),
            r_y = Math.round(y);

        this.o.setSize(r_y+1,r_x+1);

        if(isFill){
            this.o.array[r_y][r_x] = '@B';
        }
        else if(r_x>x) {
            this.o.array[r_y][r_x] = '@L';
        }else if(r_x<x) {
            this.o.array[r_y][r_x] = '@R';
        }else if(r_y>y) {
            this.o.array[r_y][r_x] = '@U';
        }else if(r_y<y){
            this.o.array[r_y][r_x] = '@D';
        }else{
            this.o.array[r_y][r_x] = char || '#';
        }
    }

    drawLine(x0,y0,x,y,char){
        if(x<x0) {
            let term = x;
            x = x0;
            x0 = term;
        }
        if(y<y0) {
            let term = y;
            y = y0;
            y0 = term;
        }

        let _x,_y,t = (x-x0)/(y-y0);

        if(t >= 1)
            for(_x=x0;_x<=x;_x++){
                t = (_x-x0)/(x-x0);
                _y = y0+t*(y-y0);
                this.drawPoint(_x,_y,char);
            }
        else
            for(_y=y0;_y<=y;_y++){
                t = (_y-y0)/(y-y0);
                _x = x0+t*(x-x0);
                this.drawPoint(_x,_y,char);
            }
    }

    drawCycle(xc,yc,r,char,isFill){
        let x = 0,
            y = r,
            d = -r/2;
        this.circlePlot(xc,yc,x,y,char,isFill);
        if(r%2===0){
            while(x<y){
                x++;
                if(d<0) d+=x;
                else{
                    y--;
                    d+=x-y;
                }
                this.circlePlot(xc,yc,x,y,char,isFill);
            }

        }else{
            while(x<y){
                x++;
                if(d<0) d+=x+1;
                else{
                    y--;
                    d+=x-y+1;
                }
                this.circlePlot(xc,yc,x,y,char,isFill);
            }
        }
    }

    drawRectangle(x,y,width,height,char,isFill){
        this.drawLine(x,y,x+width-1,y,char);
        this.drawLine(x,y,x,y+height-1,char);
        this.drawLine(x+width-1,y,x+width-1,y+height-1,char);
        this.drawLine(x,y+height-1,x+width-1,y+height-1,char);

        if(isFill){
            for(let i=y+1;i<y+height-1;i++){
                for(let j=x+1;j<x+width-1;j++){
                    this.drawPoint(j,i,char,isFill);
                }
            }
        }
    }

    circlePlot(xc,yc,x,y,char,isFill){
        this.drawPoint(xc+x,yc+y,char);
        this.drawPoint(xc-x,yc-y,char);
        this.drawPoint(xc+x,yc-y,char);
        this.drawPoint(xc-x,yc+y,char);
        this.drawPoint(xc+y,yc+x,char);
        this.drawPoint(xc-y,yc-x,char);
        this.drawPoint(xc+y,yc-x,char);
        this.drawPoint(xc-y,yc+x,char);

        if(isFill){
            for(let i=x-1;i>-x;i--){
                this.drawPoint(xc+i,yc+y-1,char,isFill);
                this.drawPoint(xc+i,yc-y+1,char,isFill);
                this.drawPoint(xc+y-1,yc+i,char,isFill);
                this.drawPoint(xc-y+1,yc+i,char,isFill);
            }
            for(let i=y-1;i>-y;i--){
                this.drawPoint(xc+i,yc+x-1,char,isFill);
                this.drawPoint(xc+i,yc-x+1,char,isFill);
                this.drawPoint(xc+x,yc+i,char,isFill);
                this.drawPoint(xc-x,yc+i,char,isFill);
            }
        }
    }

    drawPath(points){
        let s;

        for(s=0;s<points.length-1;s++){
            this.drawLine(points[s][0],points[s][1],points[s+1][0],points[s+1][1]);
        }

        this.drawLine(points[s][0],points[s][1],points[0][0],points[0][1]);
    }

    clear(){
        this.o.clear();
    }

    toDisplayObject(){
        return new DisplayObject(0,0).copy(this.o);
    }
}

module.exports = Graphics;
