export class HeroActor extends Actor {

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  async prepareDerivedData() {

    const [stats, allStPoints] = await this.updateStatsList();
    this.data.data.stats = stats;
    this.data.data.StatsCount = allStPoints;

    const [skills, allSkPoints] = await this.updateSkillsList();
    this.data.data.skills = skills;
    this.data.data.SkillsCount = allSkPoints;

    const [handFight, footFight] = await this.getMeleeFight(stats['BODY'].total);
    this.data.data.meleeFightHand = handFight;
    this.data.data.meleeFightFoot = footFight;

    /*
    this.update({
        "data.trainSkills.SkillsCount": allSkPoints,
        "data.trainSkills.StatsCount": allStPoints,
        //"data.meleeFight.hand": handFight,
        //"data.meleeFight.foot": footFight,
    });
    */
  }

  async getMods(mods, type, key) {
    let sum = 0; 
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

  async getMeleeFight(body_total) {
    const TableMeleeFight = CONFIG.WITCHER.TableMeleeFight;
    if(body_total < 1) return [0, 0];

    for (let [key, val] of Object.entries(TableMeleeFight)) { 
      let [from, to] = key.split("-");
      if( (parseInt(from) <= body_total) &&  (body_total <= parseInt(to))) return [val.hand, val.foot];
    };

    return [0, 0];
  }

  async getPhysicalParametersTable(bw) {
    if(bw < 1) { bw = 1; };

    // experimental 
    const hp = bw*5;
    const sta = bw*5;
    const rec = bw;
    let stun = bw;
    if(stun > 10) stun = 10;

    return {"HP": hp, "STA": sta, "REC": rec, "STUN": stun};
  }

  async getStatConfigTable() {
    return CONFIG.WITCHER.CharacterStats;
  }

  async getCalcModifiers(type, key) {
    const modifications = this.getModTable(type, key);
    const sum = 0;
    let logs = []; 

    return [sum, logs];
  }

  async getModTable(type, key, category = []) {
    const modifications = this.data.data.modifications;

    return modifications;
  }

  async updateStatsList() {
    const stats = this.data.data.stats;
    const statsConfig = await this.getStatConfigTable();
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
        const [thisSum, thisArr] = await this.getCalcModifiers("stats", key);

        total = total + thisSum;
        actor[key]['log'] = thisArr;
        
        actor[key].total = total;
        
        
        if(actor[key].total < actor[key].value) {
          actor[key].value = total;
        } 
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
    const tableBodyWill = await this.getPhysicalParametersTable(bodyWill);
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

      const [thisSum, thisArr] = await this.getCalcModifiers("stats", key);
      actor[key]['log'] = thisArr;
      total = total + thisSum;
      actor[key].total = total;

      if(actor[key].total < actor[key].value) {
        actor[key].value = total;
      }
    }

    // в цикле выше не обработать, там надо ловить порядок,
    // в котором выполнится RUN, затем LEAP. нах надо
    actor["LEAP"].value = Math.floor(run / 3);
    const [thisSum, thisArr] = await this.getCalcModifiers("stats", "LEAP");
    actor["LEAP"].total = actor["LEAP"].value + thisSum;
    actor["LEAP"]['log'] = thisArr;

    if(this.uuid == 'Actor.'){
      // create? hz
    }else{
      //this.update({ "data.stats": actor });
    }

    return [actor, allPoints];
  }

  async updateSkillsList() {
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
      const [thisSum, thisArr] = await this.getCalcModifiers("skills", key);
      obj[key].total = value + stat_total + thisSum;
      obj[key].log = thisArr;
      obj[key].stat = {
        key: val.stat.key,
        name: stats[val.stat.key].name,
        total: stats[val.stat.key].total
      };
    }

    //this.update({"data.skills": obj});

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
}