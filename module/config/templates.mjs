export default async function preloadHandlebarsTemplates() {
  const templatePaths = [
    "systems/atow/templates/actor/parts/header.hbs",
    "systems/atow/templates/actor/parts/tab-main.hbs",
    "systems/atow/templates/actor/parts/attributes-pane.hbs",
    "systems/atow/templates/actor/parts/skills-pane.hbs",
    "systems/atow/templates/actor/parts/traits-pane.hbs",
  ];

  return loadTemplates(templatePaths);
}
