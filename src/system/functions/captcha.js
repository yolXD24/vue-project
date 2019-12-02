num1 = Math.ceil(Math.random() * 10);
num2 = Math.ceil(Math.random() * 10);
ops = ["+", "-", "*"][Math.ceil(Math.random() * 3)];
equation = `${a}${ops}${b}`;
ans = eval(equation);
console.log(ans);