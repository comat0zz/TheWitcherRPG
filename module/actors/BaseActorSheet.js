export class WitcherBaseActorSheet extends ActorSheet {
  get template() {
    return `systems/TheWitcherRPG/templates/sheets/actors/${this.actor.data.type}-sheet.hbs`;
  }
}