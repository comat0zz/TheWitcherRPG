import { WitcherBaseActorSheet } from "../BaseActorSheet.js"
import { genId } from "../../utils.js";

export class HeroActorSheet extends WitcherBaseActorSheet {
  
  /* -------------------------------------------- */
  addInventoryTypes = [
    "alchemical",
    "alhformulas",
    "armor",
    "bullets",
    "component",
    "diagrams",
    "enhancement",
    "mount_gear",
    "mutagen",
    "valuable",
    "weapon"
  ];
  /* -------------------------------------------- */
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
        const id = element[0].dataset.id;
        this.actor.itemRemoveEqup(id);
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
        const id = element[0].dataset.id;
        this.actor.itemDressEqup(id);
      }
    }
  ];
  /* -------------------------------------------- */
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
  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 940,
      height: 1000,
      tabs: [
        {
          navSelector: "nav.tabs[data-group='primary']", 
          contentSelector: ".actor-content", 
          initial: "content-summary"
        },
        {
          navSelector: "nav.tabs[data-group='secondary-tabs']", 
          contentSelector: ".second-nav-content", 
          initial: "summary-skills"
        },
        {
          navSelector: "nav.tabs[data-group='backpack-tabs']", 
          contentSelector: ".backpack-nav-content", 
          initial: "backpack-weapons"
        }
      ],
      dragDrop: [
        {
          dropSelector: ".content-backpacks", 
          dragSelector: ".item"
        },
        {
          dropSelector: ".content-spellbook", 
          dragSelector: ".item"
        }
      ],
    });
  }

  /** @override */
  async getData(options) {
    let sheetData = super.getData(options);
    const actorData = foundry.utils.deepClone(sheetData.data.data);

    sheetData.config = CONFIG.WITCHER;
    sheetData.skillsTable = await this.getSkillsTable();
    
    /* ------------ Inventory Backpacks Tabs ------------ */
    sheetData.invWeapons = actorData.inventory.filter((i) => i.type === "weapon");
    sheetData.isEquipWeapons = sheetData.invWeapons.filter((i) => i.isEquip === true);

    sheetData.invArmors = actorData.inventory.filter((i) => i.type === "armor");
    sheetData.isEquipArmors = sheetData.invArmors.filter((i) => i.isEquip === true);

    sheetData.invBullets = actorData.inventory.filter((i) => i.type === "bullets");
    sheetData.isEquipBullets = sheetData.invBullets.filter((i) => i.isEquip === true);

    sheetData.invPotions = actorData.inventory.filter((i) => ["alchemical"].includes(i.type));
    sheetData.isEquipPotions = sheetData.invPotions.filter((i) => i.isEquip === true);

    sheetData.invCrafts = actorData.inventory.filter((i) => ["component", "diagrams", "alhformulas"].includes(i.type));

    sheetData.invOthers = actorData.inventory.filter((i) => ["mount_gear", "enhancement", "mutagen", "valuable"].includes(i.type));
    sheetData.isEquipOthers = sheetData.invOthers.filter((i) => i.isEquip === true && i.type === "valuable");
    /* -------------------------------------------- */

    console.log(sheetData)
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

  activateListeners(html) {
    super.activateListeners(html);

    html.find('a.roll-actor-skill').click(evt => this._onRollActorSkill(evt));

    new ContextMenu(html, '.quick-action-menu', this.itemContextMenu);
    
    new ContextMenu(html, '.content-backpacks tr', this.itemBackPackMenu);
  }

  async _getDocumentByPack(name) {
    const pack = game.packs.get(name.pack);
    return await pack.getDocument(name.id);
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
      //console.log(item)
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
      await ids.push(effect_id);
    }
    
    return ids;
  }

  /** @override */
  async _onDrop(evt) { 
    evt.preventDefault();
    const dragData = JSON.parse(evt.dataTransfer.getData("text/plain"));
    const itemData = await this._extractItem(dragData);
    const item_id = dragData.id;
    const id = genId();

    if(Object.values(this.addInventoryTypes).includes(itemData.type)){

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

      this.actor.addEquipToInventory(item);

    }else if(itemData.type == "race") {

    }else if(itemData.type == "profession") {

    }else if(itemData.type == "note") {

    }else if(itemData.type == "spell") {

    }else {
      return false;
    }
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

 