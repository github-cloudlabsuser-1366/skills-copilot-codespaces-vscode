def calculator():
    """
    A simple calculator function that allows the user to perform basic arithmetic operations.

    The calculator provides the following operations:
    1. Addition
    2. Subtraction
    3. Multiplication
    4. Division
    5. Percentage calculation

    The user is prompted to select an operation and input two numeric values. The function then performs
    the selected operation and displays the result. It also includes error handling for invalid inputs
    and division by zero.

    Raises:
        ValueError: If the user inputs non-numeric values for the numbers.
    """
    print("Select operation:")
    print("1. Add")
    print("2. Subtract")
    print("3. Multiply")
    print("4. Divide")
    print("5. Percentage")

    try:
        choice = int(input("Enter choice (1/2/3/4/5): "))
        if choice not in [1, 2, 3, 4, 5]:
            print("Invalid choice. Please select a valid operation.")
            return

        num1 = float(input("Enter first number: "))
        num2 = float(input("Enter second number: "))

        if choice == 1:
            print(f"The result is: {num1 + num2:.2f}")
        elif choice == 2:
            print(f"The result is: {num1 - num2:.2f}")
        elif choice == 3:
            print(f"The result is: {num1 * num2:.2f}")
        elif choice == 4:
            if num2 == 0:
                print("Error: Division by zero is not allowed.")
            else:
                print(f"The result is: {num1 / num2:.2f}")
        elif choice == 5:
            if num2 == 0:
                print("Error: Division by zero is not allowed for percentage calculation.")
            else:
                print(f"The result is: {(num1 / num2) * 100:.2f}%")
    except ValueError:
        print("Invalid input. Please enter numeric values.")

if __name__ == "__main__":
    while True:
        calculator()
        again = input("Do you want to perform another calculation? (yes/no): ").strip().lower()
        if again != 'yes':
            print("Goodbye!")
            break
