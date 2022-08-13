import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class ArmorItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 600
    });
  }

}







