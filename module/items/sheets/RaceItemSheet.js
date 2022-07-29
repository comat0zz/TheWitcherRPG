import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class RaceItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 500,
    });
  }
}