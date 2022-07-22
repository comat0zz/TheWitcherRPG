import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class NoteItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 450,
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-Label"}]
    });
  }

  getData(options) {
    const data = super.getData(options);
    console.log(data)
    const itemData = data.data;
    data.config = CONFIG.WITCHER;
    
    // TODO: Security checks GM fields
    // TODO: descriptionForPlayes editable false?
    //data.description = itemData.data.description;
    //data.descriptionOnlyGM 
    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    data.UserisGM = game.user.isGM;
    return data;
  }

}







