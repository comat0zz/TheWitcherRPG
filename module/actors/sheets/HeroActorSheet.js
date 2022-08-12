import { WitcherBaseActorSheet } from "../BaseActorSheet.js"
import { genId } from "../../utils.js";

export class HeroActorSheet extends WitcherBaseActorSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 940,
      height: 900,
      tabs: [
        {
          navSelector: "nav.tabs[data-group='primary']", 
          contentSelector: ".actor-content", 
          initial: "summary"
        },
        {
          navSelector: "nav.tabs[data-group='secondary-tabs']", 
          contentSelector: ".skinv-content", 
          initial: "summary-skills"
        }
      ],
      dragDrop: [
        {
          dropSelector: ".inventory-drop", 
          dragSelector: ".item"
        }
      ],
    });
  }

  itemBackPackMenu = [
    {
      name: game.i18n.localize("Witcher.Actor.BackpacksMenu.Edit"),
      icon: '',
      callback: element => {
        console.log(element)
      }
    },
    {
      name: game.i18n.localize("Witcher.Actor.BackpacksMenu.Remove"),
      icon: '',
      callback: element => {
        console.log(element)
      }
    },
    {
      name: game.i18n.localize("Witcher.Actor.BackpacksMenu.Use"),
      icon: '',
      callback: element => {
        console.log(element)
      }
    },
    {
      name: game.i18n.localize("Witcher.Actor.BackpacksMenu.HandOver"),
      icon: '',
      callback: element => {
        console.log(element)
      }
    },
    {
      name: game.i18n.localize("Witcher.Actor.BackpacksMenu.Dress"),
      icon: '',
      callback: element => {
        const item_id = $(element).attr('data-item-id');
        this.actor.itemDressEqup(item_id);
      }
    }
  ];

  itemContextMenu = [{
    name: game.i18n.localize("Witcher.Actor.Buttons.Initiative"),
    icon: '',
    callback: element => {
      console.log(element)
    }
  },
  {
    name: game.i18n.localize("Witcher.Actor.Buttons.TargetLoc"),
    icon: '',
    callback: element => {
      console.log(element)
    }
  },
  {
    name: game.i18n.localize("Witcher.Actor.Buttons.Defense"),
    icon: '',
    callback: element => {
      console.log(element)
    }
  },
  {
    name: game.i18n.localize("Witcher.Actor.Buttons.Recovery"),
    icon: '',
    callback: element => {
      console.log(element)
    }
  },
  {
    name: game.i18n.localize("Witcher.Actor.Buttons.Lucky"),
    icon: '',
    callback: element => {
      console.log(element)
    }
  },
  {
    name: game.i18n.localize("Witcher.Actor.Buttons.Stun"),
    icon: '',
    callback: element => {
      console.log(element)
    }
  }];

  async getData() {
    let sheetData = await super.getData();

    sheetData.config = CONFIG.WITCHER;

    sheetData.actorData = sheetData.actor.data.data;
    sheetData.skillsTable = await this.getSkillsTable();
    
    sheetData.weapons = sheetData.actorData.inventory.filter((i) => i.type === "weapon" && i.isEquip == true);
    sheetData.armors = sheetData.actorData.inventory.filter((i) => i.type === "armor" && i.isEquip == true);
    sheetData.valuables = sheetData.actorData.inventory.filter((i) => i.type === "valuable" && i.isEquip == true);



    console.log(sheetData);
    return sheetData;
  }

  async getSkillsTable() {
    const pack = game.packs.get("TheWitcherRPG.skills");
    const skills = await pack.getDocuments();
    let arr = {};
    skills.forEach(el => {
      const itemData = el.data;
      if( ! (Object.keys(arr).includes(itemData.data.category))) {
        arr[itemData.data.category] = {};
      }
      arr[itemData.data.category][itemData.data.key] = {
          "name": itemData.name,
          "key": itemData.data.key,
          "difficult": itemData.data.difficult,
          "img": itemData.img,
          "id": itemData._id // если не нужно - убрать
      };
    });

    return arr;
  }

  async activateListeners(html) {
    super.activateListeners(html);

    html.find('a.roll-actor-skill').click(evt => this._onRollActorSkill(evt));

    new ContextMenu(html, '.quick-action-menu', this.itemContextMenu);
    
    new ContextMenu(html, '.inventory-backpacks tr', this.itemBackPackMenu);
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

  // формируем эффекты с предмета и добавляем в таблицу
  async _calcItemEffects(efs, aitem) {
    if (typeof(efs) === "undefined") {
      return false;
    }
    let ids = [];

    for(const [key, val] of Object.entries(efs)) {
      const item = game.items.get(val.id);
      const itemData = item.data.data;
      const effect_id = genId();

      let effect = {
        id: effect_id,
        name: item.name,
        img: item.img,
        effectId: val.id,
        status: itemData.category == "self"? true:false,
        onToken: itemData.onToken,
        category: itemData.category,
        activity: itemData.activity,
        target: itemData.target,
        formula: itemData.formula,
        saving: itemData.saving,
        time: itemData.time,
        info: aitem
      }
      
      await this.actor.addEffectsTable(effect);
      ids.push(effect_id);
    }
    
    return ids;
  }

  /** @override */
  async _onDrop(evt) { 
    const dragData = JSON.parse(evt.dataTransfer.getData("text/plain"));
    const itemData = await this._extractItem(dragData);
    const item_id = dragData.id;
    const id = genId();

    let item = {
      id: id,
      name: itemData.name,
      type: itemData.type,
      item_id: item_id,
      img: itemData.img
    }
    item.effectsIds = await this._calcItemEffects(itemData?.data?.data?.effects, item)
    item.data = itemData?.data?.data;
    item.isEquip = false;
    
    let items = duplicate(this.actor.data.data.inventory);
    items.push(item);
    await this.actor.update({'data.inventory': items});    
  }

  async _onRollActorSkill(evt) {
    evt.preventDefault();

    const skillName = $(evt.currentTarget).attr('data-skill-name');
    const skillData = await this.actor.getSkill(skillName);

    let roll = await new Roll(`1d10+${skillData.total}`).roll({async: true});
    console.log(roll)
    const html = await renderTemplate("systems/TheWitcherRPG/templates/chat/skill-check-roll.hbs", {
      skillData: skillData,
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

 