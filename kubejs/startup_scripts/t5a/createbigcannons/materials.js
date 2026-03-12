// priority: 0
"use strict";

const registerCBCMaterials = (event)=>{
    event.create("t5a:calcium_carbide")
        .dust()
        .components('1x calcium', '2x carbon')
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .color(0xFFFFFF)
        .secondaryColor(0xF0F0F0)
        .formula("CaC2")

    event.create("t5a:calcium_cyanamide")
        .dust()
        .components('1x calcium', '2x carbon', '2x nitrogen')
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .color(0xFFFFFF)
        .secondaryColor(0x464646)
        .formula("CaCN2")

    event.create("t5a:ammonium_nitrate")
        .dust()
        .components("2x nitrogen", "4x hydrogen", "3x oxygen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .color(0xFFFFFF)
        .formula("NH4(NO3)")

    event.create("t5a:guanidine_nitrate")
        .dust()
        .components("1x carbon", "6x hydrogen","4x nitrogen", "3x oxygen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .color(0xFFFFFF)
        .formula("CH5N3(HNO3)")

    event.create("t5a:nitroguanidine")
        .dust()
        .components("1x carbon", "4x hydrogen","4x nitrogen", "2x oxygen")
        .flags(GTMaterialFlags.EXPLOSIVE, GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .color(0xFFFFFF)
        .secondaryColor(0xFDFD96)
        .formula("CH4N4O")

    event.create("t5a:dicyandiamide")
        .dust()
        .components("2x carbon", "4x hydrogen","4x nitrogen")
        .flags(GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING)
        .color(0xFFFFFF)
        .formula("C2H4N4")
}