import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class EnhancementItemSheet extends WitcherBaseItemSheet {

  async getData(options) {
    const data = super.getData(options);
    
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log("Debug Item Base:\n", data);
    return data;
  }
}







