import { ArmorItem } from "./types/ArmorItem.js";
import { SubstancesItem } from "./types/SubstancesItem.js";
import { EnhancementItem } from "./types/EnhancementItem.js";
import { WeaponItem } from "./types/WeaponItem.js";
import { ValuableItem } from "./types/ValuableItem.js";
import { AlchemicalItem } from "./types/AlchemicalItem.js";
import { ComponentItem } from "./types/ComponentItem.js";
import { DiagramsItem } from "./types/DiagramsItem.js";
import { MutagenItem } from "./types/MutagenItem.js";
import { SpellItem } from "./types/SpellItem.js";
import { ProfessionItem } from "./types/ProfessionItem.js";
import { NoteItem } from "./types/NoteItem.js";
import { RaceItem } from "./types/RaceItem.js";
import { EffectsItem } from "./types/EffectsItem.js";
import { Mount_gearItem } from "./types/Mount_gearItem.js";
import { BulletsItem } from "./types/BulletsItem.js";
import { AlhformulasItem } from "./types/AlhformulasItem.js";
import { SkillsItem } from "./types/SkillsItem.js";
import { StatsItem } from "./types/StatsItem.js";

const itemMappings = {
  substances: SubstancesItem,
  enhancement: EnhancementItem,
  armor: ArmorItem,
  weapon: WeaponItem,
  valuable: ValuableItem,
  alchemical: AlchemicalItem,
  component: ComponentItem,
  diagrams: DiagramsItem,
  mutagen: MutagenItem,
  spell: SpellItem,
  profession: ProfessionItem,
  note: NoteItem,
  race: RaceItem,
  effects: EffectsItem,
  mount_gear: Mount_gearItem,
  bullets: BulletsItem,
  alhformulas: AlhformulasItem,
  stats: StatsItem,
  skills: SkillsItem
}

/**
 * Polymorphic base class.
 * Should be fairly empty, only containing functionality that all items should have regardless of type.
 * https://foundryvtt.wiki/en/development/guides/polymorphism-actors-items
 */
export const WitcherItemProxy = new Proxy(function () {}, {
  //Will intercept calls to the "new" operator
  construct: function (target, args) {
    const [data] = args;

    //Handle missing mapping entries
    if (!itemMappings.hasOwnProperty(data.type))
      throw new Error("Unsupported Entity type for create(): " + data.type);

    //Return the appropriate, actual object from the right class
    return new itemMappings[data.type](...args);
  },

  //Property access on this weird, dirty proxy object
  get: function (target, prop, receiver) {
    switch (prop) {
      case "create":
      case "createDocuments":
        //Calling the class' create() static function
        return function (data, options) {
          if (data.constructor === Array) {
            //Array of data, this happens when creating Actors imported from a compendium
            return data.map(i => Item.create(i, options));
          }

          if (!itemMappings.hasOwnProperty(data.type))
            throw new Error("Unsupported Entity type for create(): " + data.type);

          return itemMappings[data.type].create(data, options);
        };

      case Symbol.hasInstance:
        //Applying the "instanceof" operator on the instance object
        return function (instance) {
          return Object.values(itemMappings).some(i => instance instanceof i);
        };

      default:
        //Just forward any requested properties to the base Actor class
        return Item[prop];
    }
  },

});