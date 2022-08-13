import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class WeaponItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 700,
    });
  }
}







