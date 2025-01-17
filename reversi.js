class Reversi {
  constructor() {
    this.currentPlayer = Math.random() < 0.5 ? "black" : "white";
    this.mat = new Array();
    this.isGameOver = false;

    for (let i = 0; i < 8; i++) {
      let col = new Array();
      for (let j = 0; j < 8; j++) {
        if ((i == 3 && j == 3) || (i == 4 && j == 4)) {
          col.push("black");
        } else if ((i == 3 && j == 4) || (i == 4 && j == 3)) {
          col.push("white");
        } else {
          col.push(null);
        }
      }
      this.mat.push(col);
    }
  }

  getCurrentPcs() {
    let white, black;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        this.mat[i][j] === "black" ? black++ : white++;
      }
    }
    return { white, black };
  }

  // Function to check if a move is valid
  isValidMove(row, col) {
    // Check if the cell is empty
    if (this.mat[row][col] !== null) {
      return false;
    }

    // Check if the move flips opponent discs in any direction
    let valid = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue; // Skip the current cell
        let flipDiscPos = this.flipsOpponentDiscs(row, col, dr, dc);
        if (flipDiscPos !== false) {
          for (let disc of flipDiscPos) {
            valid.push(disc);
          }
        }
      }
    }
    return valid;
  }

  // Function to handle user move and update the board
  handleMove(row, col) {
    console.log("handleMove");
    // Implement the game logic here, updating the board and checking for valid moves and flips
    let discsToFlip = this.isValidMove(row, col);
    if (discsToFlip.length !== 0 && discsToFlip !== false) {
      // Place the current player's disc
      this.mat[row][col] = this.currentPlayer;
      console.log(discsToFlip);
      for (let disc of discsToFlip) {
        this.mat[disc.row][disc.col] = this.currentPlayer;
      }

      // Switch to the other player's turn
      this.currentPlayer = this.currentPlayer === "black" ? "white" : "black";

      let flag = true;
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          if (this.isValidMove(row, col)) {
            flag = false;
          }
        }
      }
      if (flag) {
        this.isGameOver = true;
      }
    }
  }

  flipsOpponentDiscs(row, col, dr, dc) {
    const opponent = this.currentPlayer === "black" ? "white" : "black";
    let r = row + dr;
    let c = col + dc;
    let discsToFlip = [];

    while (this.isValidCell(r, c) && this.mat[r][c] !== null) {
      if (this.mat[r][c] === opponent) {
        discsToFlip.push({ row: r, col: c });
        r += dr;
        c += dc;
      } else {
        break;
      }
    }

    if (
      this.isValidCell(r, c) &&
      discsToFlip.length > 0 &&
      this.mat[r][c] === this.currentPlayer
    ) {
      return discsToFlip;
    }
    return false;
  }

  isValidCell(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
  }
}

module.exports = Reversi;
