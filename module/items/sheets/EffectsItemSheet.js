export class EffectsItemSheet extends ItemSheet {
  
  get template() {
    return `systems/TheWitcherRPG/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
  }

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 500,
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-Properties"}]
    });
  }

  getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;
    data.item = itemData;
    data.data = itemData.data;
    return data;
  }

}







