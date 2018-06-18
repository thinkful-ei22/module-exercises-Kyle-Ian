'use strict';
/* global $ */

const state = {
  board: [null, null, null, null, null, null, null, null, null],
  xIsNext: false,
  winPattern: null
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
  console.log(html);
  $('.board').html(html);
};

// Event Listeners

$(renderBoard);
