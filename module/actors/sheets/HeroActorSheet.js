import { WitcherBaseActorSheet } from "../BaseActorSheet.js"

export class HeroActorSheet extends WitcherBaseActorSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 900,
      height: 900,
      tabs: [{navSelector: ".tabs", contentSelector: ".actor-content", initial: "summary"}]
    });
  }

  async getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    data.skillsTable = await this.getSkillsTable();

    itemData.data.modifications = [];
    
    itemData.data.skills = await this.getSkills(itemData.data.skills, itemData.data.modifications);

    // get skills

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log(data);
    return data;
  }

  async getSkills(skills, mods) {
    let obj = {};
    
    for (let [key, value] of Object.entries(skills)) {
      console.log(key, value);
   }
  }

  async getSkillsTable() {
    const pack = game.packs.get("TheWitcherRPG.skills");
    const skills = await pack.getDocuments();
    let arr = {};
    skills.forEach(el => {
      const itemData = el.data;
      if( ! (Object.keys(arr).includes(itemData.data.category))) {
        arr[itemData.data.category] = [];
      }
      arr[itemData.data.category].push({
        "name": itemData.name,
        "key": itemData.data.key,
        "difficult": itemData.data.difficult,
        "id": itemData._id // если не нужно - убрать
      });
    });

    return arr;
  }
}

 