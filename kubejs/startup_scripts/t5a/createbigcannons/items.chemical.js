// priority: 0
"use strict";


/**
 * 
 * @param {Registry.Item} event 
 */
const registerCBCItems = (event)=>{
    event.create("t5a:calcium_carbide").displayName("Calcium Carbide").texture('t5a:item/calcium_carbide').maxStackSize(64).components('1x calcium', '2x carbon').flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
    event.create("t5a:calcium_cyanamide").displayName("Calcium Cyanamide").texture('t5a:item/calcium_cyanamide').maxStackSize(64).components('1x calcium', '2x carbon', '2x nitrogen').flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
    event.create("t5a:ammonium_nitrate").displayName("Ammonium Nitrate").texture('t5a:item/ammonium_nitrate').maxStackSize(64).components("2x nitrogen", "4x hydrogen", "3x oxygen").flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
    event.create("t5a:guanidine_nitrate").displayName("Guanidine Nitrate").texture('t5a:item/guanidine_nitrate').maxStackSize(64).components("1x carbon", "6x hydrogen","4x nitrogen", "3x oxygen").flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
    event.create("t5a:nitroguanidine").displayName("Nitroguanidine").texture('t5a:item/nitroguanidine').maxStackSize(64).components("1x carbon", "4x hydrogen","4x nitrogen", "2x oxygen").flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
    event.create("t5a:dicyandiamide").displayName("Dicyandiamide").texture('t5a:item/dicyandiamide').maxStackSize(64).components("2x carbon", "4x hydrogen","4x nitrogen").flags(GTMaterialFlags.DISABLE_DECOMPOSITION)
}//Dicyandiamide C2H4N4