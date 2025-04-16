const Calculator = require('./test.js'); // Adjust the path if necessary

// test.test.js

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('add: should return the sum of two numbers', () => {
        expect(calculator.add(5, 3)).toBe(8);
        expect(calculator.add(-5, 3)).toBe(-2);
        expect(calculator.add(0, 0)).toBe(0);
    });

    test('subtract: should return the difference of two numbers', () => {
        expect(calculator.subtract(5, 3)).toBe(2);
        expect(calculator.subtract(-5, 3)).toBe(-8);
        expect(calculator.subtract(0, 0)).toBe(0);
    });

    test('multiply: should return the product of two numbers', () => {
        expect(calculator.multiply(5, 3)).toBe(15);
        expect(calculator.multiply(-5, 3)).toBe(-15);
        expect(calculator.multiply(0, 3)).toBe(0);
    });

    test('divide: should return the quotient of two numbers', () => {
        expect(calculator.divide(6, 3)).toBe(2);
        expect(calculator.divide(-6, 3)).toBe(-2);
        expect(calculator.divide(0, 3)).toBe(0);
    });

    test('divide: should throw an error when dividing by zero', () => {
        expect(() => calculator.divide(6, 0)).toThrow('Division by zero is not allowed.');
    });
});