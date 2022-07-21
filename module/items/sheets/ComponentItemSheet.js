import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class ComponentItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "item"],
      width: 500,
      height: 350,
      dragDrop: [{dropSelector: ".item-locations", dragSelector: ".item"}]
    });
  }

  async getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    const substances = await this._prepareSubstancesPack();
    data.config = CONFIG.WITCHER;

    let locations = [];
    // Хотел перенести формирование в перетаскивание
    // так снизит заметно нагрузку, но проблемы будут при переименовывании
    itemData.data.location.forEach((location) => {
      if(location.type == 'Item'){
        let item = game.items.get(location.id);
        locations.push({
          name: item.data.name,
          img: item.data.img,
          id: item.data._id,
          isHidden: item.isHidden,
          type: location.type
        });
      }
    });
    itemData.data.location = locations;
    console.log(itemData.data.location)
    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    data.substances = substances;
    data.noSubstance = (data.data.substanceType == '' || data.data.category != "substances");
    data.substanceImage = await this._getSubstaceImage(substances, itemData.data.substanceType);
    console.log(data);
    return data;
  }

  async _getSubstaceImage(subs, stype) {
    let img = subs[0].img;
    if(stype != "") {
      subs.forEach(function(item){
        if(item._id === stype){
          img = item.img;
        } 
      })
    }
    return img;
  }

  async _prepareSubstancesPack() {
    const pack = game.packs.get("TheWitcherRPG.substances");
    let data = await pack.getDocuments();
    return data.map(a => ({_id: a.id, img: a.img, name: a.name}));
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('[item-click="QuantityObtainable_on"]').on('click', this._clickQuantityObtainable.bind(this));

    html.find('.location-table .item td:nth-child(-n+2)').click(evt => this._onItemShow(evt));
    html.find('.location-table .item td:last-child').click(evt => this._onDeleteLocation(evt));
  }

  _onDeleteLocation(evt){
    evt.preventDefault();
    let item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
    const locations = duplicate(this.item.data.data.location);
    let newLocations = []
    locations.forEach((loc) => {
      if(loc.id != item_id){
        newLocations.push(loc);
      }
    });
    this.item.update({ "data.location": newLocations })
  }

  _onItemShow(evt) {
      evt.preventDefault();
      let item_id = $(evt.currentTarget).closest(".item").attr('data-item-id');
      const item = game.items.get(item_id);
      item.sheet.render(true, { focus: true });
  }

  async _onDrop(event) { 
    let dragData = JSON.parse(event.dataTransfer.getData("text/plain"));
    let locations = duplicate(this.item.data.data.location);
    locations.push(dragData);
    this.item.update({ "data.location": locations })
  }

  async _clickQuantityObtainable(event) {
    event.preventDefault();
    const input = await $(event.currentTarget).closest('form').find('input[item-click="QuantityObtainable_value"]').val();
    const name = await $(event.currentTarget).closest('form').find('h1.item-name input[name="name"]').val()
    if(input.includes("d")) {
      let roll = await new Roll(input).roll({async: true});
      
      // TODO: Высчитывать сложность, если тыкает игрок / хз, надо ли
      // Если выбран токен, то вставлять количество в его чарник ( надо ли добавлять траву как итем? )
      const html = await renderTemplate("systems/TheWitcherRPG/templates/chat/card-roll.hbs", {
        name: name,
        result: roll.result,
        total: roll.total
      });

      ChatMessage.create({
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: html
        });
    }
  }


}







