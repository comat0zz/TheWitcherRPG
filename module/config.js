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

WITCHER.EffectsCategories = {
  all: "Witcher.Item.Effects.Categories.forActor",
  weapon: "Witcher.Item.Effects.Categories.forWeapon",
  armor: "Witcher.Item.Effects.Categories.forArmor",
  actor: "Witcher.Item.Effects.Categories.forAll"  
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