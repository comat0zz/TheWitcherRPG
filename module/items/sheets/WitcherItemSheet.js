export class WitcherItemSheet extends ItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 520,
      height: 450,
      tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}],
    });
  }

  get template() {
    return `systems/TheWitcherRPG/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
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