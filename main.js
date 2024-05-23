$(document).ready(function() {
  var player1 = prompt('Player - 1 name?');
  var player2 = prompt('Player - 2 name? ');

  var player1Color = 'rgb(167,0,3)';
  var player2Color = 'rgb(0,167,23)';
  var currentPlayer = 1; // 1 for player1, 2 for player2

  var rows = 6; 
  var cols = 7;
  var board = []; 

  
  for (var r = 0; r < rows; r++) {
      board[r] = [];
      for (var c = 0; c < cols; c++) {
          board[r][c] = 0; 
      }
  }

  function setPlayersName() {
      $('.p1-name').text(player1);
      $('.player1-info').css('background-color', player1Color);
      $('.p2-name').text(player2);
      $('.player2-info').css('background-color', player2Color);
  }

  setPlayersName();

  function dropPiece(column) {
      var buttons = $('td:nth-child(' + (column + 1) + ') button');
      console.log(buttons)
      for (var i = buttons.length - 1; i > -1; i--) {
          if ($(buttons[i]).css('background-color') == 'rgb(255, 255, 255)') { // Checking for white background
              $(buttons[i]).css('background-color', currentPlayer === 1 ? player1Color : player2Color);
              board[i][column] = currentPlayer; // Update the board state
              if (checkWin(i, column)) {
                  alert((currentPlayer === 1 ? player1 : player2) + ' wins!');
              }
              currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch player
              break;
          }
      }
  }

  
  function checkWin(row, col) {
      return checkDirection(row, col, 1, 0) || 
             checkDirection(row, col, 0, 1) || 
             checkDirection(row, col, 1, 1) || 
             checkDirection(row, col, 1, -1);  
  }

  
  function checkDirection(row, col, rowDir, colDir) {
      var count = 0;
      var player = board[row][col];

      for (var i = 0; i < 4; i++) {
          var r = row + i * rowDir;
          var c = col + i * colDir;
          if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
              count++;
          } else {
              break;
          }
      }

      for (var i = 1; i < 4; i++) {
          var r = row - i * rowDir;
          var c = col - i * colDir;
          if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === player) {
              count++;
          } else {
              break;
          }
      }

      return count >= 4;
  }

  
  $('button').click(function() {
      
      var colIndex = $(this).parent().index();
      console.log(colIndex)
      dropPiece(colIndex);
  });
});
