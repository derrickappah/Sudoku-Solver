const sudokuGrid = document.getElementById('sudoku-grid');
const solveBtn = document.getElementById('solve-btn');
const clearBtn = document.getElementById('clear-btn');
const message = document.getElementById('message');

let grid = Array(9).fill().map(() => Array(9).fill(0));
let initialGrid = Array(9).fill().map(() => Array(9).fill(0));

function createGrid() {
    sudokuGrid.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'sudoku-cell';
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '9';
            input.className = 'appearance-none';
            cell.appendChild(input);
            sudokuGrid.appendChild(cell);
        }
    }
}
createGrid();

const cells = document.querySelectorAll('.sudoku-cell input');

cells.forEach((input, index) => {
    input.addEventListener('input', () => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = input.value ? parseInt(input.value) : 0;

        if (value && (!/^[1-9]$/.test(value) || !isValid(row, col, value, grid))) {
            input.classList.add('error');
            message.textContent = 'Invalid number! Check for duplicates.';
        } else {
            input.classList.remove('error');
            message.textContent = '';
            grid[row][col] = value;
            if (!initialGrid[row][col]) initialGrid[row][col] = value;
        }
    });
});

clearBtn.addEventListener('click', () => {
    grid = Array(9).fill().map(() => Array(9).fill(0));
    initialGrid = Array(9).fill().map(() => Array(9).fill(0));
    cells.forEach(input => {
        input.value = '';
        input.classList.remove('error', 'solved');
    });
    message.textContent = '';
});

solveBtn.addEventListener('click', () => {
    if (!validateInitialGrid()) {
        message.textContent = 'Invalid initial grid! No duplicates allowed in rows, columns, or 3x3 boxes.';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
        return;
    }

    let solvingGrid = grid.map(row => [...row]);
    let maxDepth = 0;
    if (solveSudoku(solvingGrid, maxDepth)) {
        cells.forEach((input, index) => {
            const row = Math.floor(index / 9);
            const col = index % 9;
            const initialValue = initialGrid[row][col] || 0;
            const solvedValue = solvingGrid[row][col] || 0;
            input.value = solvedValue;
            if (solvedValue !== 0 && initialValue === 0) {
                input.classList.add('solved');
            } else {
                input.classList.remove('solved');
            }
        });
        grid = solvingGrid;
        message.textContent = 'Sudoku solved!';
        message.classList.remove('text-red-500');
        message.classList.add('text-green-500');
    } else {
        message.textContent = 'No solution exists!';
        message.classList.remove('text-green-500');
        message.classList.add('text-red-500');
    }
});

function validateInitialGrid() {
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set();
        let colSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (initialGrid[i][j]) {
                if (rowSet.has(initialGrid[i][j])) return false;
                rowSet.add(initialGrid[i][j]);
            }
            if (initialGrid[j][i]) {
                if (colSet.has(initialGrid[j][i])) return false;
                colSet.add(initialGrid[j][i]);
            }
        }
    }
    for (let i = 0; i < 9; i += 3) {
        for (let j = 0; j < 9; j += 3) {
            let boxSet = new Set();
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const value = initialGrid[i + k][j + l];
                    if (value) {
                        if (boxSet.has(value)) return false;
                        boxSet.add(value);
                    }
                }
            }
        }
    }
    return true;
}

function isValid(row, col, num, grid) {
    if (!grid || !grid[row] || !grid[col]) return false;
    for (let x = 0; x < 9; x++) {
        if (x !== col && grid[row][x] === num) return false;
        if (x !== row && grid[x][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((i + startRow !== row || j + startCol !== col) && grid[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function findEmpty(grid) {
    if (!grid || grid.length !== 9) return null;
    for (let i = 0; i < 9; i++) {
        if (!grid[i] || grid[i].length !== 9) return null;
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === 0) return [i, j];
        }
    }
    return null;
}

function solveSudoku(grid, depth = 0) {
    if (depth > 1000) {
        console.log('Max depth reached, terminating recursion');
        return false;
    }
    const empty = findEmpty(grid);
    if (!empty) return true;

    const [row, col] = empty;
    console.log(`Depth ${depth}: Trying row ${row}, col ${col}`);
    for (let num = 1; num <= 9; num++) {
        if (isValid(row, col, num, grid)) {
            grid[row][col] = num;
            if (solveSudoku(grid, depth + 1)) return true;
            grid[row][col] = 0;
        }
    }
    return false;
}
