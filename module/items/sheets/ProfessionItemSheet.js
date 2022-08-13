import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class ProfessionItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 800,
      height: 700,
    });
  }
}