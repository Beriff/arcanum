function lex(input) {
    const tokens = [];
    let n = 0;
    let i = 0;
    
    const token = (g, t, n) => {
        return {
            value: g,
            type: t,
            precedence: n
        };
    }
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
  
  console.log(lex("2 * 2 + 4"));