
# Sudoku Solver

A web-based Sudoku solver application built with HTML, CSS (Tailwind CSS), and JavaScript. It allows users to input a Sudoku puzzle, validate inputs, and solve the puzzle using a backtracking algorithm. The solver highlights user inputs in light green when focused and solver-filled cells in light blue, with invalid inputs marked in red.

## Features

- **Interactive 9x9 Grid**: Input numbers (1-9) into a responsive Sudoku grid.
- **Real-Time Validation**: Checks for duplicate numbers in rows, columns, and 3x3 boxes, highlighting invalid cells in red.
- **Solve Functionality**: Uses a backtracking algorithm to solve the puzzle, displaying solver-filled cells in light blue.
- **Clear Functionality**: Resets the grid to its initial state.
- **Responsive Design**: Optimized for both desktop and mobile devices using Tailwind CSS.
- **Visual Feedback**:
  - User inputs: Light green (`#d1e7dd`) when focused.
  - Solver-filled cells: Light blue (`#e0f2fe`).
  - Invalid inputs: Red (`#fee2e2`).
- **Error Messages**: Displays messages for invalid inputs or unsolvable puzzles.

## Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari, Edge).
- No additional software or server setup is required, as the application runs entirely in the browser.

## Setup

1. **Clone or Download the Repository**:
   - Clone the repository: `git clone https://github.com/derrickappah/Sudoku-Solver`

2. **Dependencies**:
   - The application uses external resources loaded via CDN:
     - **Tailwind CSS**: For styling and responsive design.
     - **Google Fonts (Manrope)**: For typography.
   - No local dependencies or build tools are required.

3. **Run the Application**:
   - Open the `index.html` file in a web browser by double-clicking it or serving it via a local server (e.g., using `Live Server` in VS Code or `python -m http.server 8000`).

## Usage

1. **Input a Puzzle**:
   - Click on any cell in the 9x9 grid to enter a number (1-9).
   - Cells turn light green when focused to indicate active input.
   - Invalid inputs (duplicates in a row, column, or 3x3 box) turn red, and an error message appears.

2. **Solve the Puzzle**:
   - Click the **Solve** button to solve the puzzle.
   - Solver-filled cells (those not part of the initial input) are highlighted in light blue.
   - A green message ("Sudoku solved!") appears if a solution is found; a red message ("No solution exists!") appears if the puzzle is unsolvable.

3. **Clear the Grid**:
   - Click the **Clear** button to reset the grid, removing all numbers and highlights.

4. **Validation**:
   - The application checks for valid inputs in real-time and ensures the initial grid has no duplicates before solving.
   - The solver uses a backtracking algorithm with a depth limit to prevent infinite recursion.

## File Structure

- `index.html`: The main file containing HTML, CSS (via Tailwind CSS), and JavaScript.
  - **HTML**: Defines the structure with a 9x9 grid, Solve/Clear buttons, and a message area.
  - **CSS**: Uses Tailwind CSS and custom styles for the grid, cell highlights, and buttons.
  - **JavaScript**: Implements the Sudoku grid, input validation, and backtracking solver.

## Customization

To modify the color scheme or styling:
- Edit the `:root` variables in the `<style>` section of `index.html`:
  - `--solved-color` (currently `#d1e7dd`): Color for user-input cells when focused.
  - `--secondary-color` (currently `#e0f2fe`): Color for solver-filled cells.
  - `--error` (currently `#fee2e2`): Color for invalid inputs.
- To make user-input cells persistently light green (not just when focused), add a `.user-input` class and update the JavaScript `input` event listener.

## Limitations

- The solver has a recursion depth limit of 1000 to prevent stack overflow for invalid or complex puzzles.
- User inputs are only highlighted when focused; persistent highlighting requires additional CSS/JavaScript.
- The application does not support loading puzzles from files or generating new puzzles.

## Future Improvements

- Add persistent highlighting for user-input cells.
- Implement a puzzle generator for random Sudoku puzzles.
- Add a "Hint" feature to suggest a single valid number.
- Support importing/exporting puzzles via text or file input.
- Enhance mobile usability with touch-friendly input handling.

## Troubleshooting

- **Puzzle Not Solving**: Ensure the initial grid has no duplicates in rows, columns, or 3x3 boxes. Check the error message for details.
- **Styles Not Loading**: Verify your internet connection, as Tailwind CSS and Google Fonts are loaded via CDN.
- **Invalid Input Not Highlighted**: Ensure numbers are between 1 and 9. Non-numeric inputs are ignored.

## License

This project is open-source and available under the [MIT License](LICENSE). Feel free to use, modify, and distribute it.

## Acknowledgments

- Built with [Tailwind CSS](https://tailwindcss.com/) for responsive styling.
- Uses [Manrope font](https://fonts.google.com/specimen/Manrope) from Google Fonts.
- Inspired by standard Sudoku solving techniques using backtracking.

---
