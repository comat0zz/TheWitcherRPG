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
export const WITCHER = /** @type {const} */ ({
    
  //imageRef: "systems/TheWitcherRPG/asset/{filename}",

  // Weapon and bullets damage types 
  typeDamage: {
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
  },

  // Concealment (CONC.) weapons
  typeCONC: {
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
  },

  // Components categories
  ComponentsCategories: {
    craftmaterial: "Witcher.Item.Components.Categories.CraftingMaterials",
    hidesanimal: "Witcher.Item.Components.Categories.HidesAnimalParts",
    alchreatments: "Witcher.Item.Components.Categories.AlchemicalTreatments",
    igotsmaterail: "Witcher.Item.Components.Categories.IngotsMinerals",
    substances: "Witcher.Item.Components.Categories.Substances"
  }, 

  // Rarity Item
  RarityItem: {
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

});