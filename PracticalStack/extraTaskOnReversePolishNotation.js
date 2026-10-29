class ReversePolishNotation {
    
    static get precedence() {
        return {
            '+': 2,
            '-': 2,
            '*': 3,
            '/': 3,
            '^': 4
        };
    }

    
    static tokenize(expression) {
        const regex = /\d+(\.\d+)?|[a-zA-Z_]\w*|[\+\-\*\/\^\(\)]/g;
        return expression.match(regex) || [];
    }

    
    static toRPN(expression) {
        const tokens = this.tokenize(expression);
        const output = [];
        const stack = [];

        for (const token of tokens) {
            if (/^\d+(\.\d+)?$/.test(token) || /^[a-zA-Z_]\w*$/.test(token)) {
                output.push(token);
            } 
            else if (token === '(') {
                stack.push(token);
            } 
            else if (token === ')') {
                while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                    output.push(stack.pop()); 
                }
                stack.pop(); 
            } 
            else if (this.precedence[token] !== undefined) {
                const currentPriority = this.precedence[token];
                
                while (
                    stack.length > 0 &&
                    stack[stack.length - 1] !== '(' &&
                    this.precedence[stack[stack.length - 1]] >= currentPriority
                ) {
                    output.push(stack.pop());
                }
                stack.push(token); 
            }
        }

        while (stack.length > 0) {
            output.push(stack.pop());
        }

        return output;
    }

    static evaluate(rpnTokens, variables = {}) {
        const stack = [];

        for (const token of rpnTokens) {
            if (/^\d+(\.\d+)?$/.test(token)) {
                stack.push(parseFloat(token));
            } 
            else if (/^[a-zA-Z_]\w*$/.test(token)) {
                if (variables[token] === undefined) {
                    throw new Error(`Значення змінної '${token}' не задано.`);
                }
                stack.push(variables[token]);
            } 
            else {
                const rightOperand = stack.pop();
                const leftOperand = stack.pop();

                switch (token) {
                    case '+': stack.push(leftOperand + rightOperand); break;
                    case '-': stack.push(leftOperand - rightOperand); break;
                    case '*': stack.push(leftOperand * rightOperand); break;
                    case '/': 
                        if (rightOperand === 0) throw new Error("Ділення на нуль!");
                        stack.push(leftOperand / rightOperand); 
                        break;
                    case '^': stack.push(Math.pow(leftOperand, rightOperand)); break;
                    default: throw new Error(`Невідомий оператор: ${token}`);
                }
            }
        }

        return stack[0];
    }
}

const mathExpr = "3 + 4 * 2 / ( 1 - 5 ) ^ 2";
const mathRpn = ReversePolishNotation.toRPN(mathExpr);
console.log("Вираз: ", mathExpr);
console.log("ЗПЗ: ", mathRpn.join(' '));
console.log("Результат: ", ReversePolishNotation.evaluate(mathRpn));