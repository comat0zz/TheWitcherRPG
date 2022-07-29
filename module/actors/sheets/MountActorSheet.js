import { WitcherBaseActorSheet } from "../BaseActorSheet.js"

export class MountActorSheet extends WitcherBaseActorSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 500,
      height: 250,
    });
  }

  getData(options) {
    const data = super.getData(options);
    
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log(data);
    return data;
  }
}

