import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class Mount_gearItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 400
    });
  }
}