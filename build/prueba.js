"use strict";
let obj = {};
let a = 'asd';
let b = 'dsa';
//@ts-ignore
obj[a] = b;
console.log({
    where: Object.assign({}, obj),
});
