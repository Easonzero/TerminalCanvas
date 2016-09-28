/**
 * Created by eason on 16-9-26.
 */
'use strict';

const Setting = require('../build/Release/core.node');

class Bridge {
    constructor(){
    }

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

    readin(callback){
        Setting.initTermianl();
        process.stdin.setEncoding('utf-8');
        process.stdin.on('data', function(chunk) {
            // var chunk = process.stdin.read();
            // if (chunk !== null) {
            //     chunk = chunk.substr(0,chunk.length-1);
                callback(chunk);
            //}
        });
    }

    clear(){
        process.stdout.write('\x1Bc');
    }
}

module.exports = Bridge;