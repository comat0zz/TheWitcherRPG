import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class SpellItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 530,
      height: 400,
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-properties"}]
    });
  }

  getData(options) {
    const data = super.getData(options);
    console.log(data)
    const itemData = data.data;
    data.config = CONFIG.WITCHER;
    // Нет элемента в заклинаниях
    data.magicNoElements = [
      "gifts", 
      "injury", 
      "ritual", 
      "invocDruid", 
      "invocPriest", 
      "invocHighPriest"
    ];

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    return data;
  }

}







