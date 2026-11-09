const cells = document.querySelectorAll(".cell");
const reset = document.querySelector("#reset");
const status = document.querySelector("#status");
const winner = document.querySelector("#winner");

let turnX = true;
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.disabled || gameOver) return;

    const currentPlayer = turnX ? "X" : "O";
    cell.innerText = currentPlayer;
    cell.disabled = true;

    if (checkWinner()) {
      winner.textContent = `Winner ${currentPlayer}`;
      status.textContent = "";
      gameOver = true;
      return;
    }

    const allCellsFilled = [...cells].every(
      (cell) => cell.innerText.trim() !== ""
    );

    if (allCellsFilled) {
      winner.textContent = "Draw!";
      status.textContent = "";
      gameOver = true;
      return;
    }

    turnX = !turnX;
    status.textContent = `Player ${turnX ? "X" : "O"}'s turn`;
  });
});

function checkWinner() {
  return winningCombinations.some(([a, b, c]) => {
    const value = cells[a].innerText.trim();
    return value && value === cells[b].innerText.trim() &&
      value === cells[c].innerText.trim();
  });
}

function resetGame() {
  cells.forEach((cell) => {
    cell.innerText = "";
    cell.disabled = false;
  });

  turnX = true;
  gameOver = false;
  winner.textContent = "";
  status.textContent = "Player X's turn";
}

reset.addEventListener("click", resetGame);