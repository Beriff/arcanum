const token = (g, t, n) => {
    return {
        value: g,
        type: t,
        precedence: n,
        state: false
    };
}
const precedence = (g) => {
    const p = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "^": 3
    }
    const n = p[g];
    
    return n === undefined ? 0 : n;
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
        
        while(f(input[j])) {
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
            type: "operation",
            left: l,
            right: r,
            state: true
        }
    }
    const enclose = (g, n, e, b, f) => {
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

        return n - 1;
    }

    let n = next(input);

    while(n !== -1) {
        const e = input[n];
        const bck = input[n - 1];
        const frw = input[n + 1];

        if(e.type === "symbol") n = enclose(input, n, e, bck, frw);
        
        input[n].state = true;
        n = next(input);
    }

    return input;
}

function solve(equation, unknown, side) {
    const otherSide = () => Math.abs(side - 1);
}

function previewTree(tree) {
    if(tree.type === "operation") { console.log(tree.value); previewTree(tree.left); previewTree(tree.right) }
    else console.log(tree);
}

console.log(parse(lex("2 * (3 + 5"))[0]);
