import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class AlhformulasItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 530,
      height: 290,
      dragDrop: [{dropSelector: ".item-ingridients", dragSelector: ".item"}],
    });
  }

  async getData(options) {
    let data = super.getData(options);
    let itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log(data)
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.insert-ingridients .ingridient').click(evt => this._onItemShow(evt));
    html.find('.insert-ingridients .ingridient a.delete').click(evt => this._onDeleteComponent(evt));
  }

  _onDeleteComponent(evt){
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".ingridient").attr('data-item-id');
    const ingridients = duplicate(this.item.data.data.ingridients);

    ingridients.some((loc, i) => {
      if(loc.id == item_id){
         delete ingridients[i];
         return true;
      }      
    });

    // TODO: Сделать красиво
    let noNull = []
    ingridients.forEach((loc) => {
      if(loc !== null) {
        noNull.push(loc);
      }
    });

    this.item.update({ "data.ingridients": noNull });
    // Чтобы не откарывалась картинки при клике на корзину
    return false;
  }

  async _getDocumentByPack(name) {
    const pack = game.packs.get(name.pack);
    return pack.getDocument(name.id);
  }

  async _onItemShow(evt) {
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".ingridient").attr('data-item-id');
    const data = this.item.data.data.ingridients; 
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
    if( ! (Object.keys(data).includes("ingridients"))) {
      data.ingridients = [];
    }
    let ingridients = duplicate(data.ingridients);
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

    ingridients.push(dragData);
    this.item.update({ "data.ingridients": ingridients });
  }

}







