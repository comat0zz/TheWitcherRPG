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

    html.find('td.set-weapon-oil').click(evt => this.setInvWeaponOil(evt));
    html.find('td.set-weapon-poison').click(evt => this.setInvWeaponPoison(evt));

    new ContextMenu(html, '.quick-action-menu', this.itemContextMenu);
    
    new ContextMenu(html, '.content-backpacks tr', this.itemBackPackMenu);
  }

  removeWeaponImprov(weapon_id, type_imprv) {
    const invs = duplicate(this.actor.data.data.inventory);
    let newInvs = [];
    invs.forEach(el => {
      if(el.id === weapon_id) {
        if(type_imprv === "oil") {
          el.setOil = false;
        }else if(type_imprv === "poison") {
          el.setPoison = false;
        }
      }
      newInvs.push(el);
    });
    this.actor.update({"data.inventory": newInvs});
  }

  setWeaponImprov(weapon_id, form, type_imprv) {
    const c_id = form.find(`form.set-${type_imprv}-on-weapon input[type=radio][name=${type_imprv}]:checked`).val();
    if (typeof(c_id) === "undefined") return;
    const nous = this.actor.data.data.inventory.filter( (i) => i.type === "alchemical" && i.data.category === type_imprv && i.id === c_id );
    const invs = duplicate(this.actor.data.data.inventory);
    let newInvs = [];
    invs.forEach(el => {
      if(el.id !== c_id) {
        if(el.id === weapon_id) {
          if(type_imprv === "oil") {
            el.setOil = nous[0];
          }else if(type_imprv === "poison") {
            el.setPoison = nous[0];
          }else if(type_imprv === "sharp") {
            el.setSharp = nous[0];
          }
        }
        newInvs.push(el);
      }
    });
    this.actor.update({"data.inventory": newInvs});
  }

  async setInvWeaponOil(evt) {
    evt.preventDefault();
    const weapon_id = $(evt.currentTarget).closest('tr').attr('data-id'); 

    const tpl = "systems/TheWitcherRPG/templates/sheets/actors/inv-weapon-add-imprv.hbs";
    const oils = this.actor.data.data.inventory.filter( (i) => i.type === "alchemical" && i.data.category === "oil" );
    const template = await renderTemplate(tpl, {data: oils, typeImp: "oil"});

    return new Promise(resolve => {
      const data = {
        title: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.OilLabel"),
        content: template,
        buttons: {
          yes: {
           icon: '<i class="fas fa-check"></i>',
           label: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.Yes"),
           callback: html => resolve(this.setWeaponImprov(weapon_id, html, "oil"))
          },
          clear: {
            icon: '<i class="fas fa-trash"></i>',
            label: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.Clear"),
            callback: html => resolve(this.removeWeaponImprov(weapon_id, "oil"))
           },
          cancel: {
           icon: '<i class="fas fa-times"></i>',
           label: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.Cancel"),
           callback: html => resolve({cancelled: true})
          }
        },
        default: "cancel",
        close: () => resolve({cancelled: true})
      }

      new Dialog(data, null).render(true);
    });
  }

  async setInvWeaponPoison(evt) {
    evt.preventDefault();
    const weapon_id = $(evt.currentTarget).closest('tr').attr('data-id'); 

    const tpl = "systems/TheWitcherRPG/templates/sheets/actors/inv-weapon-add-imprv.hbs";
    const poisons = this.actor.data.data.inventory.filter( (i) => i.type === "alchemical" && i.data.category === "poison" );
    const template = await renderTemplate(tpl, {data: poisons, typeImp: "poison"});

    return new Promise(resolve => {
      const data = {
        title: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.PoisonLabel"),
        content: template,
        buttons: {
          yes: {
           icon: '<i class="fas fa-check"></i>',
           label: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.Yes"),
           callback: html => resolve(this.setWeaponImprov(weapon_id, html, "poison"))
          },
          clear: {
            icon: '<i class="fas fa-trash"></i>',
            label: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.Clear"),
            callback: html => resolve(this.removeWeaponImprov(weapon_id, "poison"))
           },
          cancel: {
           icon: '<i class="fas fa-times"></i>',
           label: game.i18n.localize("Witcher.Backpacks.InvAddWeapon.Cancel"),
           callback: html => resolve({cancelled: true})
          }
        },
        default: "cancel",
        close: () => resolve({cancelled: true})
      }

      new Dialog(data, null).render(true);
    });
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

      this.render();

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

 