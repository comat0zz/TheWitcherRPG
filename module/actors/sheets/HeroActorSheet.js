import { WitcherBaseActorSheet } from "../BaseActorSheet.js"

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
      ]
    });
  }

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

  async getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    data.skillsTable = await this.getSkillsTable();
    
    data.item = itemData;
    data.data = itemData.data;
    console.log(data);
    return data;
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
  }

  async _onRollActorSkill(evt) {
    evt.preventDefault();
    // Криво :( 
      // переопределил навыки в хиро
    const skill = $(evt.currentTarget)[0];
    const skillName = skill.dataset.skillName;
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

 