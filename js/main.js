function identity(name){
    return  `${name}`
}

function add(x, y){
    return x + y;
}

function sub(x, y){
    return x - y;
}
function mul(x, y){
    return x * y;
}

function identityf(arg){
    return (function(){
        return `${arg}`;
    })()
}

function addf(first){
    return function(second){
        return first + second;
    }
}

function liftf(binary){
    return function(first){
        return function(second){
            return binary(first, second);
        };
    };
}

function curry(binary, first){
    return function(second){
        return binary(first, second);
    };
}
let inc = addf(1);
    inc = curry(add, 1);

function twice(binary){
   return function(a){
       return binary(a, a);
   }
}

// function reverse(binary){
//     return function(a, b){
//         return binary(b, a);
//     }
// }

function reverse(binary){
    return (...args) => {
        return binary(...args.reverse());
    }
}

// function composeu(binary1, binary2){
//     return function(a){
//         let temp = twice(binary1)(a);
//         return twice(binary2)(temp);
//     }
// }

function composeu(f, g){
    return function(a){
        return g(f(a));
    }
}

function composeb(f, g){
    return function(a, b, c){
        return g(f(a, b), c)
    }
}

// function limit(binary, count){
//     return function (a, b){
//         if(count >= 1){
//             count -= 1;
//             return binary(a, b)
//         }
//         return undefined;
//     }
// }

function limit(binary, counter){
    return function(a, b){
        if (counter){
            counter -= 1;
            return binary(a, b);
        }
        return undefined;
    }
}

function from(start){
    return function(){
        let next = start;
        start += 1;
        return next;
    }
    
}

function to(gen, end){
    return function(counter){
        let value = gen()
        if (value < end){
            return value;
        }
        return undefined;
    }
}

function fromTo(start, end){
   return to(
    from(start),
        end
   );
}

function element(arr, gen){
    return function(){
        let index = gen();
        if(index !== undefined){
            return  arr[index];
        }
    }
}

function concat(gen1, gen2){
    let gen = gen1;
    return function(){
        let value = gen();
        if(value !== undefined){
            return value;
        }
        gen = gen2;
        return gen();
    };
}

function gensymf(sym){
    let number = 0;
    return  function(){
        number += 1;
        return prefix + number;
    }
}

function fibonacci(a, b){
    let i = 0;
    return function(){
        let next;
        switch(i){
            case 0:
                i = 1;
                return a;
            case 1:
                i = 2;
                return b;
            default:
                next = a + b;
                a = b;
                b = next;
                return next;
        }
    };
}

function fibonaccif(a, b){
    return function(){
        let next = a;
        a = b;
        b += next;

        return next;
    }
}

function fibonaccib(a, b){
    return concat(
        concat(
            limit(identityf(a), 1),
            limit(identityf(b), 1)
        ), function fibonacci(){
            let next = a + b;
            a= b;
            b = next;
            return next;
        }
    );
}

function counter(value){
    return  {
        up: function () {
            value +=1;
            return value;
        },
        down: function () {
            value -= 1;
            return value;
        }
    };
}

function revocable(binary){
    return {
        invoke: function(a, b){
            if(binary !== undefined){
                return binary(a, b);
            }
        },
        revoke: function (){
            binary = undefined;
        }
    };
}

function m(value, source){
    return {
        value: value,
        source: (typeof source === 'string')
            ? source
            : String(value)
    }
}

function addm (a, b){
    return m (a.value + b.value,
        "(" + a.source + "+" + b.source + ")");
}

function liftm(binary, op){
    return function(a, b){
        if(typeof a === 'number'){
            a = m(a)
        }
        if(typeof b === 'number'){
            b= m(b);
        }
        return m (
            binary(a.value + b.value),
             "("+a.source + op + b.source + ")"
        );
    };
}

function exp(value){
    return (Array.isArray(value))
            ? value[0](
                exp(value[1]),
                exp(value[2])
            )
            : value;
}

function addg(first){
    function more(next){
        if(next === 'undefined'){
            return first;
        }
        first += next;
        return more;
    }
    if(first !== 'undefined'){
        return more;
    }
}

function liftg(binary){
    return function(first){
        if(first === 'undefined'){
            return first;
        }
        return function more(next){
            if(next === 'undefined'){
                return first;
            }
            first = binary(first, next)
            return more;
        };
    };
}

function arrayg(first){
    let array = [];
    return function more(next){
        if(next === 'undefined'){
            return array;
        }
       array.push(next);
       return more;
    }
    return more(first);
}

// function continuize(unary){
//     return function (callback, arg){
//         return callback(unary(arg));
//     }
// }

function continuize(any){
    return function(callback, ...x){
        return callback(any(...x));
    }
}

//Better way to build a constructor

function  constructor(spec){
    let {members} =  spec;
    const {other} = other_constructor(spec);
    const method  = function(){
        //spec, member, other, method
    };
    return Object.freeze({
        method,
        other
    });
}

function vector(){
    let array = [];

    return {
        get: function get(i){
            return array[i];
        },
        store: function store(i, v){
            array[i] = v;
        },
        append: function append(v){
            array.push(v);
        }
    };
}

function pubsub(){
    let subscribers = [];
    return Object.freeze({
            subscribe: function (subscriber){
                subscribers.push(subscriber)
            },
            publish: function(publication){
                subscribers.forEach((s) => {
                    setTimeout(() => {
                        s(publication);
                    }, 0);
                });
            }
    });
}







// console.log(identity('prince'));
// console.log(add(3, 4));
// console.log(sub(3, 4));
// console.log(mul(3, 4));
// console.log(addf(3)(4));
// console.log(curry(add, 4)(3));
// console.log(inc(0)); // 1
let doubl = twice(add);
let square = twice(mul);
// console.log(doubl(11));
// console.log(square(11));
// console.log(reverse(sub)(3, 2));
// console.log(composeu(doubl, square)(5));
// console.log(composeb(add, mul)(5, 2, 3));
// let addLtd =  limit(add, 2)
//     console.log(addLtd(3, 4));
//     console.log(addLtd(3, 4));
//     console.log(addLtd(3, 4));
// let index = from(1)
// console.log(index());
// let index = to(from(1), 3);
//     console.log(index());

// console.log(fromTo(0, 3));
// console.log(fibonaccif(0, 2));
// console.log(counter(10).down());
// console.log(revocable(add).invoke(1, 2));
//             revocable(add).revoke();
// console.log(revocable(add).invoke(1, 2));
// console.log(JSON.stringify(m(12)));
let nae = [
    Math.sqrt,
    [
        add,
        [square, 3],
        [square, 4]
    ]
];
// console.log(exp(nae));
// console.log(liftg(add)(3)(4));
// console.log(arrayg(2));
let arr = vector().store(0, 1)
console.log(vector().get(0));




