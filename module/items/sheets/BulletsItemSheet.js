import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class BulletsItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 500
    });
  }
}