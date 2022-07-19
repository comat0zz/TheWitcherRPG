import { WITCHER } from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { initializeHandlebars } from "./handlebars.js";

import { WitcherItemSheetProxy } from "./items/ItemSheetProxy.js";
import { WitcherItemProxy } from "./items/ItemProxy.js";


Hooks.once("init", function () {

    console.log("TheWitcherRPG | init system");

    CONFIG.WITCHER = WITCHER;

    CONFIG.Item.documentClass = WitcherItemProxy;

    // Register sheet application classes
    //Actors.unregisterSheet("core", ActorSheet);
    //Items.unregisterSheet("core", ItemSheet);

    
    Items.registerSheet("witcher", WitcherItemSheetProxy, {
        label: "Witcher.Sheet.Item",
        types: ["substances", "bullets"],
        makeDefault: true,
      });
    

    initializeHandlebars();
});