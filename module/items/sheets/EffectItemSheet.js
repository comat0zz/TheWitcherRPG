import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class EffectItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 250,
    });
  }

  getData(options) {
    const data = super.getData(options);
    console.log(data)
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    return data;
  }

}







