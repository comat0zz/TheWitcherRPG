import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class ValuableItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 400
    });
  }
}







