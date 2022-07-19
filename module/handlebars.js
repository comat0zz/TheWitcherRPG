export const initializeHandlebars = () => {
  registerHandlebarsHelpers();
  preloadHandlebarsTemplates();
};

const preloadHandlebarsTemplates = async function () {
  // Define template paths to load
  const templatePaths = [

    // Items
    "systems/TheWitcherRPG/templates/sheets/items/substances-sheet.hbs"
  ];

  // Load the template parts
  return loadTemplates(templatePaths);
};

function registerHandlebarsHelpers() {

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