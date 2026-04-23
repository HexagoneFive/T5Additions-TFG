// priority: 0
"use strict";

// 1. Register GregTech Materials
// This must happen in the 'gtceu:material' event
GTCEuStartupEvents.registry('gtceu:material', event => {
    if (global.registerT5AMaterials) {
        global.registerT5AMaterials(event);
    }
});

// 2. Register Custom Items
// This happens in the 'item' event
StartupEvents.registry('item', event => {
    if (global.registerT5AItems) {
        global.registerT5AItems(event);
    }
});