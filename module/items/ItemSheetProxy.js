import { SubstancesItemSheet } from "./sheets/SubstancesItemSheet.js";
import { EnhancementItemSheet } from "./sheets/EnhancementItemSheet.js";
import { ArmorItemSheet } from "./sheets/ArmorItemSheet.js";
import { WeaponItemSheet } from "./sheets/WeaponItemSheet.js";
import { ValuableItemSheet } from "./sheets/ValuableItemSheet.js";
import { AlchemicalItemSheet } from "./sheets/AlchemicalItemSheet.js";
import { ComponentItemSheet } from "./sheets/ComponentItemSheet.js";
import { DiagramsItemSheet } from "./sheets/DiagramsItemSheet.js";
import { MutagenItemSheet } from "./sheets/MutagenItemSheet.js";
import { SpellItemSheet } from "./sheets/SpellItemSheet.js";
import { ProfessionItemSheet } from "./sheets/ProfessionItemSheet.js";
import { NoteItemSheet } from "./sheets/NoteItemSheet.js";
import { RaceItemSheet } from "./sheets/RaceItemSheet.js";
import { EffectsItemSheet } from "./sheets/EffectsItemSheet.js";
import { Mount_gearItemSheet } from "./sheets/Mount_gearItemSheet.js";
import { BulletsItemSheet } from "./sheets/BulletsItemSheet.js";
import { AlhformulasItemSheet } from "./sheets/AlhformulasItemSheet.js";
import { SkillsItemSheet } from "./sheets/SkillsItemSheet.js";
import { StatsItemSheet } from "./sheets/StatsItemSheet.js";

const itemSheetMappings = {
  substances: SubstancesItemSheet,
  enhancement: EnhancementItemSheet,
  armor: ArmorItemSheet,
  weapon: WeaponItemSheet,
  valuable: ValuableItemSheet,
  alchemical: AlchemicalItemSheet,
  component: ComponentItemSheet,
  diagrams: DiagramsItemSheet,
  mutagen: MutagenItemSheet,
  spell: SpellItemSheet,
  profession: ProfessionItemSheet,
  note: NoteItemSheet,
  race: RaceItemSheet,
  effects: EffectsItemSheet,
  mount_gear: Mount_gearItemSheet,
  bullets: BulletsItemSheet,
  alhformulas: AlhformulasItemSheet,
  skills: SkillsItemSheet,
  stats: StatsItemSheet
}

/**
 * Polymorphic base class.
 * Should be fairly empty, only containing functionality that all items should have regardless of type.
 * https://foundryvtt.wiki/en/development/guides/polymorphism-actors-items
 */
 export const WitcherItemSheetProxy = new Proxy(function () {}, {
  //Will intercept calls to the "new" operator
  construct: function (target, args) {
    const [data] = args;

    //Handle missing mapping entries
    if (!itemSheetMappings.hasOwnProperty(data.type))
      throw new Error("Unsupported Sheet type for create(): " + data.type);

    //Return the appropriate, actual object from the right class
    return new itemSheetMappings[data.type](...args);
  },

  //Property access on this weird, dirty proxy object
  get: function (target, prop, receiver) {
    switch (prop) {
      case "create":
      case "createDocuments":
        //Calling the class' create() static function
        return function (data, options) {
          if (data.constructor === Array) {
            //Array of data, this happens when creating Sheets imported from a compendium
            return data.map(i => NumeneraActor.create(i, options));
          }

          if (!itemSheetMappings.hasOwnProperty(data.type))
            throw new Error("Unsupported Sheet type for create(): " + data.type);

          return itemSheetMappings[data.type].create(data, options);
        };

      case Symbol.hasInstance:
        //Applying the "instanceof" operator on the instance object
        return function (instance) {
          return Object.values(itemSheetMappings).some(i => instance instanceof i);
        };

      default:
        //Just forward any requested properties to the base ItemSheet class
        return ItemSheet[prop];
    }
  },

});