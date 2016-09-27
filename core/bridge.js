/**
 * Created by eason on 16-9-26.
 */
'use strict';

class Bridge {
    input(canvas){
        this.clear();
        for(let i of canvas){
            for(let j of i){
                this.output(j[0],j[1],j[2],j[3]);
            }
            console.log();
        }
    }

    output(char,font,bg,light){
        process.stdout.write(`\x1b[${font};${bg};${light}m${char}\x1b[0m`);
    }

    clear(){
        process.stdout.write('\x1Bc');
    }
}

module.exports = Bridge;