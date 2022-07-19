export class WitcherBaseItemSheet extends ItemSheet {
  get template() {
    return `systems/TheWitcherRPG/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
  }
}