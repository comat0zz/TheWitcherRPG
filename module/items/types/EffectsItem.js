export class EffectsItem extends Item {

  /** @override */
  prepareData() {
    super.prepareData();

    let itemData = this.data;
    console.log('ITEM', itemData)
    try {
      itemData.data.formula = JSON.parse(itemData.data.formula);
    } catch {
      itemData.data.formula = {};
    }

    try {
      itemData.data.saving = JSON.parse(itemData.data.saving);
    } catch {
      itemData.data.saving = {};
    }

  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /** @override */
  prepareDerivedData() {
    super.prepareDerivedData();

    
  }
}