document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById('grid-container');
    const gridSize = 4;
    let cells = [];
    let score = 0;

    // Initialize the grid
    function init() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
            cell.setAttribute('data-index', i);
            gridContainer.appendChild(cell);
            cells.push(cell);
        }
        addRandomTile();
        addRandomTile();
        updateGrid();
    }

    // Add a random tile (2 or 4) to an empty cell
    function addRandomTile() {
        let emptyCells = cells.filter(cell => !cell.innerHTML);
        if (emptyCells.length === 0) return;
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.innerHTML = Math.random() < 0.9 ? 2 : 4;
        randomCell.classList.add(`tile-${randomCell.innerHTML}`);
    }

    // Update the grid with the current state of cells
    function updateGrid() {
        cells.forEach(cell => {
            cell.className = 'grid-cell'; // Reset class names
            if (cell.innerHTML) {
                cell.classList.add(`tile-${cell.innerHTML}`);
            }
        });
    }

    // Move and merge cells
    function move(direction) {
        let moved = false;
        switch (direction) {
            case 'up':
                for (let i = 0; i < gridSize; i++) {
                    let column = [];
                    for (let j = 0; j < gridSize; j++) {
                        column.push(cells[i + j * gridSize]);
                    }
                    moved = moveAndMerge(column) || moved;
                }
                break;
            case 'down':
                for (let i = 0; i < gridSize; i++) {
                    let column = [];
                    for (let j = gridSize - 1; j >= 0; j--) {
                        column.push(cells[i + j * gridSize]);
                    }
                    moved = moveAndMerge(column) || moved;
                }
                break;
            case 'left':
                for (let i = 0; i < gridSize; i++) {
                    let row = cells.slice(i * gridSize, (i + 1) * gridSize);
                    moved = moveAndMerge(row) || moved;
                }
                break;
            case 'right':
                for (let i = 0; i < gridSize; i++) {
                    let row = cells.slice(i * gridSize, (i + 1) * gridSize).reverse();
                    moved = moveAndMerge(row) || moved;
                }
                break;
        }
        if (moved) {
            addRandomTile();
            updateGrid();
        }
    }

    // Move and merge tiles in a row or column
    function moveAndMerge(line) {
        let moved = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i].innerHTML) {
                let j = i + 1;
                while (j < line.length && !line[j].innerHTML) {
                    j++;
                }
                if (j < line.length && line[i].innerHTML === line[j].innerHTML) {
                    line[i].innerHTML = parseInt(line[i].innerHTML) * 2;
                    line[j].innerHTML = '';
                    moved = true;
                }
            }
        }
        for (let i = 0; i < line.length; i++) {
            if (!line[i].innerHTML) {
                let j = i + 1;
                while (j < line.length && !line[j].innerHTML) {
                    j++;
                }
                if (j < line.length) {
                    line[i].innerHTML = line[j].innerHTML;
                    line[j].innerHTML = '';
                    moved = true;
                }
            }
        }
        return moved;
    }

    // Handle keyboard input
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                move('up');
                break;
            case 'ArrowDown':
                move('down');
                break;
            case 'ArrowLeft':
                move('left');
                break;
            case 'ArrowRight':
                move('right');
                break;
        }
    });

    init();
});
