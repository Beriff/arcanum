const token = (g, t, n) => {
    return {
        value: g,
        type: t,
        precedence: n,
        state: false
    };
}
const precedence = g => {
    const p = new Map();

    p.set("=", 5);
    p.set("+-", 10);
    p.set("+", 10);
    p.set("-", 10);
    p.set("*", 20);
    p.set("/", 20);
    p.set("^", 30);

    return p.has(g) ? p.get(g) : 0;
}
const branch2 = (v, t) => {
    return {
        value: v,
        type: t,
        left: { type: null },
        right: { type: null }
    };
};
const opt = {
    "+": "cal",
    "-": "cal",
    "*": "cal",
    "/": "cal",
    "^": "cal",
    "=": "one of its kind"
}

function lex(input) {
    const tokens = [];
    let n = 0;
    let i = 0;
    
    const isNumber = g => /\d/.test(g);
    const isSymbol = g => /[^\w\s(){}\[\]]/g.test(g);
    const isIdentifier = g => /[a-zA-Z]/g.test(g);
    const isOpenParen = (g) => /[([{]/g.test(g);
    const isCloseParen = (g) => /[)\]}]/g.test(g);
    const advance = (j, f) => {
        let total = "";
        
        while(f(input[j]) && j < input.length) {
            total = total + input[j];
            j++;
        }
        
        return [j, total];
    }
    
    while(i < input.length) {
        const char = input[i];
        
        if(isNumber(char)) {
            const a = advance(i, isNumber);
            
            tokens.push(token(Number(a[1]), "number", n));
            
            i = a[0] - 1;
        }
        if(isSymbol(char)) {
            const a = advance(i, isSymbol);
            
            tokens.push(token(a[1], "symbol", n + precedence(a[1])));

            i = a[0] - 1;
        }
        if(isIdentifier(char)) {
            const a = advance(i, isIdentifier);
            
            tokens.push(token(a[1], "identifier", n));

            i = a[0] - 1;
        }
        if(isOpenParen(char)) {
            const a = advance(i, isOpenParen);
            
            n = n + a[1].length * 100;

            i = a[0] - 1;
        }
        if(isCloseParen(char)) {
            const a = advance(i, isCloseParen);
            
            n = n - a[1].length * 100;

            i = a[0] - 1;
        }
        
        i++;
    }

    return tokens;
}

function parse(input) {
    const next = g => {
        let max = -1;

        for(let i in g) {
            if((max === -1 || g[i].precedence > g[max].precedence) && !g[i].state) {
                max = i;
            }
        }
        
        return Number(max);
    }
    const branch = (g, l, r) => {
        if(l === undefined) l = { type: null };
        else { delete l.state; delete l.precedence }
        if(r === undefined) r = { type: null };
        else { delete r.state; delete r.precedence }

        return {
            value: g.value,
            type: g.type === "symbol" ? "operation" : g.type,
            left: l,
            right: r,
            state: true
        };
    }
    const enclose = (g, n, e, b, f) => {
        if(e.type === "symbol") {
            g[n] = branch(e, b, f);
                    
            let d = false;

            if(b !== undefined) {
                input.splice(n - 1, 1);
                d = true;
            }
            if(f !== undefined) {
                if(!d) input.splice(n + 1, 1);
                else input.splice(n, 1);
            }

            return d ? n - 1 : n;
        } else {
            g[n] = branch(e, undefined, undefined);

            return n;
        }
    }

    let n = next(input);

    while(n !== -1) {
        const e = input[n];
        const bck = input[n - 1];
        const frw = input[n + 1];

        n = enclose(input, n, e, bck, frw);
        
        input[n].state = true;
        n = next(input);
    }

    return input;
}

function solve(equation, mem) {
    let left = equation.left;
    let right = equation.right;

    if(left.type === "operation") left = solve(left, mem);
    if(right.type === "operation") right = solve(right, mem);

    equation.left = left;
    equation.right = right;

    if(equation.type === "operation") {
        let lv = left.value;
        let rv = right.value;

        if(lv === undefined) lv = 0;
        if(rv === undefined) rv = 0;

        if(opt[equation.value] === "cal") {
            if(left.type === "identifier") lv = mem[lv].value;
            if(right.type === "identifier") rv = mem[rv].value;
        }
        if(opt[equation.value] === "one of its kind") {
            if(right.type === "identifier") rv = mem[rv].value;
        }

        if(equation.value === "+") equation = branch2(lv + rv, "number");
        if(equation.value === "-") equation = branch2(lv - rv, "number");
        if(equation.value === "*") equation = branch2(lv * rv, "number");
        if(equation.value === "/") equation = branch2(lv / rv, "number");
        if(equation.value === "^") equation = branch2(lv ** rv, "number");
        if(equation.value === "+-") equation = branch2([lv + rv, lv - rv,], "array");
        //console.log(equation);
        if(equation.value === "=") {
            //console.log(equation, lv, rv);
            mem[lv] = {
                value: rv,
                type: right.type
            }
            equation = right;
        }
    }

    return equation;
}

function previewTree(tree) {
    if(tree.type === "operation") { console.log(tree.value); previewTree(tree.left); previewTree(tree.right) }
    else console.log(tree);
}

const equ = "y = x + 3";
const mem = {
    x: {
        value: 1,
        type: "number"
    }
};

//console.log(parse(lex(equ))[0]);
console.log(solve(parse(lex(equ))[0], mem));
console.log(mem);
