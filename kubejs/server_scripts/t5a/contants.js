// priority: 100
"use strict"

global.T5A_CONSTANTS = {
    // Unificamos os itens do T5A e do CBC que precisam ser escondidos
    DISABLED_ITEMS: [
        'create:iron_sheet',
        'createbigcannons:nugget_bronze',
        'createbigcannons:nugget_cast_iron',
        'createbigcannons:steel_scrap',
        'createbigcannons:ingot_bronze',
        'createbigcannons:ingot_cast_iron',
        'createbigcannons:steel_ingot',
        'createbigcannons:ingot_nethersteel',
        'createbigcannons:block_bronze',
        'createbigcannons:block_cast_iron',
        'createbigcannons:cast_iron_block',
        'createbigcannons:bronze_block',
        'createbigcannons:steel_block',
        'createbigcannons:nethersteel_block',
        'createbigcannons:cast_iron_ingot',
        'createbigcannons:bronze_scrap',
        'createbigcannons:cast_iron_nugget',
        'createbigcannons:nethersteel_nugget',
        'createbigcannons:hardened_nitro',
        'createbigcannons:congealed_nitro',
        'createbigcannons:gunpowder_pinch',
        'createbigcannons:molten_steel_bucket',
        'createbigcannons:molten_cast_iron_bucket',
        'createbigcannons:molten_bronze_bucket',
        'createbigcannons:molten_nethersteel_bucket',
        'createbigcannons:gunpowder_pinch',
        'createbigcannons:spring_wire',
        'createbigcannons:cannon_builder',
    ],

    DISABLED_RECIPE_TYPES: [
        'createbigcannons:melting'
    ],

    CBC_MOULDS: {
        't5a:cbc/autocannon_recoil_spring_cast_mould': { result: 'createbigcannons:autocannon_recoil_spring_cast_mould', pattern: ['  A', '   '] },
        't5a:cbc/autocannon_barrel_cast_mould': { result: 'createbigcannons:autocannon_barrel_cast_mould', pattern: [' A ', '   '] },
        't5a:cbc/autocannon_breech_cast_mould': { result: 'createbigcannons:autocannon_breech_cast_mould', pattern: ['A  ', '   '] },
        't5a:cbc/screw_breech_cast_mould': { result: 'createbigcannons:screw_breech_cast_mould', pattern: ['AA ', '   '] },
        't5a:cbc/very_small_cast_mould': { result: 'createbigcannons:very_small_cast_mould', pattern: ['A  ', 'A  '] },
        't5a:cbc/small_cast_mould': { result: 'createbigcannons:small_cast_mould', pattern: ['AA ', 'AA '] },
        't5a:cbc/medium_cast_mould': { result: 'createbigcannons:medium_cast_mould', pattern: [' AA', ' AA'] },
        't5a:cbc/large_cast_mould': { result: 'createbigcannons:large_cast_mould', pattern: ['AAA', 'AA '] },
        't5a:cbc/very_large_cast_mould': { result: 'createbigcannons:very_large_cast_mould', pattern: ['AAA', 'AAA'] },
        't5a:cbc/cannon_end_cast_mould': { result: 'createbigcannons:cannon_end_cast_mould', pattern: ['AAA', ' A '] },
        't5a:cbc/sliding_breech_cast_mould': { result: 'createbigcannons:sliding_breech_cast_mould', pattern: ['A A', 'AAA'] }
    },

    FORGE_HAMMER_RECIPES: [
        {output: '3x createbigcannons:packed_gunpowder', input: Item.of('#forge:gunpowder', 3), module: 'cbc', options:{tier: GTValues.ULV, circuit: 5, duration: 30}},
        {output: 'createbigcannons:packed_guncotton', input: '3x createbigcannons:guncotton', module: 'cbc', options:{tier: GTValues.ULV, circuit: 5, duration: 30}},
    ]

}