import { WitcherBaseItemSheet } from "../BaseItemSheet.js"

export class ComponentItemSheet extends WitcherBaseItemSheet {
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      height: 500
    });
  }
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('[item-click="QuantityObtainable_on"]').on('click', this._clickQuantityObtainable.bind(this));
  }

  // Бросает в чат ролл при клике на Доступное количество
  async _clickQuantityObtainable(event) {
    event.preventDefault();
    const input = await $(event.currentTarget).closest('form').find('input[item-click="QuantityObtainable_value"]').val();
    const name = await $(event.currentTarget).closest('form').find('h1.item-name input[name="name"]').val()
    if(input.includes("d")) {
      let roll = await new Roll(input).roll({async: true});
      
      const html = await renderTemplate("systems/TheWitcherRPG/templates/chat/card-roll.hbs", {
        name: name,
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
}







