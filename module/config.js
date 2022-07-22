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
      long: "Witcher.Item.TypeDamages.Slashing.Long",
      tips: "Witcher.Item.TypeDamages.Slashing.Tips"
    },
    piercing: {
      short: "Witcher.Item.TypeDamages.Piercing.Short",
      long: "Witcher.Item.TypeDamages.Piercing.Long",
      tips: "Witcher.Item.TypeDamages.Piercing.Tips"
    },
    bludgeoning: {
      short: "Witcher.Item.TypeDamages.Bludgeoning.Short",
      long: "Witcher.Item.TypeDamages.Bludgeoning.Long",
      tips: "Witcher.Item.TypeDamages.Bludgeoning.Tips"
    },
    elemental: {
      short: "Witcher.Item.TypeDamages.Elemental.Short",
      long: "Witcher.Item.TypeDamages.Elemental.Long",
      tips: "Witcher.Item.TypeDamages.Elemental.Tips"
    }
  }

// Concealment (CONC.) weapons
WITCHER.typeCONC = {
    tiny: {
      short: "Witcher.Item.Concealment.Short",
      long: "Witcher.Item.Concealment.Long",
      tips: "Witcher.Item.Concealment.Tips"
    },
    small: {
        short: "Witcher.Item.Small.Short",
        long: "Witcher.Item.Small.Long",
        tips: "Witcher.Item.Small.Tips"
      },
    large: {
        short: "Witcher.Item.Large.Short",
        long: "Witcher.Item.Large.Long",
        tips: "Witcher.Item.Large.Tips"
      },
    canthide: {
        short: "Witcher.Item.CantHide.Short",
        long: "Witcher.Item.CantHide.Long",
        tips: "Witcher.Item.CantHide.Tips"
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
  newbie: "Witcher.Item.Spells.LevelType.Newbie",
  prentice: "Witcher.Item.Spells.LevelType.Prentice",
  master: "Witcher.Item.Spells.LevelType.Master"
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