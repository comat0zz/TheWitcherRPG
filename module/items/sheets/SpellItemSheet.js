import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class SpellItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 550
    });
  }
}