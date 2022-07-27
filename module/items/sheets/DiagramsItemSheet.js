import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class DiagramsItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 450
    });
  }

}