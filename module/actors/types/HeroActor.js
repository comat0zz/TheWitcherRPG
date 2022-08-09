export class HeroActor extends Actor {

  async prepareData() {
    super.prepareData();
    let actorData = this.data.data;
    let actorStats = actorData.stats;
    
    this.data.data.stats['INT'].total = 111;
    
    actorStats = await this.getStatsList();

    console.log(actorStats)
  }

  async getTextTestMod() {
    return 'getTextTestMod';
  }

  async getStatTable() {
    return CONFIG.WITCHER.CharacterStats;
  }

  async getModTable() {
    // test 
    const modifications = [

    ];

    return this.data.data.modifications;
  }

  async getStatsList() {
    const stats = this.data.data.stats;
    let obj = {};


    return obj;
  }

  async getSkillsList() {

  }

  async getSkill(key) {

  }
  
}