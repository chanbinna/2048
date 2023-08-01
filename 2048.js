var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}


// This makes the main board
function setGame() {
    document.getElementById("gameover").style.display = "none";
    // board = [
    //     [2, 2, 2, 2],
    //     [2, 2, 2, 2],
    //     [4, 4, 8, 8],
    //     [4, 4, 8, 8]
    // ]

    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]


    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            // This line makes this form: <div id="0-0"></div>
            tile.id = r.toString() + "-" +  c.toString();
            let num = board[r][c]
            updateTile(tile, num)
            // put in the tile inside the board
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

// it finish the game when they can't find empty tile
function hasEmptyTile() {
    for(let r = 0;  r < rows; r++){ 
        for(let c = 0; c < columns; c++){
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    document.getElementById('gameover').style.display = 'flex';
    return false;
}

function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }

    let found = false; 
    while (!found) {
        // random r,c
        let r = Math.floor(Math.random() * rows); // some number btw 0 - 4
        let c = Math.floor(Math.random() * columns);

        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

// this method update the tile
function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = ""; // clear the classList "x2 x4 x8"
    // this add class name tile to the element tile
    tile.classList.add("tile")
    if(num > 0) {
        tile.innerText = num;
        if(num <= 1024) {
            tile.classList.add("x" + num.toString());
        } else {
            tile.classList.add("x2048");
        }
    }
}

// This method makes command key do certain job
document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row) {
    return row.filter(num => num != 0); //create a new array without zeros ; filter method filter down to just the elements 
    // from the given array that pass the test impemented by the provided function
}

function slide(row) {
    // [0, 2, 2, 2]
    row = filterZero(row); // get rid of zeros -> [2, 2, 2]

    //slide
    for (let i = 0; i < row.length; i++) {
        // check every 2
        if(row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        } // [2, 2, 2] -> [4, 0, 2]
    }

    row = filterZero(row);

    // add zers
    while (row.length < columns) {
        row.push(0);
    } // [4, 2, 0, 0]

    return row;
}

/*
[2, 2, 0, 2]
1. clear zeros [2, 2, 2, 0]
2. merge [4, 0, 2, 0]
3. clear zeros again [4, 2, 0, 0]
*/
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for(let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for(let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];

        for(let r = 0; r < rows; r++) {
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}