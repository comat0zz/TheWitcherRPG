import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class SpellItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 530,
      height: 400,
      dragDrop: [{dropSelector: ".item-components", dragSelector: ".item"}],
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-properties"}]
    });
  }

  async getData(options) {
    let data = super.getData(options);
    let itemData = data.data;
    data.config = CONFIG.WITCHER;
    // Элемента в заклинаниях
    data.magicElements = [
      "signs",
      "spell"
    ];
    
    if(itemData.data.magicType == "") itemData.data.magicType = "spell";

    let components = [];
    if(Object.keys(itemData.data.specData).includes("components")) {
      itemData.data.specData.components.forEach((component) => {
        if(component.type == 'Item'){
          let item = game.items.get(component.id);
          components.push({
            name: item.data.name,
            img: item.data.img,
            id: item.data._id,
            isHidden: item.isHidden,
            type: component.type
          });
        }
      });
    }
    itemData.data.specData.components = components;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log(data)
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.components-table .item td:nth-child(-n+2)').click(evt => this._onItemShow(evt));
    html.find('.components-table .item td:last-child').click(evt => this._onDeleteComponent(evt));
  }

  _onDeleteComponent(evt){
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
    const components = duplicate(this.item.data.data.specData.components);
    let newComponents = []
    components.forEach((loc) => {
      if(loc.id != item_id){
        newComponents.push(loc);
      }
    });
    this.item.update({ "data.specData.components": newComponents })
  }

  _onItemShow(evt) {
      evt.preventDefault();
      let item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
      const item = game.items.get(item_id);
      item.sheet.render(true, { focus: true });
  }

  async _onDrop(event) { 
    let dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
    if(dragData.id == this.item.id) return;
    let specData = this.item.data.data.specData;
    if( ! (Object.keys(specData).includes("components"))) {
      specData.components = [];
    }
    let components = duplicate(specData.components);
    if(components.findIndex(x => x.id === dragData.id) != -1) {
      return;
    }
    components.push(dragData);
    console.log(components)
    this.item.update({ "data.specData.components": components });
  }

}







