export class HeroActor extends Actor {

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
    console.log("prepareBaseData")
  }

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();

    console.log("prepareData")
  }

  prepareDerivedData() {

    const [stats, allStPoints] = this.updateStatsList();
    this.data.data.stats = stats;
    this.data.data.StatsCount = allStPoints;

    const [skills, allSkPoints] = this.updateSkillsList();
    this.data.data.skills = skills;
    this.data.data.SkillsCount = allSkPoints;

    const [handFight, footFight] = this.getMeleeFight(stats['BODY'].total);
    this.data.data.meleeFightHand = handFight;
    this.data.data.meleeFightFoot = footFight;

    console.log("prepareDerivedData")
  }

  getMeleeFight(body_total) {
    const TableMeleeFight = CONFIG.WITCHER.TableMeleeFight;
    if(body_total < 1) return [0, 0];

    for (let [key, val] of Object.entries(TableMeleeFight)) { 
      let [from, to] = key.split("-");
      if( (parseInt(from) <= body_total) &&  (body_total <= parseInt(to))) return [val.hand, val.foot];
    };

    return [0, 0];
  }

  getPhysicalParametersTable(bw) {
    if(bw < 1) { bw = 1; };

    // experimental 
    const hp = bw*5;
    const sta = bw*5;
    const rec = bw;
    let stun = bw;
    if(stun > 10) stun = 10;

    return {"HP": hp, "STA": sta, "REC": rec, "STUN": stun};
  }

  getStatConfigTable() {
    return CONFIG.WITCHER.CharacterStats;
  }

  getCalcModifiersProps(type, key) {
    const mods = this.data.data.modifications;
    let sum = 0;
    let logs = []; 

    for(const [k, opt] of Object.entries(mods).filter( ([v, k]) => k.status === true && k.target === "properties" )) {
      if(opt.target == "properties") {
        const formula = opt.formula;
        if(formula.type === type && formula.key === key) {
          if(formula.modifier === '+') {
            sum += formula.value;
          }else if( formula.modifier === '-' ){
            sum -= formula.value;
          }
          logs.push(formula);
        }
      }
    }

    return [sum, logs];
  }

  async itemRemoveEqup(id) {
    const invs = duplicate(this.data.data.inventory);
    let items = [];

    for (const [key, opt] of Object.entries(invs)) {
      if(opt.id === id) {
        const effectsIds = opt?.effectsIds;
        await this.removeEffects(effectsIds);
      }else{
        items.push(opt);
      }
    }
    await this.update({'data.inventory': items});
  }

  updateStatsList() {
    const stats = this.data.data.stats;
    const statsConfig = this.getStatConfigTable();
    let actor = {};
    let allPoints = 0;

    /*
      actor.label - перевод стата, иногда требуется, чтобы не пересчитывать
      actor.value - текущее значение, которое игрок сам вкачал
      actor.total - значение, которое в итоге участвует в формулах и чеках
                    включет в себя все модификаторы
      actor.log   - все примененные модификаторы к этому стату
    */

    for (const [key, opt] of Object.entries(statsConfig).filter( ([v, k]) => k.Type === "basis" )) { 
      
      let val = stats[key];
      actor[key] = {};
      actor[key].name = game.i18n.localize(opt.Long);
      let value = parseInt(val.value);
      if(isNaN(value)) value = 1;
      if (typeof(value) === "undefined") value = 1;
      actor[key].value = value;
      
      if(key !== "LUCK"){
        let total = value;
        const [thisSum, thisArr] = this.getCalcModifiersProps("stats", key);
        total = total + thisSum;
        actor[key]['log'] = thisArr;
        
        actor[key].total = total;
        
        //if(actor[key].total < actor[key].value) {
        //  actor[key].value = total;
        //} 
      } else {
        actor[key].total = stats[key].total;
        allPoints += stats[key].total;
      }     
      
      if(! ["SPD", "LUCK"].includes(key)) {
        allPoints += value;
      }      
    }

    // Я бы с удовольствием запихал в один цикл, если бы не это
    const bodyWill = Math.floor((actor['BODY'].total + actor['WILL'].total) / 2);
    const tableBodyWill = this.getPhysicalParametersTable(bodyWill);
    const run = actor['SPD'].total * 3;
    
    for (const [key, opt] of Object.entries(statsConfig).filter( ([v, k]) => k.Type === "derived" )) { 
      
      if(key === "PUNKI") {
        continue;
      }

      let total = 0;

      actor[key] = {};
      actor[key].name = game.i18n.localize(opt.Long);

      if(! Object.keys(stats[key]).includes('value') || stats[key].value === null ) {
        if(Object.keys(tableBodyWill).includes(key)){
          actor[key].value = tableBodyWill[key];
        }
        if(key === "ENC") {
          actor[key].value = 0;
        }

        if(key === "RUN") {
          actor[key].value = run;
        }

        if(key === "VIGOR") {
          actor[key].value = 0;
        }

      } else {
        actor[key].value = stats[key].value;
      }
      
      if(Object.keys(tableBodyWill).includes(key)){
        total = tableBodyWill[key];
      }

      if(key === "ENC") {
        total = actor['BODY'].total * 10;
      }

      if(key === "RUN") {
        total = run;
      }

      const [thisSum, thisArr] = this.getCalcModifiersProps("stats", key);
      actor[key]['log'] = thisArr;
      total = total + thisSum;
      actor[key].total = total;

      //if(actor[key].total < actor[key].value) {
      // actor[key].value = total;
      //}
    }

    // в цикле выше не обработать, там надо ловить порядок,
    // в котором выполнится RUN, затем LEAP. нах надо
    actor["LEAP"].value = Math.floor(run / 3);
    const [thisSum, thisArr] = this.getCalcModifiersProps("stats", "LEAP");
    actor["LEAP"].total = actor["LEAP"].value + thisSum;
    actor["LEAP"]['log'] = thisArr;

    return [actor, allPoints];
  }

  updateSkillsList() {
    const skills = this.data.data.skills;
    const stats = this.data.data.stats;
    let obj = {};

    let allPoints = 0;

    for (let [key, val] of Object.entries(skills)) {
      
      let value = parseInt(val.value);
      if(isNaN(value)) value = 0;
      allPoints += value;

      obj[key] = {};
      obj[key].value = value;
      obj[key].id = val.id;
      obj[key].difficult = val.difficult;
      const stat_total = stats[val.stat.key].total;
      
      /// mod there
      const [thisSum, thisArr] = this.getCalcModifiersProps("skills", key);
      obj[key].total = value + stat_total + thisSum;
      obj[key].log = thisArr;
      obj[key].stat = {
        key: val.stat.key,
        name: stats[val.stat.key].name,
        total: stats[val.stat.key].total
      };
    }

    return [obj, allPoints];
  }

  async getSkill(key) {
    const skills = this.data.data.skills;
    const pack = game.packs.get("TheWitcherRPG.skills");
    await pack.getIndex();
    const csk = pack.index.find(e => e._id === skills[key].id);

    return {
      ...skills[key],
      img: csk.img,
      label: csk.name
    }
  }

  async addEffectsTable(effect) {
    let modifications = duplicate(this.data.data.modifications);
    modifications.push(effect);
    await this.update({ "data.modifications": modifications });
  }

  editEffects(ids, category, status) {
    let effects = duplicate(this.data.data.modifications);
    effects.filter((i) => i.category === category).map(el => {
      if(ids.includes(el.id)) {
        el.status = status;
      }
    });
    this.update({"data.modifications": effects});
  }

  async removeEffects(ids) {
    if(typeof(ids) === 'undefined') return;
    const mods = duplicate(this.data.data.modifications);
    const newMods = mods.filter((i) => ! Object.values(ids).includes(i.id) );
    await this.update({ "data.modifications": newMods });
  }

  itemDressEqup(id, put_on = true) {
    let invs = duplicate(this.data.data.inventory);
    const effects = invs.filter((i) => i.id === id)?.[0]?.effectsIds;
    invs.filter((i) => i.id === id).map( el => {
      el.isEquip = put_on;
    });
    
    this.editEffects(effects, "equip", put_on);
    this.update({"data.inventory": invs});
  }

  addEquipToInventory(item) {
    let items = duplicate(this.data.data.inventory);
    items.push(item);
    this.update({'data.inventory': items});
  }
}