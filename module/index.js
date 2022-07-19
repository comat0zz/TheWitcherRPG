import { WITCHER } from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { initializeHandlebars } from "./handlebars.js";

import { WitcherItemSheet } from "./items/sheets/WitcherItemSheet.js";

import { WitcherItemProxy } from "./items/proxy.js";


Hooks.once("init", function () {

    console.log("TheWitcherRPG | init system");

    CONFIG.WITCHER = WITCHER;

    CONFIG.Item.documentClass = WitcherItemProxy;

    // Register sheet application classes
    //Actors.unregisterSheet("core", ActorSheet);
    //Items.unregisterSheet("core", ItemSheet);

    
    Items.registerSheet("witcher", WitcherItemSheet, {
        label: "Witcher.Sheet.Item",
        types: ["substances"],
        makeDefault: true,
      });
    

    initializeHandlebars();
});