export class EffectsItemSheet extends ItemSheet {
  
  get template() {
    return `systems/TheWitcherRPG/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 620,
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-Properties"}]
    });
  }

  async getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;
    itemData.data.formula = JSON.stringify(itemData.data.formula);
    itemData.data.saving = JSON.stringify(itemData.data.saving); 
    data.item = itemData;
    data.data = itemData.data;
    
    return data;
  }
}