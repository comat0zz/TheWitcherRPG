import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class MutagenItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 400,
    });
  }
}