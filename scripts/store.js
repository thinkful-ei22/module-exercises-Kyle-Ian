'use strict';

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
      item.id === id;
    })
    return foundItem;
  }
  const addItem = function(name){
    try{
      Item.validateName(name);
      let item = Item.create(name);
      this.items.push(item);
    }
    catch(err){
      console.log(`Cannot add ${err.message}`);
    }
  }
  const findAndToggleChecked = function(id){
    let item = this.findById(id);
    item.checked = !item.checked;
  }
  const findAndUpdateName = function(id, newName){
    try{
      Item.validateName(newName);
      let item = Item.findById(id);
      item.name = newName;
    }
    catch(err){
      console.log(`Cannot update name: ${err.message}`);
    }
  }
  const findAndDelete = function(id){
    const itemIndex = store.items.findIndex(itemId => {
       return itemId === id;
    });
    this.items.splice(itemIndex, 1);
  }

  return {
    items, hideCheckedItems, searchTerm, findById, addItem, findAndToggleChecked, findAndUpdateName, findAndDelete
  };

}());