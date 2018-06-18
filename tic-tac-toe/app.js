'use strict';
/* global $ */

const state = {
  board: [null, null, null, null, null, null, null, null, null],
  xIsNext: true,
  winPattern: null,
  newGame: function(){
    this.board = Array(9).fill(null);
    this.xIsNext = true;
    this.winPattern = null;
  },
  setMove: function(cellNo){
    const cell = Math.abs(cellNo);
    if(this.winPattern) return;
    if(this.board[cell] !== null) return;
    this.board[cell] = this.xIsNext ? 'X' : 'O';
    this.xIsNext = !this.xIsNext;
  }
};

// State modification functions

// Render functions

const renderBoard = function() {
  console.log('RenderBoard ran');

  const renderCell = function(i) {
    return `
      <div class="cell" id="${i}">
        <p>${state.board[i] ? state.board[i] : '&nbsp;'}</p>
      </div>
    `;
  };

  const renderRow = function (startId, endId) {
    let html = '<div class="row">';
    for ( let i = startId; i <= endId; i++ ) {
      html += renderCell(i);
    }
    html += '</div>';
    return html;
  };

  const assembleRows = function() {
    let html = '';
    html += renderRow(0, 2);
    html += renderRow(3, 5);
    html += renderRow(6, 8);
    return html;
  };
  
  let html = assembleRows();
  $('.board').html(html);
};

// Event Listeners

function handleOnCellClick(){
  function onCellClick(event){
    const cellId = $(event.target).closest('.cell').attr('id');
    state.setMove(cellId);
    renderBoard();
  }
  $('.board').on('click','.cell', onCellClick);
}

function handleOnNewGameClick(){
  function onNewGameClick(){
    state.newGame();
    renderBoard();
  }
  $('#new-game').click(onNewGameClick);
}

function checkWinner(board){
  const winPatterns = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [2,4,6], [0,4,8]];
  for(let i = 0; i < winPatterns.length; i++){
    const winPattern = winPatterns[i];
    //prevent win with three nulls by checking first cell isnt null
    //I DONT GET IT!!!
    if(!board[winPattern[0]]) continue;
    if(board[winPattern[0]] === board[winPattern[1]] && board[winPattern[1]] === board[winPattern[2]]){
      return winPattern;
    }
  }
    return null;
}

$(function main(){
  renderBoard();
  handleOnCellClick();
  handleOnNewGameClick();
})



