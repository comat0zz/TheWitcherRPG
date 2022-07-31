import { WitcherBaseActorSheet } from "../BaseActorSheet.js"

export class HeroActorSheet extends WitcherBaseActorSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["witcher", "sheet", "actor"],
      width: 940,
      height: 900,
      tabs: [{navSelector: ".tabs", contentSelector: ".actor-content", initial: "summary"}]
    });
  }

  async getData(options) {
    const data = super.getData(options);
    const itemData = data.data;
    data.config = CONFIG.WITCHER;

    data.skillsTable = await this.getSkillsTable();

    itemData.data.modifications = [
      {"type": "skills", "key": "horseriding", "mod": "+", "value": "2", "itemId": "112123113", "effectId": "12312312", "from": "equip"},
      {"type": "stats", "key": "INT", "mod": "-", "value": 1, "itemId": "112123113", "from": "status"},
      {"type": "stats", "key": "REF", "mod": "-", "value": 4, "itemId": "112123113", "from": "status"},
    ];
    
    itemData.data.stats = await this.getStats(itemData.data.modifications);
    this.actor.update({'data.stats': itemData.data.stats})
    const prevSkills = await this.getSkills(itemData.data.modifications);
    itemData.data.skills = prevSkills[0];
    itemData.data.allPoints = prevSkills[1];

    const TableMeleeFight = await this.getMeleeFight();
    console.log(TableMeleeFight)
    itemData.data.MeleeFightHand = TableMeleeFight[0];
    itemData.data.MeleeFightFoot = TableMeleeFight[1];
    
    // get skills

    // Re-define the template data references (backwards compatible)
    data.item = itemData;
    data.data = itemData.data;
    console.log(data);
    return data;
  }

  async getMeleeFight() {
    const TableMeleeFight = CONFIG.WITCHER.TableMeleeFight;
    const BODY = this.actor.data.data.stats['BODY'].total;
    if(BODY < 1) return [0, 0];

    for (let [key, val] of Object.entries(TableMeleeFight)) { 
      let [from, to] = key.split("-");
      if( (parseInt(from) <= BODY) &&  (BODY <= parseInt(to))) return [val.hand, val.foot];
    };

    return [0, 0];
  }

  async getMods(mods, type, key) {
    let sum = 0; // Чтобы не перебирать повторно
    let arr = []; // Для лога при броске и можно в тотал подсказку сделать при наведении
    mods.forEach(el => {
      if(el.type == type && el.key == key) {
        if(el.mod == "+") {
          sum += parseInt(el.value);
          
        }else if(el.mod == '-') {
          sum -= parseInt(el.value);
        }

        arr.push(el);
      }
      
    });

    //console.log([sum, arr])
    return [sum, arr];
  }

  async getStats(mods) {
    let obj = {};
    let stats = this.actor.data.data.stats;

    for (let [key, val] of Object.entries(stats)) { 
      obj[key] = {};
      let value = parseInt(val.value);
      if(isNaN(value)) value = 0;
      obj[key].value = value;
      let total = value;

      const [thisSum, thisArr] = await this.getMods(mods, "stats", key);
      total = total + thisSum;
      
      obj[key]['log'] = thisArr;
      //console.log(thisArr)

      obj[key].total = total;
    }

    return obj;
  }

  async getSkills(mods) {
    let obj = {};
    const skills = this.actor.data.data.skills;
    const stats = this.actor.data.data.stats;
    let allPoints = 0;

    //const mods = this.actor.data.data.modifications;
    //console.log(mods)

    for (let [key, val] of Object.entries(skills)) {
      
      let value = parseInt(val.value);
      if(isNaN(value)) value = 0;
      allPoints += value;

      obj[key] = {};
      obj[key].value = value;
      obj[key].difficult = val.difficult;
      const stat_total = stats[val.stat].total;
      
      /// mod there
      const [thisSum, thisArr] = await this.getMods(mods, "skills", key);
      obj[key].total = value + stat_total + thisSum;
      obj[key].log = thisArr;
   }

   return [obj, allPoints];
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

 