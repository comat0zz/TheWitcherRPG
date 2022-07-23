import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class DiagramsItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 350,
      dragDrop: [{dropSelector: ".item-components", dragSelector: ".item"}],
      tabs: [{navSelector: ".tabs", contentSelector: ".item-content", initial: "tab-Properties"}]
    });
  }

  async getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
  
    html.find('.item-components .item td:nth-child(-n+2)').click(evt => this._onItemShow(evt));
    html.find('.item-components .item td:last-child').click(evt => this._onDeleteComponent(evt));

    html.find('.item-components .item .qty-edit').blur(evt => this._changeQty(evt));
  }
  
  _changeQty(evt) {
    evt.preventDefault();
    const item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
    let value = $(evt.currentTarget).val();
    if(value == "") value = 0;
    const components = duplicate(this.item.data.data.components);
    let newComps = [];
    components.forEach((loc) => {
      if(loc.id == item_id){
        loc.qty = value;
      }
      newComps.push(loc);
    });
    this.item.update({ "data.components": newComps })
  }

  _onDeleteComponent(evt){
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
    const components = duplicate(this.item.data.data.components);
    let newComponents = []
    components.forEach((loc) => {
      if(loc.id != item_id){
        newComponents.push(loc);
      }
    });
    this.item.update({ "data.components": newComponents })
  }

  async _getDocumentByPack(name) {
    const pack = game.packs.get(name.pack);
    return pack.getDocument(name.id);
  }

  async _onItemShow(evt) {
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
    const data = this.item.data.data.components; 
    const index = data.findIndex(x => x.id === item_id);
    let item = {};
    if(index >= 0 && Object.keys(data[index]).includes("pack") && data[index].pack != "") {
      item = await this._getDocumentByPack(data[index])
    }else{
      item = game.items.get(item_id);
    }
    item.sheet.render(true, { focus: true });
  }

  async _onDrop(event) { 
    let dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
    // Нельзя добавлять самого себя
    if(dragData.id == this.item.id) return;
    let data = this.item.data.data;
    // Если нет поля, то добавим
    if( ! (Object.keys(data).includes("components"))) {
      data.components = [];
    }
    let components = duplicate(data.components);
    // Нельзя добавлять добавленные
    if(components.findIndex(x => x.id === dragData.id) != -1) {
      return;
    }
    // Если нет количества, то количество = 1
    if( ! (Object.keys(dragData).includes("qty"))) {
      dragData.qty = 1;
    }
    /* 
    * Парсим pack и item. 
    * Лучше распарсить один раз при добавлении, 
    * чем каждый раз при открытии карточки
    */
    let item = {};
    if(Object.keys(dragData).includes("pack")) {
      item = await this._getDocumentByPack(dragData);
      item = item.data;
    }else{
      item = game.items.get(dragData.id);
    }

    dragData.img = item.img;
    dragData.name = item.name;
    components.push(dragData);
    this.item.update({ "data.components": components });
  }
}