document.addEventListener('DOMContentLoaded', () => {
  let gameBoard = document.querySelector('.container');
  const cells = 9;
  function initFild() {
    let i = 1;
    while (i <= cells) {
      let cell = document.createElement('div');
      cell.className = 'tile';
      gameBoard.appendChild(cell);
      i++;
    }
  }
  initFild();

  let winner = document.querySelector('.announcer');
  let move = 0;

  let avatarConteiners = document.querySelectorAll('.avatar-container');
  avatarConteiners.forEach((el) => el.setAttribute('draggable', 'true'));
  let avatarIcons = document.querySelectorAll('.avatar-icon');
  avatarIcons.forEach((el) => el.setAttribute('draggable', 'true'));

  avatarIcons.forEach((item) => {
    item.addEventListener('dragstart', startDrag);
  });

  avatarConteiners.forEach((item) => {
    item.addEventListener('dragenter', enterDrag);
    item.addEventListener('dragover', overDrag);
    item.addEventListener('drop', dropFunction);
  });

  function startDrag(event) {
    event.dataTransfer.setData('avatar-icon', this.dataset.item);
  }
  function enterDrag(event) {
    event.preventDefault();
  }
  function overDrag(event) {
    event.preventDefault();
  }
  function dropFunction(event) {
    if (this.childNodes.length >= 1) {
      return;
    } else {
      const flag = event.dataTransfer.getData('avatar-icon');
      const dragItem = document.querySelector(`[data-item='${flag}']`);
      this.appendChild(dragItem);
    }
  }

  const reset = document.querySelector('#reset');
  reset.addEventListener('click', () => document.location.reload());

  gameBoard.addEventListener('click', startGame);
  document.addEventListener('keyup', checkKey);
  let index = 0;
  function checkKey(event) {
    let cell = document.querySelectorAll('.tile');
    if (event) {
      if (event.key === 'ArrowRight' && index < cells) {
        cell[index].classList.add('active');
        if (index > 0) {
          cell[index - 1].classList.remove('active');
        }
        index++;
      }
      if (event.key === 'ArrowLeft') {
        if (index === 0) {
          cell[0].classList.add('active');
        }
        if (index > 0) {
          index--;
          cell[index - 1].classList.add('active');
          cell[index].classList.remove('active');
        }
      }
      const customEvent = new Event('click');

      document.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          let activeCell = document.querySelector('.active');
          activeCell.addEventListener('click', startGame);
          activeCell.dispatchEvent(customEvent);
        }
      });
    }
  }

  let player = document.querySelector('.display-player');
  function startGame(event) {
    if (
      event.target.className === 'tile' ||
      event.target.className === 'tile active'
    ) {
      if (move % 2 === 0) {
        event.target.innerText = 'X';
        event.target.classList.add('playerX');
        player.classList.add('playerX');
        player.classList.remove('playerO');
        player.innerText = 'X';
      } else {
        event.target.innerText = 'O';
        event.target.classList.add('playerO');
        player.classList.add('playerO');
        player.classList.remove('playerX');
        player.innerText = 'O';
      }
      move++;     
      checkwhoWin();
    }
  }

  function checkwhoWin() {
    let cell = document.querySelectorAll('.tile');
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    
    for (let i = 0; i < winningCombinations.length; i++) {
      
      if (
        cell[winningCombinations[i][0]].innerText === 'X' &&
        cell[winningCombinations[i][1]].innerText === 'X' &&
        cell[winningCombinations[i][2]].innerText === 'X'
      ) {
        winner.innerHTML = `Player <span class=playerX>X Won</span>`;
        winner.classList.remove('hide');
        cell.forEach((el) => {
          el.classList.add('disabled');
        });
      } else if (
        cell[winningCombinations[i][0]].innerText === 'O' &&
        cell[winningCombinations[i][1]].innerText === 'O' &&
        cell[winningCombinations[i][2]].innerText === 'O'
      ) {
        winner.innerHTML = `Player <span class=playerO>O Won</span>`;
        winner.classList.remove('hide');
        cell.forEach((el) => {
          el.classList.add('disabled');
        });
      } else if (move === cells) {
         winner.innerText = 'Draw';
         winner.classList.remove('hide');
       }       
    }    
  }  
});
