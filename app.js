var game = angular.module('TicTacToe', []);

game.controller('MainController', function($scope, GameChecker) {
  // tells which player's turn it is
  $scope.turn = 'X';
  // indicates whether we are playing or if we are in a display-only state
  $scope.isActive = true;

  $scope.board = ['', '', '', '', '', '', '', '', ''];

  $scope.reset = function() {
    $scope.turn = 'X';
    $scope.isActive = true;
    $scope.board = ['', '', '', '', '', '', '', '', ''];
  };

  $scope.add = function(index) {
    if ($scope.board[index] !== 'X' && $scope.board[index] !== 'O') {
      $scope.board[index] = $scope.turn;
      // check if someone won
      if (GameChecker.rowCheck($scope.turn, $scope.board) || 
          GameChecker.colCheck($scope.turn, $scope.board) ||
          GameChecker.diagCheck($scope.turn, $scope.board)) {
        $scope.isActive = false; // change game state to false on a win
        // set up win message
        $scope.result = $scope.turn + ' wins! Click New Game to play again!';
      }
      if ($scope.board.indexOf('') === -1) { // no one won, all spaces filled up
        $scope.isActive = false; // change game state to false on a tie
        // set up tie message
        $scope.result = 'Tie Game! Click New Game to play again!';
      }
      if ($scope.turn === 'X') { 
        $scope.turn = 'O'; 
      } else {
        $scope.turn = 'X';
      }
    }
    console.log($scope.turn, $scope.board);
    
  };

  // $scope.changeTurn = function() {
  //   if ($scope.turn === )
  // };

});

game.factory('GameChecker', function() {
  return {

    rowCheck: function(player, board) {
      if (board[0] === player && board[1] === player && board[2] === player) {
        return true;
      } else if (board[3] === player && board[4] === player && board[5] === player) {
        return true;
      } else if (board[6] === player && board[7] === player && board[8] === player) {
        return true;
      } else {
        return false;
      }
    },

    colCheck: function(player, board) {
      if (board[0] === player && board[3] === player && board[6] === player) {
        return true;
      } else if (board[1] === player && board[4] === player && board[7] === player) {
        return true;
      } else if (board[2] === player && board[5] === player && board[8] === player) {
        return true;
      } else {
        return false;
      }
    },

    diagCheck: function(player, board) {
      if (board[0] === player && board[4] === player && board[8] === player) {
        return true;
      } else if (board[2] === player && board[4] === player && board[6] === player) {
        return true;
      } else {
        return false;
      }
    }

  };
});