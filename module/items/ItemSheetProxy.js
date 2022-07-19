import { WitcherItemSubstancesSheet } from "./sheets/ItemSubstancesSheet.js";

const itemSheetMappings = {
  substances: WitcherItemSubstancesSheet
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