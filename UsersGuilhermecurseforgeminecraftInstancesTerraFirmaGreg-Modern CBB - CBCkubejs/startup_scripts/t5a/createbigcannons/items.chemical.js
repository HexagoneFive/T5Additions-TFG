// priority: 0
"use strict";


/**
 * 
 * @param {Registry.Item} event 
 */
const registerCBCItems = (event)=>{
    event.create("t5a:calcium_carbide").displayName("Calcium Carbide").texture('t5a:item/calcium_carbide').maxStackSize(64)
    event.create("t5a:calcium_cyanamide").displayName("Calcium Cyanamide").texture('t5a:item/calcium_cyanamide').maxStackSize(64)
    event.create("t5a:ammonium_nitrate").displayName("Ammonium Nitrate").texture('t5a:item/ammonium_nitrate').maxStackSize(64)
    event.create("t5a:guanidine_nitrate").displayName("Guanidine Nitrate").texture('t5a:item/guanidine_nitrate').maxStackSize(64)
    event.create("t5a:nitroguanidine").displayName("Nitroguanidine").texture('t5a:item/nitroguanidine').maxStackSize(64)
    event.create("t5a:dicyandiamide").displayName("Dicyandiamide").texture('t5a:item/dicyandiamide').maxStackSize(64)
}//Dicyandiamide C2H4N4