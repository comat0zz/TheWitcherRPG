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
    
WITCHER.fileAssets = "systems/TheWitcherRPG/assets";
WITCHER.imgAssets = `${WITCHER.fileAssets}/images`; 

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

WITCHER.magicCategories = {
  magicspell: "Witcher.Item.Spells.MagicType.Spells",
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
  chaos: "Witcher.SourceList.Chaos",
  LordsLands: "Witcher.SourceList.LordsLands",
  WitcherJournal: "Witcher.SourceList.WitcherJournal",
  Rendolf14: "Witcher.SourceList.Rendolf14",
  BookOfTales: "Witcher.SourceList.BookOfTales",
  RendolfProfTools: "Witcher.SourceList.RendolfProfTools",
  WitcherTools: "Witcher.SourceList.WitcherTools",
  Prosthesesand: "Witcher.SourceList.Prosthesesand",
  SchoolManticora: "Witcher.SourceList.SchoolManticora",
  SchoolSnail: "Witcher.SourceList.SchoolSnail",
  HomeRule: "Witcher.SourceList.HomeRule"
}

WITCHER.SpellsDefences = {
  no: "Witcher.Item.Spells.Defence.no",
  evasion: "Witcher.Item.Spells.Defence.evasion",
  blocking: "Witcher.Item.Spells.Defence.blocking",
  evblo: "Witcher.Item.Spells.Defence.evblo",
  magic: "Witcher.Item.Spells.Defence.magic",
  willx3: "Witcher.Item.Spells.Defence.willx3"
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
  bullets: "Witcher.Item.Diagrams.Types.ammunition",
  enhancement: "Witcher.Item.Diagrams.Types.gain",
  valuable: "Witcher.Item.Diagrams.Types.valuable",
  mountgear: "Witcher.Item.Diagrams.Types.mountgear",
  cart: "Witcher.Item.Diagrams.Types.cart",
  eatdrink: "Witcher.Item.Diagrams.Types.eatdrink",
  other: "Witcher.Item.Diagrams.Types.other"
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

WITCHER.CharacterStats = {
  INT: {"Type": "basis", "Long": "Witcher.Actor.Stats.INT.Long", "Short": "Witcher.Actor.Stats.INT.Short"},
  REF: {"Type": "basis", "Long": "Witcher.Actor.Stats.REF.Long", "Short": "Witcher.Actor.Stats.REF.Short"},
  DEX: {"Type": "basis", "Long": "Witcher.Actor.Stats.DEX.Long", "Short": "Witcher.Actor.Stats.DEX.Short"},
  BODY: {"Type": "basis", "Long": "Witcher.Actor.Stats.BODY.Long", "Short": "Witcher.Actor.Stats.BODY.Short"},
  SPD: {"Type": "basis", "Long": "Witcher.Actor.Stats.SPD.Long", "Short": "Witcher.Actor.Stats.SPD.Short"},
  EMP: {"Type": "basis", "Long": "Witcher.Actor.Stats.EMP.Long", "Short": "Witcher.Actor.Stats.EMP.Short"},
  CRA: {"Type": "basis", "Long": "Witcher.Actor.Stats.CRA.Long", "Short": "Witcher.Actor.Stats.CRA.Short"},
  WILL: {"Type": "basis", "Long": "Witcher.Actor.Stats.WILL.Long", "Short": "Witcher.Actor.Stats.WILL.Short"},
  LUCK: {"Type": "basis", "Long": "Witcher.Actor.Stats.LUCK.Long", "Short": "Witcher.Actor.Stats.LUCK.Short"},
  VIGOR: {"Type": "derived", "Long": "Witcher.Actor.Stats.VIGOR.Long", "Short": "Witcher.Actor.Stats.VIGOR.Short"},
  STUN: {"Type": "derived", "Long": "Witcher.Actor.Stats.STUN.Long", "Short": "Witcher.Actor.Stats.STUN.Short"},
  RUN: {"Type": "derived", "Long": "Witcher.Actor.Stats.RUN.Long", "Short": "Witcher.Actor.Stats.RUN.Short"},
  LEAP: {"Type": "derived", "Long": "Witcher.Actor.Stats.LEAP.Long", "Short": "Witcher.Actor.Stats.LEAP.Short"},
  HP: {"Type": "derived", "Long": "Witcher.Actor.Stats.HP.Long", "Short": "Witcher.Actor.Stats.HP.Short"},
  STA: {"Type": "derived", "Long": "Witcher.Actor.Stats.STA.Long", "Short": "Witcher.Actor.Stats.STA.Short"},
  ENC: {"Type": "derived", "Long": "Witcher.Actor.Stats.ENC.Long", "Short": "Witcher.Actor.Stats.ENC.Short"},
  REC: {"Type": "derived", "Long": "Witcher.Actor.Stats.REC.Long", "Short": "Witcher.Actor.Stats.REC.Short"},
  PUNKI: {"Type": "derived", "Long": "Witcher.Actor.Stats.PUNKI.Long", "Short": "Witcher.Actor.Stats.PUNKI.Short"}
}

WITCHER.categoryWeapon = {
  sword: "Witcher.Item.Weapon.Types.Sword",
  lightBlade: "Witcher.Item.Weapon.Types.LightBlade",
  axe: "Witcher.Item.Weapon.Types.Axe",
  crushing: "Witcher.Item.Weapon.Types.Crushing",
  polearm: "Witcher.Item.Weapon.Types.Polearm",
  staff: "Witcher.Item.Weapon.Types.Staff",
  throwing: "Witcher.Item.Weapon.Types.Throwing",
  bow: "Witcher.Item.Weapon.Types.Bow",
  crossbow: "Witcher.Item.Weapon.Types.Crossbow"
}

WITCHER.Effects = {
  Categories: {
    simple: "Witcher.Item.Effects.Categories.simple",
    self: "Witcher.Item.Effects.Categories.self",
    equip: "Witcher.Item.Effects.Categories.equip",
    attack: "Witcher.Item.Effects.Categories.attack",
    use: "Witcher.Item.Effects.Categories.use",
    aura: "Witcher.Item.Effects.Categories.aura"
  },
  onToken: {
    no: "Witcher.Item.Effects.onTokens.no",
    icon: "Witcher.Item.Effects.onTokens.icon",
    border: "Witcher.Item.Effects.onTokens.border",
    aura: "Witcher.Item.Effects.onTokens.aura"
  },
  Activities: {
    no: "Witcher.Item.Effects.Activities.no",
    remove: "Witcher.Item.Effects.Activities.remove",
    count: "Witcher.Item.Effects.Activities.count",
    replace: "Witcher.Item.Effects.Activities.replace"
  },
  Targets: {
    no: "Witcher.Item.Effects.Targets.no",
    properties: "Witcher.Item.Effects.Targets.properties",
    generic: "Witcher.Item.Effects.Targets.generic"
  }
}


WITCHER.EffectsTarget = {
  self: "Witcher.Item.Effects.Targets.self",
  attack: "Witcher.Item.Effects.Targets.attack",
  defence: "Witcher.Item.Effects.Targets.defence"
}

WITCHER.EnchancementsCategories = {
  weapon: "Witcher.Item.Enchancements.Categories.Weapon",
  armor: "Witcher.Item.Enchancements.Categories.Armor"
}

WITCHER.WeaponGrasps = {
  one: "Witcher.Item.Weapon.Grasps.One",
  two: "Witcher.Item.Weapon.Grasps.Two"
}

WITCHER.ItemTags = {
  common: "",
  elder: "Witcher.Item.TagElder",
  witcher: "Witcher.Item.TagWitcher"
}

WITCHER.ArmorDefence = {
  head: "Witcher.Item.Armor.Defence.Head",
  body: "Witcher.Item.Armor.Defence.Body",
  all: "Witcher.Item.Armor.Defence.All",
  foot: "Witcher.Item.Armor.Defence.Foot",
  shield: "Witcher.Item.Armor.Defence.Shield"
}

WITCHER.ArmorCategory = {
  light: "Witcher.Item.Armor.Category.Light",
  medium: "Witcher.Item.Armor.Category.Medium",
  havy: "Witcher.Item.Armor.Category.Havy"
}

WITCHER.AlchemicalCategory = {
  potion: "Witcher.Item.Alchemical.Category.Potion",
	oil: "Witcher.Item.Alchemical.Category.Oil",
	poison: "Witcher.Item.Alchemical.Category.Poison",
	liquor: "Witcher.Item.Alchemical.Category.Liquor",
	elixir: "Witcher.Item.Alchemical.Category.Elixir",
	powder: "Witcher.Item.Alchemical.Category.Powder",
	solution: "Witcher.Item.Alchemical.Category.Solution",
	gas: "Witcher.Item.Alchemical.Category.Gas",
	incense: "Witcher.Item.Alchemical.Category.Incense",
  mixture: "Witcher.Item.Alchemical.Category.Mixture"
}

WITCHER.MutagenCategory = {
  red: "Witcher.Item.Mutagen.Category.Red",
  blue: "Witcher.Item.Mutagen.Category.Blue",
  green: "Witcher.Item.Mutagen.Category.Green"
}

WITCHER.TablePhysicalParameters = {
  "2": {"HP": 10, "STA": 10, "REC": 2, "STUN": 2},
  "3": {"HP": 15, "STA": 15, "REC": 3, "STUN": 3},
  "4": {"HP": 20, "STA": 20, "REC": 4, "STUN": 4},
  "5": {"HP": 25, "STA": 25, "REC": 5, "STUN": 5},
  "6": {"HP": 30, "STA": 30, "REC": 6, "STUN": 6},
  "7": {"HP": 35, "STA": 35, "REC": 7, "STUN": 7},
  "8": {"HP": 40, "STA": 40, "REC": 8, "STUN": 8},
  "9": {"HP": 45, "STA": 45, "REC": 9, "STUN": 9},
  "10": {"HP": 50, "STA": 50, "REC": 10, "STUN": 10},
  "11": {"HP": 55, "STA": 55, "REC": 11, "STUN": 10},
  "12": {"HP": 60, "STA": 60, "REC": 12, "STUN": 10},
  "13": {"HP": 65, "STA": 65, "REC": 13, "STUN": 10}
}

WITCHER.TableMeleeFight = {
  "0-0": {"hand": "1d6-6", "foot": "1d6-6"},
  "1-2": {"hand": "1d6-4", "foot": "1d6"},
  "3-4": {"hand": "1d6-2", "foot": "1d6+2"},
  "5-6": {"hand": "1d6", "foot": "1d6+4"},
  "7-8": {"hand": "1d6+2", "foot": "1d6+6"},
  "9-10": {"hand": "1d6+4", "foot": "1d6+8"},
  "11-12": {"hand": "1d6+6", "foot": "1d6+10"},
  "13-99": {"hand": "1d6+8", "foot": "1d6+12"}
}

WITCHER.TableExtraDamage = {
  "1-2": -4,
  "3-4": -2,
  "5-6": 0,
  "7-8": 2,
  "9-10": 4,
  "11-12": 6,
  "13-99": 8
}