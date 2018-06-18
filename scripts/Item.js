'use strict';

const Item = (function(){
    const validateName = function(name){
        if(!name){
            throw new TypeError('Name does not exist!!!');
        }
    }
    const create = function(name){
        return {
            id: cuid(),
            name,
            checked: false
        }
    }
    
    return {
        validateName, create
    }
}());