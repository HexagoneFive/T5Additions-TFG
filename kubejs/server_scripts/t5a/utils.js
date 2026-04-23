// priority: 90
"use strict"

import '../../probe/generated/constants'
import '../../probe/generated/events'
import '../../probe/generated/globals'
import '../../probe/generated/registries'
import '../../probe/generated/tag_events'
import '../../probe/generated/internals/internal_47'

global.T5A = global.T5A ? global.T5A : {}
global.T5A.utils = {
    /**
     * @param {TagEvent.Item} event 
     * @param {String | Internal.ItemStack} item 
     */
    disableItem: (event, item) => {
        event.removeAllTagsFrom(item)
        event.add('c:hidden_from_recipe_viewers', item)
    },

    /**
     * @param {Internal.RecipesEventJS} event 
     * @param {String | String[]} ids 
     * @param {object} [options]
     */
    removeIORecipe: (event, ids, options) => {
        // Fallback for default parameters
        options = options || { input: true, output: true }
        
        const list = Array.isArray(ids) ? ids : [ids]
        list.forEach(id => {
            if (options.input) event.remove({ input: id })
            if (options.output) event.remove({ output: id })
        })
    },

    replaceRecipeInput: (event, targetOutput, oldInput, newInput) => {
        event.replaceInput(
            { output: targetOutput }, 
            oldInput,                 
            newInput                  
        );
    },

    replaceMultipleInputs: (event, replacements) => {
        replacements.forEach(req => {
            event.replaceInput(
                { output: req.output }, 
                req.old, 
                req.new 
            );
        });
    },

    replaceWithShapeless: (event, output, newInputs, customId) => {
        event.remove({ output: output });
        const newRecipe = event.shapeless(output, newInputs);
        
        if (customId) {
            newRecipe.id(customId);
        } else {
            const cleanName = output.replace(':', '_');
            newRecipe.id(`t5a:replace_shapeless/${cleanName}`);
        }
    },

    replaceWithShaped: (event, old_id, output, pattern, keys, customId) => {
        event.remove({ id: old_id });
        const newRecipe = event.shaped(output, pattern, keys);
        
        if (customId) {
            newRecipe.id(customId);
        } else {
            const cleanName = output.replace(':', '_');
            newRecipe.id(`t5a:replace_shaped/${cleanName}`);
        }
    },

    shaped: (event, output, pattern, keys, module_, customId) => {
        module_ = module_ || 'custom'
        const newRecipe = event.shaped(output, pattern, keys);
        
        if (customId) {
            newRecipe.id(customId);
        } else {
            const path = String(output.id || output).split(':')[1];
            const id_ = 't5a:' + module_ + '/shaped/' + path
            newRecipe.id(id_);
        }
    },

    toolShaped: (event, id, output, shape, keys, tools) => {
        // Fallbacks for default parameters
        keys = keys || {}
        tools = tools || {}
        
        const defaultTools = {
            H: '#forge:tools/hammers',     F: '#forge:tools/files',
            C: '#tfc:chisels',             B: '#forge:tools/crowbars',
            S: '#forge:tools/saws',        P: '#forge:tools/plungers',
            V: '#forge:tools/screwdrivers',T: '#forge:tools/wire_cutters',
            M: '#forge:tools/mallets',     R: '#forge:tools/mortars',
            W: '#forge:tools/wrench',      K: '#forge:tools/knives'
        }
        const ingredients = Object.assign({}, defaultTools, tools, keys)
        event.shaped(output, shape, ingredients).id(id)
    },

    forgeHammer: (event, output, input, module_, options) => {
        // Fallbacks for default parameters
        module_ = module_ || 'custom'
        options = options || {}
        
        const circuit = options.circuit !== undefined ? options.circuit : 5;
        const tier = options.tier !== undefined ? options.tier : GTValues.ULV;
        const duration = options.duration !== undefined ? options.duration : 30;

        const path = String(output.id || output).split(':')[1];
        const idpacking = 't5a:' + module_ + '/compacting/' + path
        const idforge_hammer = 't5a:' + module_ + '/forge_hammer/' + path
        
        event.recipes.greate.compacting(output, input)
            .recipeTier(tier)
            .circuitNumber(circuit)
            .processingTime(duration)
            .id(idpacking)
            
        event.recipes.gtceu.forge_hammer(idforge_hammer)
            .itemInputs(input)
            .itemOutputs(output)
            .EUt(GTValues.VA[tier])
            .duration(duration)
    },

    assembler: (event, output, inputs, inputsf, module_, options) => {
        // Fallbacks for default parameters
        module_ = module_ || 'custom'
        options = options || {}
        
        const tier = options.tier !== undefined ? options.tier : GTValues.ULV;
        const circuit = options.circuit !== undefined ? options.circuit : 5;
        const duration = options.duration !== undefined ? options.duration : 100; // Original code defaulted duration to 150 in signature but 100 in destructuring. I kept 100 here.

        
        const path = String(output.id || output).split(':')[1];
        const id = 't5a:' + module_ + '/assembler/' + path
        console.log(output, path, id, inputsf)
        
        inputs = Array.isArray(inputs) ? inputs : [inputs]
        inputsf = Array.isArray(inputsf) ? inputsf : [inputsf] // Note: fixed a typo from your original code 'inputf' to 'inputsf'
        
        const assember = event.recipes.gtceu.assembler(id)
        if (typeof inputs[0] !== 'undefined')   assember.itemInputs(inputs);
        if (typeof inputsf[0] !== 'undefined')  assember.inputFluids(inputsf);
        if (output)                             assember.itemOutputs(output);
        if (typeof tier === "number")           assember.EUt(GTValues.VA[tier]);
        if (typeof duration === "number")       assember.duration(duration);
        if (typeof circuit === "number")        assember.circuit(circuit);
    },

    /**
     * 
     * @param {Internal.RecipesEventJS} event 
     * @param {*} output 
     * @param {*} inputs 
     * @param {*} inputsf 
     * @param {*} module_ 
     * @param {*} options 
     */
    mixer: (event, output, inputs, inputsf, module_, options) => {
        // Fallbacks for default parameters
        module_ = module_ || 'custom'
        options = options || {}
        
        const tier = options.tier !== undefined ? options.tier : GTValues.ULV;
        const circuit = options.circuit !== undefined ? options.circuit : 5;
        const duration = options.duration !== undefined ? options.duration : 100;

        const path = String(output.id || output).split(':')[1];
        const id = 't5a:' + module_ + '/mixer/' + path
        
        inputs = Array.isArray(inputs) ? inputs : [inputs]
        inputsf = typeof inputsf === "undefined" ? undefined : Array.isArray(inputsf) ? inputsf : [inputsf] // Note: fixed a typo from your original code 'inputf' to 'inputsf'
        
        event.recipes.gtceu.mixer(id)
            .itemInputs(inputs)
            .inputFluids(inputsf)
            .itemOutputs(output)
            .EUt(GTValues.VA[tier])
            .duration(duration)
            .circuit(circuit)
    },
}