/**
 * The Witcher RPG Configuration Values
 *
 * A dictionary of dictionaries providing configuration data like formulae,
 * translation keys, and other configuration values. Translations keys are
 * assumed to get replaced by their proper translation when the system is loaded.
 *
 * The WITCHER object may be adjusted to influence the system's behaviour during runtime.
 *
 * @module config
 */

export const WITCHER = {};
    
WITCHER.imageRef = "systems/TheWitcherRPG/asset/{filename}";

// Weapon and bullets damage types 
WITCHER.typeDamage = {
    slashing: {
      short: "Witcher.Item.TypeDamages.Slashing.Short",
      long: "Witcher.Item.TypeDamages.Slashing.Long"
    },
    piercing: {
      short: "Witcher.Item.TypeDamages.Piercing.Short",
      long: "Witcher.Item.TypeDamages.Piercing.Long"
    },
    bludgeoning: {
      short: "Witcher.Item.TypeDamages.Bludgeoning.Short",
      long: "Witcher.Item.TypeDamages.Bludgeoning.Long"
    },
    elemental: {
      short: "Witcher.Item.TypeDamages.Elemental.Short",
      long: "Witcher.Item.TypeDamages.Elemental.Long"
    }
  }

// Concealment (CONC.) weapons
WITCHER.typeCONC = {
    noType: {
      short: "",
      long: ""
    },
    tiny: {
      short: "Witcher.Item.Concealment.Tiny.Short",
      long: "Witcher.Item.Concealment.Tiny.Long"
    },
    small: {
        short: "Witcher.Item.Concealment.Small.Short",
        long: "Witcher.Item.Concealment.Small.Long"
      },
    large: {
        short: "Witcher.Item.Concealment.Large.Short",
        long: "Witcher.Item.Concealment.Large.Long"
      },
    canthide: {
        short: "Witcher.Item.Concealment.CantHide.Short",
        long: "Witcher.Item.Concealment.CantHide.Long"
      },
}

// Components categories
WITCHER.ComponentsCategories = {
    craftmaterial: "Witcher.Item.Components.Categories.CraftingMaterials",
    hidesanimal: "Witcher.Item.Components.Categories.HidesAnimalParts",
    alchreatments: "Witcher.Item.Components.Categories.AlchemicalTreatments",
    igotsmaterail: "Witcher.Item.Components.Categories.IngotsMinerals",
    substances: "Witcher.Item.Components.Categories.Substances"
}

// Rarity Item
WITCHER.RarityItem = {
    everywhere: {
      short: "Witcher.Item.Rarity.Everywhere.Short",
      long: "Witcher.Item.Rarity.Everywhere.Long",
      tips: "Witcher.Item.Rarity.Everywhere.Tips"
    },
    common: {
      short: "Witcher.Item.Rarity.Common.Short",
      long: "Witcher.Item.Rarity.Common.Long",
      tips: "Witcher.Item.Rarity.Common.Tips"
    },
    poor: {
      short: "Witcher.Item.Rarity.Poor.Short",
      long: "Witcher.Item.Rarity.Poor.Long",
      tips: "Witcher.Item.Rarity.Poor.Tips"
    },
    rare: {
      short: "Witcher.Item.Rarity.Rare.Short",
      long: "Witcher.Item.Rarity.Rare.Long",
      tips: "Witcher.Item.Rarity.Rare.Tips"
    }
}

WITCHER.magicType = {
  spell: "Witcher.Item.Spells.MagicType.Spells",
  invocPriest: "Witcher.Item.Spells.MagicType.InvocPriest",
  invocDruid: "Witcher.Item.Spells.MagicType.InvocDruid",
  invocHighPriest: "Witcher.Item.Spells.MagicType.InvocHighPriest",
  ritual: "Witcher.Item.Spells.MagicType.Ritual",
  injury: "Witcher.Item.Spells.MagicType.Injury",
  signs: "Witcher.Item.Spells.MagicType.Signs",
  gifts: "Witcher.Item.Spells.MagicType.Gifts"
}

WITCHER.magicElement = {
  mixed: "Witcher.Item.Spells.MagicElement.Mixed",  
  water: "Witcher.Item.Spells.MagicElement.Water",
  fire: "Witcher.Item.Spells.MagicElement.Fire",
  air: "Witcher.Item.Spells.MagicElement.Air",
  earth: "Witcher.Item.Spells.MagicElement.Earth"
}

WITCHER.LevelType = {
  newbie: "Witcher.Item.LevelType.Newbie",
  prentice: "Witcher.Item.LevelType.Prentice",
  master: "Witcher.Item.LevelType.Master",
  highmaster: "Witcher.Item.LevelType.HighMaster"
}

WITCHER.DistantionType = {
  accurate: "Witcher.Item.Spells.DistantionType.Accurate",
  cone: "Witcher.Item.Spells.DistantionType.Cone",
  self: "Witcher.Item.Spells.DistantionType.Self",
  zone: "Witcher.Item.Spells.DistantionType.Zone",
  selfzone: "Witcher.Item.Spells.DistantionType.Selfzone",
  selfacc: "Witcher.Item.Spells.DistantionType.Selfacc",
  unlimited: "Witcher.Item.Spells.DistantionType.Unlimited"
}

WITCHER.SourceList = {
  core: "Witcher.SourceList.Core",
  chaos: "Witcher.SourceList.Chaos"
}

WITCHER.SpellsDefences = {
  no: "Witcher.Item.Spells.Defence.no",
  evasion: "Witcher.Item.Spells.Defence.evasion",
  blocking: "Witcher.Item.Spells.Defence.blocking",
  evblo: "Witcher.Item.Spells.Defence.evblo",
  magic: "Witcher.Item.Spells.Defence.magic"
}

WITCHER.Hazards = {
  low: "Witcher.Hazards.low",
  medium: "Witcher.Hazards.medium",
  high: "Witcher.Hazards.high"
}

WITCHER.SpellsGiftsType = {
  small: "Witcher.Item.Spells.giftsType.Small",
  big: "Witcher.Item.Spells.giftsType.Big"
}

WITCHER.diagramsType = {
  weapon: "Witcher.Item.Diagrams.Types.weapon",
  weaponHigh: "Witcher.Item.Diagrams.Types.weaponHigh",
  armor: "Witcher.Item.Diagrams.Types.armor",
  armorHigh: "Witcher.Item.Diagrams.Types.armorHigh",
  component: "Witcher.Item.Diagrams.Types.component",
  ammunition: "Witcher.Item.Diagrams.Types.ammunition",
  gain: "Witcher.Item.Diagrams.Types.gain",
  valuable: "Witcher.Item.Diagrams.Types.valuable",
  mountgear: "Witcher.Item.Diagrams.Types.mountgear",
  cart: "Witcher.Item.Diagrams.Types.cart"
}

WITCHER.ValuablesTypes = {
  tools: "Witcher.Item.Valuables.Types.Tools",
	standardEquip: "Witcher.Item.Valuables.Types.StandardEquip",
	containers: "Witcher.Item.Valuables.Types.Containers",
	eatDrink: "Witcher.Item.Valuables.Types.EatDrink",
	clothing: "Witcher.Item.Valuables.Types.Clothing"
}

WITCHER.mountGearTypes = {
  saddles: "Witcher.Item.MountGears.Saddles",
  blinders:  "Witcher.Item.MountGears.Blinders",
  slingBags: "Witcher.Item.MountGears.SlingBags",
  horseArmor: "Witcher.Item.MountGears.HorseArmor"
}