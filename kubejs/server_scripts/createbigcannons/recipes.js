// priority: 0
"use strict"


const createSequenciendAssemblyRecipe = (output, base, sequence, loops, transition_item)=>{

}

/**
 * @param {Internal.RecipesEventJS} event 
 */
const registerCBCRecipes = (event) => {

    // #region Remove Recipes
    event.remove([
        { mod: "createbigcannons", output: '#createbigcannons:nugget_bronze' },
        { mod: "createbigcannons", output: '#createbigcannons:nugget_cast_iron' },
        { mod: "createbigcannons", output: 'createbigcannons:steel_scrap' },
        { mod: "createbigcannons", output: '#c:nuggets/nethersteel' },

        { mod: "createbigcannons", output: '#createbigcannons:ingot_bronze' },
        { mod: "createbigcannons", output: '#createbigcannons:ingot_cast_iron' },
        { mod: "createbigcannons", output: 'createbigcannons:steel_ingot' },
        { mod: "createbigcannons", output: '#createbigcannons:ingot_nethersteel' },

        { mod: "createbigcannons", output: '#createbigcannons:block_bronze' },
        { mod: "createbigcannons", output: '#createbigcannons:block_cast_iron' },
        { mod: "createbigcannons", output: 'createbigcannons:steel_block' },
        { mod: "createbigcannons", output: 'createbigcannons:nethersteel_block' },

        { mod: "createbigcannons", output: "createbigcannons:empty_powder_charge" },

        { input: 'createbigcannons:gunpowder_pinch' },
        { output: 'createbigcannons:gunpowder_pinch' },

        { mod: "createbigcannons", output: '#createbigcannons:guncotton' },

        { type: 'createbigcannons:melting' },
        { id: 'createbigcannons/mixing/guncotton' },

        { id: "createbigcannons:sequenced_assembly/pressing_autocannon_cartridge", output: 'createbigcannons:big_cartridge'}
    ]);
    // #endregion

    //#region Replace Fluids
    //#endregion

    //#region Replace Items/Blocks
    event.replaceInput({}, '#createbigcannons:nugget_cast_iron', '#forge:nuggets/iron');
    event.replaceInput({}, '#createbigcannons:ingot_cast_iron', '#forge:ingots/iron');
    event.replaceInput({}, '#createbigcannons:block_cast_iron', '#forge:storage_blocks/iron');
    //#endregion

    //#region Custom
    // Cannons Casting MAP was removed due to changes in data
    // results: OutputItem_[], ingredient: InputItem_, sequence: Internal.RecipeJS_[], transitionalItem?: OutputItem_, loops?: number

    /* event.custom({ // CURRENTLY USING ANOTHER METHOD
        "type": "create:sequenced_assembly",
        "ingredient": {
            "item": 'createbigcannons:big_cartridge_sheet'
        },
        "loops": 3,
        "results": [
            Item.of('createbigcannons:big_cartridge', '{Power:0}')
        ],
        "sequence": [
            {
                "type": "create:pressing",
                "ingredients": [
                    {
                        "item": "createbigcannons:partially_formed_big_cartridge"
                    }
                ],
                "results": [
                    {
                        "item": "createbigcannons:partially_formed_big_cartridge"
                    }
                ]
            }
        ],
        "transitionalItem": {
            "item": "createbigcannons:partially_formed_big_cartridge"
        }
    }); */

    // #endregion


    // #region Shaped Crafting
    event.shaped('2x createbigcannons:casting_sand', [
        'ABA',
        'CDC',
        'ABA'
    ], {
        A: '#forge:powders/graphite',
        B: '#forge:dusts/kaolinite',
        C: '#forge:sand',
        D: '#forge:ingots/clay'
    }).id('t5a:cbc/castingsand')

    event.shaped('2x createbigcannons:empty_powder_charge', [
        '   ',
        ' A ',
        ' B '
    ], {
        B: '#forge:cloth',
        A: '#forge:string'
    }).id('t5a:cbc/empty_powder_charge')
    // #endregion

    // #region Pressing/Forge Hammer

    // Packed Gunpowder
    event.recipes.greate
        .pressing('createbigcannons:packed_gunpowder', '3x #forge:gunpowder')
        .recipeTier(1)
        .id("t5a:cbc/pressing/packed_gunpowder")
    event.recipes.gtceu
        .forge_hammer("t5a:cbc/forge_hammer/packed_gunpowder")
        .itemInputs('3x #forge:gunpowder')
        .itemOutputs('createbigcannons:packed_gunpowder')
        .EUt(GTValues.VA[GTValues.LV])
        .duration(30)


    // Packed Guncotton
    event.recipes.greate
        .pressing(
            ['1x createbigcannons:packed_guncotton'],
            ['3x createbigcannons:guncotton']
        )
        .circuitNumber(1)
        .recipeTier(2)
        .id("t5a:cbc/pressing/packed_guncotton")
    event.recipes.gtceu
        .forge_hammer("t5a:cbc/forge_hammer/packed_guncotton")
        .itemInputs('3x createbigcannons:guncotton')
        .itemOutputs('createbigcannons:packed_guncotton')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(20)
    // #endregion


    // #region Mixing

    // Guncotton
    event.recipes.gtceu
        .mixer("t5a:cbc/mixer/guncotton")
        .itemInputs('1x #forge:paper', '2x tfg:nitrocellulose')
        .inputFluids(Fluid.of('gtceu:distilled_water', 100))
        .itemOutputs('3x createbigcannons:guncotton')
        .EUt(GTValues.VA[GTValues.MV])
        .duration(50)
    // #endregion

    // #region Sequencied
    event.recipes.createSequencedAssembly([
        Item.of('createbigcannons:big_cartridge', 1, '{Power:0}'),
    ], 'createbigcannons:big_cartridge_sheet', [
        event.recipes.createPressing('createbigcannons:partially_formed_big_cartridge', ['createbigcannons:partially_formed_big_cartridge']),
    ]).transitionalItem('createbigcannons:partially_formed_big_cartridge').loops(4).id('t5a:cbc/sequenced_assembly/big_cartridge')
    // #endregion
}
