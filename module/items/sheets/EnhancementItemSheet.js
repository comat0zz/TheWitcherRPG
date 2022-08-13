import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class EnhancementItemSheet extends WitcherBaseItemSheet {
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 500
    });
  }
}