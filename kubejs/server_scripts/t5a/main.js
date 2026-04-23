// priority: 0
"use strict"


// EVENTO DE TAGS
ServerEvents.tags('item', event => {
    if (global.registerCBCTags) global.registerCBCTags(event);
    
    // Futuros mods podem ser adicionados aqui
    // Se tiver um módulo do Thermal: global.registerThermalTags(event);
});

// EVENTO DE RECEITAS
ServerEvents.recipes(event => {
    // Chama o módulo do Create Big Cannons
    if (global.registerCBCRecipes) global.registerCBCRecipes(event);

    // Futuros mods: global.registerThermalRecipes(event);
});