'use strict';
/* global Item, cuid */

const store = (function() {
  const items = [
    { id: cuid(), name: 'apples', checked: false },
    { id: cuid(), name: 'oranges', checked: false },
    { id: cuid(), name: 'milk', checked: true },
    { id: cuid(), name: 'bread', checked: false }
  ];
  let hideCheckedItems = false;
  let searchTerm = '';

  const findById = function(id){
    let foundItem = store.items.find(item => {
      return item.id === id;
    });
    return foundItem;
  };
  const addItem = function(name){
    try{
      Item.validateName(name);
      let item = Item.create(name);
      this.items.push(item);
    }
    catch(err){
      console.log(`Cannot add ${err.message}`);
    }
  };
  const findAndToggleChecked = function(id){
    let item = store.findById(id);
    item.checked = !item.checked;
  };
  const findAndUpdateName = function(id, newName){
    try{
      Item.validateName(newName);
      let item = store.findById(id);
      item.name = newName;
    }
    catch(err){
      console.log(`Cannot update name: ${err.message}`);
    }
  };
  const findAndDelete = function(id){
    const itemIndex = items.findIndex(item => {
      return item.id === id;
    });
    this.items.splice(itemIndex, 1);
  };
  const toggleCheckedFilter = function(){
    this.hideCheckedItems = !this.hideCheckedItems;
  }
  const setSearchTerm = function(val){
    this.searchTerm = val;
  }

  return {
    items, hideCheckedItems, searchTerm, findById, addItem, findAndToggleChecked,
    findAndUpdateName, findAndDelete, toggleCheckedFilter, setSearchTerm
  };

}());