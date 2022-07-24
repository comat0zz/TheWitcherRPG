import { WITCHER } from "./config.js";
import { registerSystemSettings } from "./settings.js";
import { initializeHandlebars } from "./handlebars.js";

import { WitcherItemSheetProxy } from "./items/ItemSheetProxy.js";
import { WitcherItemProxy } from "./items/ItemProxy.js";

import { WitcherActorSheetProxy } from "./actors/ActorSheetProxy.js";
import { WitcherActorProxy } from "./actors/ActorProxy.js";

Hooks.once("init", function () {

    console.log("The Witcher RPG | init system");

    CONFIG.WITCHER = WITCHER;

    CONFIG.Item.documentClass = WitcherItemProxy;
    CONFIG.Actor.documentClass = WitcherActorProxy;

    // Register sheet application classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("witcher", WitcherActorSheetProxy, {
      label: "Witcher.Sheet.Actor",
      makeDefault: true
    });

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("witcher", WitcherItemSheetProxy, {
        label: "Witcher.Sheet.Item",
        makeDefault: true,
    });
    
    initializeHandlebars();
    registerSystemSettings();
});