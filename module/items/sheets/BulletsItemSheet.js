import { WitcherBaseItemSheet } from "../BaseItemSheet.js"


export class BulletsItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 350,
      dragDrop: [{dropSelector: ".area-insert", dragSelector: ".item"}],
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

    html.find('.insert-diagram .click-show').click(evt => this._onItemShow(evt));
    html.find('.insert-diagram a.delete').click(evt => this._onDeleteComponent(evt));
  }

  _onDeleteComponent(evt){
    evt.preventDefault();
    this.item.update({ "data.assocDiagram": "" });
    return false;
  }

  async _getDocumentByPack(name) {
    const pack = game.packs.get(name.pack);
    return pack.getDocument(name.id);
  }

  async _onItemShow(evt) {
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".insert-diagram").attr('data-item-id');
    const data = this.item.data.data.assocDiagram; 
    let item = {};
    if(Object.keys(data).includes("pack") && data.pack != "") {
      item = await this._getDocumentByPack(data);
    }else{
      item = game.items.get(item_id);
    }
    item.sheet.render(true, { focus: true });
  }

  async _onDrop(event) { 
    let dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
    // Нельзя добавлять самого себя
    if(dragData.id == this.item.id) return;

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

    let assocDiagram = dragData;
    assocDiagram.img = item.img;
    assocDiagram.name = item.name;
    assocDiagram.qty = 1;

    this.item.update({ "data.assocDiagram": assocDiagram });
  }
}