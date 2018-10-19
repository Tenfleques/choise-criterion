let fs = require("fs");
let inputFile = "resources/variant_4.prn";
let variantsTest = [
    [3, 1, 1],
    [3, 1, 0],
    [1, 1, 3],
    [2, 1, 3],
    [3, 2, 1],
    [2, 2, 2],
    [3, 2, 2],
    [1, 2, 3]
]


if (!Array.prototype.last){
    Array.prototype.last = function () {
        return this[this.length -1];
    };
}

function vectorMin(a,b){
    let cc = 0;
    for(var i = 0; i < a.length; ++i){
        if(a[i] > b[i])
            return 0;
        if(a[i] === b[i])
            cc += 1;
    }
    if(cc == a.length){
        return 0;
    }
    return 1;
}
function Pareto(){
    let variants = arguments[0].map(a => a.concat([1]));
    for(var i in variants){
        if(typeof(variants[i]) == typeof([]) && variants[i].last() == 1){
            for(var j in variants){
                if(i != j && typeof(variants[j]) == typeof([]) && variants[j].last() == 1){
                    if(vectorMin(variants[i], variants[j]))
                        variants[j][variants[j].length - 1] = 0;
                }
            }
        }        
    }
    return variants.filter(a => a[a.length - 1] == 1);
}

//читение исходные данные
let readline = require('readline'),
        instream = fs.createReadStream(inputFile),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);
let variants = [];

rl.on('line', function (line) {
    l = line.replace(/      /g,","); 
    variants.push(l.split(",").slice(1,4).map(a => {
        res = a.trim()
        return parseInt(res)
    }));
});
rl.on('close', function(){
    //Pareto(variants).map(a => console.log(a));
})

//console.log(variants);
//console.log("Ответ");
Pareto(variantsTest).map(a => console.log(a));

