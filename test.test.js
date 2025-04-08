const Calculator = require('./test.js').Calculator;
const main = require('./test.js').main;

// filepath: /workspaces/skills-copilot-codespaces-vscode/test.test.js

jest.mock('prompt-sync', () => {
    return jest.fn(() => jest.fn());
});

describe('Calculator Main Function', () => {
    let promptMock;
    let consoleLogMock;

    beforeEach(() => {
        promptMock = require('prompt-sync')();
        consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should add two numbers correctly', () => {
        promptMock
            .mockReturnValueOnce('1') // Choice: Add
            .mockReturnValueOnce('5') // First number
            .mockReturnValueOnce('3') // Second number
            .mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Result: 8');
    });

    test('should subtract two numbers correctly', () => {
        promptMock
            .mockReturnValueOnce('2') // Choice: Subtract
            .mockReturnValueOnce('10') // First number
            .mockReturnValueOnce('4') // Second number
            .mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Result: 6');
    });

    test('should multiply two numbers correctly', () => {
        promptMock
            .mockReturnValueOnce('3') // Choice: Multiply
            .mockReturnValueOnce('4') // First number
            .mockReturnValueOnce('5') // Second number
            .mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Result: 20');
    });

    test('should divide two numbers correctly', () => {
        promptMock
            .mockReturnValueOnce('4') // Choice: Divide
            .mockReturnValueOnce('20') // First number
            .mockReturnValueOnce('4') // Second number
            .mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Result: 5');
    });

    test('should handle division by zero', () => {
        promptMock
            .mockReturnValueOnce('4') // Choice: Divide
            .mockReturnValueOnce('10') // First number
            .mockReturnValueOnce('0') // Second number
            .mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Error: Division by zero is not allowed.');
    });

    test('should handle invalid choice', () => {
        promptMock
            .mockReturnValueOnce('6') // Invalid choice
            .mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Invalid choice. Please try again.');
    });

    test('should exit the calculator', () => {
        promptMock.mockReturnValueOnce('5'); // Exit

        main();

        expect(consoleLogMock).toHaveBeenCalledWith('Exiting the calculator. Goodbye!');
    });
});