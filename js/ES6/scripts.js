'use strict'
//Arrow function =>
const getPrice = price => price * 2;
const getMax = (max, min) => {
    if(max >= min){
        return  max
    } else{
        return min
    };
}

//Rest and Spread Operator
// const showCategories = (productId, ...categories) => categories instanceof Array; 
// const showCategories = (productId, ...categories) => categories; 
/* Spread Operator */
let prices = [20, 21, 23];
let newArr = [...prices]
let maxPrice = Math.max(...prices);
let myArr = [...[, ,]];
let myLetterArr = ['A', [..."BCD"], "D"];


    
// console.log(getPrice(200)); //400
// console.log(typeof getPrice);  //function
// console.log(getMax(118, 119));  //119
// console.log(showCategories(123, "search", "advertising")); //True
// console.log(showCategories()); //  []
// console.log(maxPrice); //23
// console.log(newArr); //[20, 21, 23]
// console.log(myArr); //[undefined, undefined]
console.log(myLetterArr);



