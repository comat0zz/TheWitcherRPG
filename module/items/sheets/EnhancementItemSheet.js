import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class EnhancementItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 400,
      dragDrop: [
        {dropSelector: ".witcher-insertion-area", dragSelector: ".item"}
      ],
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-Properties"}]
    });
  }

  

}







