// priority: 0
"use strict"

const registerCBCTags = (event) => {
    global.T5A_CONSTANTS.DISABLED_ITEMS.forEach(item => {
        global.T5A.utils.disableItem(event, item);
    });
}

// Exportando para ser usado no main.js
global.registerCBCTags = registerCBCTags;