export const initializeHandlebars = () => {
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
};

const preloadHandlebarsTemplates = async function () {
  // Define template paths to load
  const templatePaths = [

    // chat
    "systems/TheWitcherRPG/templates/chat/card-roll.hbs",

    // Items
    "systems/TheWitcherRPG/templates/sheets/items/weapon-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/armor-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/enhancement-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/valuable-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/alchemical-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/component-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/diagrams-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/mutagen-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/spell-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/profession-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/note-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/race-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/effect-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/mount_gear-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/bullets-sheet.hbs",
    "systems/TheWitcherRPG/templates/sheets/items/substances-sheet.hbs"
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};

function registerHandlebarsHelpers() {

  Handlebars.registerHelper('ifor', function (v1, v2) {
    return (v1 || v2); 
  });

  Handlebars.registerHelper('isGM', function (options) {
    if (game.user.isGM) return options.fn(this);
    return options.inverse(this);
  });

  Handlebars.registerHelper('getCharacterActorId', function () {
    return game.user.character.id;
  });

  Handlebars.registerHelper('abs', function (num) {
    return Math.abs(num);
  });

  Handlebars.registerHelper('isdefined', function (value) {
    return value === 0 ? true : typeof (value) !== undefined && value !== null;
  });

  // value in array
  Handlebars.registerHelper('inarray', function(value, arr) {
    console.log(arr)
    return arr.includes(value);
  });

  // if empty 
  Handlebars.registerHelper('ifempty', function(value) {
    return (value === "");
  });

  // Ifis not equal
  Handlebars.registerHelper('ifne', function (v1, v2, options) {
    if (v1 !== v2) return options.fn(this);
    else return options.inverse(this);
  });

  // if not
  Handlebars.registerHelper('ifn', function (v1, options) {
    if (!v1) return options.fn(this);
    else return options.inverse(this);
  });
  
  // if equal
  Handlebars.registerHelper('ife', function (v1, v2, options) {
    if (v1 === v2) return options.fn(this);
    else return options.inverse(this);
  });
  
  // if equal
  Handlebars.registerHelper('ifgt', function (v1, v2, options) {
    if (v1 > v2) return options.fn(this);
    else return options.inverse(this);
  });
  
  // if all true
  Handlebars.registerHelper('ifat', function (...args) {
    // remove handlebar options
    let options = args.pop();
    return args.indexOf(false) === -1 ? options.fn(this) : options.inverse(this);
  }); 

};