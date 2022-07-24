import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class Mount_gearItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 350,
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-Properties"}]
    });
  }

  getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    return data;
  }

}







