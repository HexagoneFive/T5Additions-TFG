// priority: 0
"use strict"

import '../../../../probe/generated/constants'
import '../../../../probe/generated/events'
import '../../../../probe/generated/globals'
import '../../../../probe/generated/registries'
import '../../../../probe/generated/tag_events'
import '../../../../probe/generated/internals/internal_47'
import '../../../../probe/generated/internals/internal_19'

/**
 * 
 * @param {Internal.RecipesEventJS} event 
 */
const registerCBCRecipes = (event) => {
    // 1. REMOÇÕES
    event.remove([
        { id: "createbigcannons:empty_powder_charge" },
        { id: 'createbigcannons:cannon_builder'},
        { id: 'createbigcannons:sequenced_assembly/pressing_big_cartridge' },
        { id: 'createbigcannons:sequenced_assembly/pressing_autocannon_cartridge' },
        { type: 'createbigcannons:melting' },
        { type: 'createbigcannons:mixing' },
        { type: 'createbigcannons:built_up_heating' },
    ]);

    const IO_REMOVE = [
        'createbigcannons:gunpowder_pinch'
    ]
    global.T5A.utils.removeIORecipe(event, IO_REMOVE, { input: true, output: true })
    global.T5A.utils.removeIORecipe(event, global.T5A_CONSTANTS.DISABLED_ITEMS, { input: false, output: true })
    
    // 2. SUBSTITUIÇÕES DE INPUTS
    const REPLACE_INPUT = [
        { filter: {}, oldinput: 'createbigcannons:nugget_cast_iron', newinput: '#forge:nuggets/iron' },
        { filter: {}, oldinput: 'createbigcannons:ingot_cast_iron', newinput: '#forge:ingots/iron' },
        { filter: {}, oldinput: 'createbigcannons:block_cast_iron', newinput: '#forge:storage_blocks/iron' },
        { filter: {}, oldinput: 'createbigcannons:nethersteel_nugget', newinput: '#forge:nuggets/black_steel' },
        { filter: {}, oldinput: 'createbigcannons:nethersteel_ingot', newinput: '#forge:ingots/black_steel' },
        { filter: {}, oldinput: 'createbigcannons:nethersteel_block', newinput: '#forge:storage_blocks/black_steel' },
        { filter: {}, oldinput: 'createbigcannons:bronze_scrap', newinput: '#forge:nuggets/bronze' },
        { filter: {}, oldinput: 'createbigcannons:bronze_ingot', newinput: '#forge:ingots/bronze' },
        { filter: {}, oldinput: 'createbigcannons:bronze_block', newinput: '#forge:storage_blocks/bronze' },
        { filter: {}, oldinput: 'createbigcannons:spring_wire', newinput: '#forge:fine_wires/steel' },
    ]
    REPLACE_INPUT.forEach(recipe => {
        const { filter, oldinput, newinput } = recipe
        event.replaceInput(filter, oldinput, newinput);
    });


    // 3. CRAFTING BÁSICO (Shaped)
    const SHAPED_RECIPES = [
        { output: 'createbigcannons:empty_powder_charge', input: { pattern: [' C ', ' D ', ' C '], keys: { C: '#forge:string', D: '#forge:cloth' } }, id: null },
        { output: 'createbigcannons:wrought_iron_drop_mortar_end', input: { pattern: [' C ', ' D '], keys: { C: 'tfc:metal/bars/wrought_iron', D: 'createbigcannons:wrought_iron_cannon_end' } }, id: null },
        { output: 'createbigcannons:bag_of_grapeshot', input: { pattern: ['SSS', 'WBW', ' H '], keys: { S: '#forge:string', W: '#forge:cloth', B: 'createbigcannons:shot_balls', H: '#minecraft:wooden_slabs' } }, id: null },
        { output: 'createbigcannons:worm_head', input: { pattern: ['SSS', ' B '], keys: { S: 'tfc:metal/bars/wrought_iron', B: 'create:piston_extension_pole'} }, id: null },
    ]
    SHAPED_RECIPES.forEach(recipe => {
        const { output, input } = recipe
        //(event, output, pattern, keys, module_, customId)
        global.T5A.utils.shaped(event, output, input.pattern, input.keys, 'cbc', input.id)
    })


    event.shaped('2x createbigcannons:casting_sand', ['ABA', 'CDC', 'ABA'], {
        A: '#forge:powders/graphite', B: '#forge:dusts/kaolinite',
        C: '#forge:sand', D: '#forge:ingots/clay'
    }).id('t5a:cbc/castingsand');

    event.shaped('2x createbigcannons:empty_powder_charge', ['   ', ' A ', ' B '], {
        B: '#forge:cloth', A: '#forge:string'
    }).id('t5a:cbc/empty_powder_charge');

    // 4. MOLDES (Gerados dinamicamente das Constantes)
    for (let key in global.T5A_CONSTANTS.CBC_MOULDS) {
        let { result, pattern } = global.T5A_CONSTANTS.CBC_MOULDS[key];
        event.shaped(result, ['MKL', pattern[0], pattern[1]], {
            M: '#forge:tools/hammers', K: '#tfc:chisels', L: '#forge:tools/saws', A: '#tfg:hardwood'
        }).id(key);
    }

    // 5. GREGTECH: PROCESSAMENTO QUÍMICO 
    const chemReactions = [
        {
            id: 'calcium_cyanamide', itemsIn: ["t5a:calcium_carbide"], fluidsIn: [Fluid.of("gtceu:nitrogen", 1000)],
            itemsOut: ["t5a:calcium_cyanamide", 'gtceu:carbon_dust'], eu: GTValues.VA[GTValues.MV], duration: 800, circuit: 5
        },
        {
            id: 'acetylene', itemsIn: ["t5a:calcium_carbide"], fluidsIn: [Fluid.of('gtceu:distilled_water', 2000)],
            itemsOut: ["gtceu:calcium_hydroxide_dust"], fluidsOut: [Fluid.of('tfg:acetylene', 1000)], eu: GTValues.VA[GTValues.MV], duration: 100, circuit: 5
        },
        {
            id: 'ammonium_nitrate', fluidsIn: [Fluid.of('gtceu:ammonia', 1000), Fluid.of('gtceu:nitric_acid', 1000)],
            itemsOut: ["t5a:ammonium_nitrate"], eu: GTValues.VA[GTValues.HV], duration: 80, circuit: 5
        },
        {
            id: 'dicyandiamide', itemsIn: ["2x t5a:calcium_cyanamide"], notConsumable: '#forge:dusts/calcium_hydroxide',
            fluidsIn: [Fluid.of('gtceu:distilled_water', 1000)], itemsOut: ["t5a:dicyandiamide"], fluidsOut: [Fluid.of('gtceu:distilled_water', 1000)],
            eu: GTValues.VA[GTValues.MV], duration: 120, circuit: 5
        },
        {
            id: 'guanidine_nitrate', itemsIn: ["t5a:dicyandiamide", "2x t5a:ammonium_nitrate"], itemsOut: ["t5a:guanidine_nitrate"],
            eu: GTValues.VA[GTValues.MV], duration: 60, circuit: 5
        },
        {
            id: 'nitroguanidine', itemsIn: ["t5a:guanidine_nitrate"], fluidsIn: [Fluid.of('gtceu:sulfuric_acid', 1000)],
            itemsOut: ["t5a:nitroguanidine"], fluidsOut: [Fluid.of('gtceu:sulfuric_acid', 1000)], eu: GTValues.VA[GTValues.HV], duration: 70, circuit: 5
        },
        {
            id: 'nitropowder', itemsIn: ["5x t5a:nitroguanidine", '3x tfg:nitrocellulose'], fluidsIn: [Fluid.of('gtceu:glyceryl_trinitrate', 2000)],
            itemsOut: ['10x createbigcannons:nitropowder'], eu: GTValues.VA[GTValues.HV], duration: 400, circuit: 5
        }
    ];

    chemReactions.forEach(rec => {
        // Large Chemical Reactor
        let largeBuilder = event.recipes.gtceu.large_chemical_reactor(`t5a:cbc/large_chemical_reactor/${rec.id}`)
            .EUt(rec.eu)
            .duration(rec.duration)
            .circuit(rec.circuit);

        // Direct passing of arrays is safer in KubeJS for GTCEu
        if (rec.itemsIn) largeBuilder.itemInputs.apply(largeBuilder, rec.itemsIn);
        if (rec.fluidsIn) largeBuilder.inputFluids.apply(largeBuilder, rec.fluidsIn);
        if (rec.itemsOut) largeBuilder.itemOutputs.apply(largeBuilder, rec.itemsOut);
        if (rec.fluidsOut) largeBuilder.outputFluids.apply(largeBuilder, rec.fluidsOut);
        if (rec.notConsumable) largeBuilder.notConsumable(rec.notConsumable);

        // Normal Chemical Reactor
        let normalBuilder = event.recipes.gtceu.chemical_reactor(`t5a:cbc/chemical_reactor/${rec.id}`)
            .EUt(rec.eu)
            .duration(rec.duration)
            .circuit(rec.circuit);

        if (rec.itemsIn) normalBuilder.itemInputs.apply(normalBuilder, rec.itemsIn);
        if (rec.fluidsIn) normalBuilder.inputFluids.apply(normalBuilder, rec.fluidsIn);
        if (rec.itemsOut) normalBuilder.itemOutputs.apply(normalBuilder, rec.itemsOut);
        if (rec.fluidsOut) normalBuilder.outputFluids.apply(normalBuilder, rec.fluidsOut);
        if (rec.notConsumable) normalBuilder.notConsumable(rec.notConsumable);
    });

    // 6. OUTRAS MÁQUINAS (EBF, Assembler, Forge Hammer...)
    event.recipes.gtceu.electric_blast_furnace("t5a:cbc/electric_blast_furnace/calcium_carbide")
        .itemInputs('#forge:dusts/quicklime', '3x #forge:dusts/carbon')
        .outputFluids(Fluid.of('gtceu:carbon_monoxide', 1000))
        .itemOutputs("t5a:calcium_carbide").EUt(GTValues.VA[GTValues.HV]).duration(200).blastFurnaceTemp(2270).circuit(5);


    const mixerRecipes = [
        { inputs: ['1x #forge:paper', '2x tfg:nitrocellulose'], inputsf: [Fluid.of('gtceu:distilled_water', 100)], output: '3x createbigcannons:guncotton', module: 'cbc', options: { tier: GTValues.ULV, duration: 50, circuit: 5 } },
    ]
    mixerRecipes.forEach(recipe => {
        const { output, inputs, inputsf, module_, options } = recipe
        global.T5A.utils.mixer(event, output, inputs, inputsf, module_, options)
    })


    // 7. Forge Hammer Recipes.
    global.T5A_CONSTANTS.FORGE_HAMMER_RECIPES.forEach(recipe => {
        const { output, input, module, options } = recipe;
        global.T5A.utils.forgeHammer(event, output, input, module = module, options = options)
    });

    // 8. Sequencied Assembly Recipes
    event.recipes.createSequencedAssembly([Item.of('createbigcannons:big_cartridge', '{Power:0}')],
        'createbigcannons:big_cartridge_sheet',
        [event.recipes.greate.pressing('createbigcannons:partially_formed_big_cartridge', ['createbigcannons:partially_formed_big_cartridge'])]
    )
        .transitionalItem('createbigcannons:partially_formed_big_cartridge')
        .loops(5)
        .id('t5a:cbc/sequenced_assembly/big_cartridge')

    event.recipes.createSequencedAssembly([Item.of('createbigcannons:empty_autocannon_cartridge')],
        'createbigcannons:autocannon_cartridge_sheet',
        [event.recipes.greate.pressing('createbigcannons:partially_formed_autocannon_cartridge', ['createbigcannons:partially_formed_autocannon_cartridge'])]
    )
        .transitionalItem('createbigcannons:partially_formed_autocannon_cartridge')
        .loops(6)
        .id('t5a:cbc/sequenced_assembly/empty_autocannon_cartridge')


    const assemblyRecipes = [
        { inputs: ['createbigcannons:big_cartridge_sheet'], output: Item.of('createbigcannons:big_cartridge', '{Power:0}'), module: 'cbc', options: { tier: GTValues.ULV, duration: 100, circuit: 5 } },
        { inputs: ['createbigcannons:autocannon_cartridge_sheet'], output: Item.of('createbigcannons:empty_autocannon_cartridge'), module: 'cbc', options: { tier: GTValues.ULV, duration: 100, circuit: 5 } },
        { inputs: ['#forge:shafts', 'createbigcannons:bronze_sliding_breechblock', 'createbigcannons:incomplete_bronze_sliding_breech'], output: Item.of('createbigcannons:bronze_sliding_breech'), module: 'cbc', options: { tier: GTValues.ULV, duration: 100, circuit: 5 } },
        { inputs: ['#forge:shafts', 'createbigcannons:steel_sliding_breechblock', 'createbigcannons:incomplete_steel_sliding_breech'], output: Item.of('createbigcannons:steel_sliding_breech'), module: 'cbc', options: { tier: GTValues.LV, duration: 100, circuit: 5 } },
        { inputs: ['#forge:shafts', 'createbigcannons:cast_iron_sliding_breechblock', 'createbigcannons:incomplete_cast_iron_sliding_breech'], output: Item.of('createbigcannons:cast_iron_sliding_breech'), module: 'cbc', options: { tier: GTValues.ULV, duration: 100, circuit: 5 } },
        { inputs: ['#forge:shafts', 'createbigcannons:incomplete_steel_screw_breech', 'createbigcannons:steel_screw_lock'], output: Item.of('createbigcannons:steel_screw_breech'), module: 'cbc', options: { tier: GTValues.LV, duration: 100, circuit: 5 } },
        { inputs: ['#forge:shafts', 'createbigcannons:incomplete_nethersteel_screw_breech', 'createbigcannons:nethersteel_screw_lock'], output: Item.of('createbigcannons:nethersteel_screw_breech'), module: 'cbc', options: { tier: GTValues.LV, duration: 100, circuit: 5 } },
    ]

    assemblyRecipes.forEach(recipe => {
        const { output, inputs, inputsf, module_, options } = recipe
        global.T5A.utils.assembler(event, output, inputs, inputsf, module_, options)
    })

}

// Exportando para ser usado no main.js
global.registerCBCRecipes = registerCBCRecipes;