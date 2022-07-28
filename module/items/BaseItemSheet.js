export class WitcherBaseItemSheet extends ItemSheet {
  get template() {
    return `systems/TheWitcherRPG/templates/sheets/items/${this.item.data.type}-sheet.hbs`;
  }

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
  
  /** @override */
  async getData(options) {
    const data = super.getData(options);
    
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log("Debug Item Base:\n", data);
    return data;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.witcher-insertion-area img.click-show').click(evt => this._onItemShow(evt));
    html.find('.witcher-insertion-area a.delete').click(evt => this._onDeleteItemFromList(evt));
    html.find('.witcher-insertion-area input.qty-edit').blur(evt => this._changeItemQty(evt));
  }

  _changeItemQty(evt) {
    evt.preventDefault();
    const parent =  $(evt.currentTarget).closest('[data-item-id]');
    const item_id = $(parent).attr('data-item-id');
    const item_otions = $(evt.currentTarget).closest('[data-dist-field]').attr('data-dist-field').split(";");
    const item_field = item_otions[0];
    const item_qty = item_otions[2] ?? 0;
    if(item_qty == 0) return;
    const dataItem = this.item.data.data;
    const data = duplicate(dataItem[item_field]);

    let value = $(parent).find('input.qty-edit').val();
    
    if(value == "") value = 1;
    if(value < 1) value = 1;
    if(value == undefined) value = 1;

    let newInsert = [];
    data.forEach((loc) => {
      if(loc.id == item_id){
        loc.qty = value;
      }
      newInsert.push(loc);
    });
    this.item.update({ [`data.${item_field}`]: newInsert })
  }

  _onDeleteItemFromList(evt){
    evt.preventDefault();
    evt.stopPropagation();
    const item_id =  $(evt.currentTarget).closest('[data-item-id]').attr('data-item-id');
    const item_otions = $(evt.currentTarget).closest('[data-dist-field]').attr('data-dist-field').split(";");
    const item_field = item_otions[0];
    const item_uniq = item_otions[1] ?? 0;
    const dataItem = this.item.data.data;
    const data = duplicate(dataItem[item_field]);
    
    let newInsert = [];
    if(item_uniq == 1){

      data.some((loc, i) => {
        if(loc.id == item_id){
          console.log(data[i], i)
           delete data[i];
           return true;
        }      
      });
      
      data.forEach((loc) => {
        if(loc !== null) {
          newInsert.push(loc);
        }
      });

    }else{
      
      data.forEach((loc) => {
        if(loc.id != item_id){
          newInsert.push(loc);
        }
      });
    }

    this.item.update({ [`data.${item_field}`]: newInsert});
  }

  async _getDocumentByPack(name) {
    const pack = game.packs.get(name.pack);
    return pack.getDocument(name.id);
  }

  async _extractItem(data) {
    if(Object.keys(data).includes("pack") && data.pack != "") {
      return await this._getDocumentByPack(data);
    }else if(data.type == "Item"){
      return game.items.get(data.id);
    }else if(data.type == "Actor") {
      return game.actors.get(data.id);
    }
  }

  async _onItemShow(evt) {
    evt.preventDefault();
    const item_id =  $(evt.currentTarget).closest('[data-item-id]').attr('data-item-id');
    const item_otions = $(evt.currentTarget).closest('[data-dist-field]').attr('data-dist-field').split(";");
    const item_field = item_otions[0];
    const dataItem = this.item.data.data;
    let data = dataItem[`${item_field}`];

    // _extractItem принимает конкретно объект итема,
    // который надо открыть
    if(Array.isArray(data)) {
      const index = data.findIndex(x => x.id === item_id);
      data = data[index];
    }
    const goal = await this._extractItem(data);
    console.log(item_id, data, goal)
    goal.sheet.render(true, { focus: true });
  }

  // Подготовка опций для data-dist-type
  async prepareTypes(opt) {
    opt = opt.split(";");
    let options = {};
    opt.forEach(el => {
      const [name, value] = el.split(":");
      if(value !== undefined){
        options[name] = value.split(",");
      }else{
        options[name] = [];
      }      
    });
    return options;
  }

  /** @override */
  async _onDrop(evt) { 
    const dragData = JSON.parse(evt.dataTransfer.getData("text/plain"));
    const parent = $(evt.currentTarget).closest(".witcher-insertion-area");
    // В какое поле закидывать итоги
    // Формат: fieldname;uniq;qty;list
    // fieldname - поле, которое обновляем
    // uniq - возможны ли повторы итемов. 0 - нет, 1 - да
    // qty - считать ли количество каждого. 0 - нет, 1 - да
    // list - количество. 1 - только один, 0 - без ограничений
    // data-dist-field="data.assocDiagram;0;0;1" 
    const item_otions = $(parent).attr('data-dist-field').split(";");
    const item_field = item_otions[0];
    const item_uniq = item_otions[1] ?? 0;
    const item_qty = item_otions[2] ?? 0;  // Используется выше, тут для примера
    const item_list = item_otions[3] ?? 1;
    
    // Категории и типы, которые принимает. 
    // Формат поля, строка: type:category;type:category,category;type,
    // при значении all - нет проверки
    // Мы берем наш type и category сверяем с теми, что прилетели.
    // В итоге можем гибко настраивать каждое поле в верстке
    // В самой верстке мы подгружаем часть шаблона с передачей строки
    // с настройкой аргументом
    // data-dist-type="diagrams:armor;component:craftmaterial,hidesanimal"
    let item_check = $(parent).attr('data-dist-type');
    if(item_check !== "all") {
      item_check = await this.prepareTypes(item_check);
    }

    // Нельзя добавлять самого себя
    if(dragData.id == this.item.id) return;

    const data = this.item.data.data;
    // Если нет поля, то добавим
    if( ! (Object.keys(data).includes(item_field))) {
      data[item_field] = [];
    }
    // Если поле равно строке, переопределим
    if(data[item_field] == "") {
      data[item_field] = [];
    }

    const item = await this._extractItem(dragData);
    const item_type = item.type;
    const item_category = item.data.data.category ?? false;

    // Пока False - значение не добавляется
    let isTrue = false;

    if(item_check === "all") {
      isTrue = true;
    } else {
      // Ищем ключ в массиве проверке
      if(Object.keys(item_check).includes(item_type)) {
        const check = item_check[item_type];
        // Если массив не пустой, значит чекаем значение
        if(check !== [] && Object.values(check).includes(item_category)) {
          isTrue = true;
        // Если массив пустой, значит принимаем всю схему
        }else if(check.length == 0){
          isTrue = true;
        }
        // В ином условии ничего
      }
    }

    dragData.img = item.img;
    dragData.name = item.name;
    dragData.qty = 1;
    dragData.gameType = item_type;
    dragData.category = item_category;

    let dataOririnal = [];
    if(item_list == 0) {
      dataOririnal = duplicate(data[item_field]);
      // Нельзя добавлять добавленные
      if(item_uniq == 0 && Array.isArray(dataOririnal) && (dataOririnal.findIndex(x => x.id === dragData.id) != -1)) {
        return;
      }
    }

    dataOririnal.push(dragData);

    if(isTrue){
      this.item.update({ [`data.${item_field}`]: dataOririnal});
    }
  }

}