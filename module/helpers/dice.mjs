export async function attributeRoll(rollData, attr) {
  // Attribute list for drop-down
  const attrList = Object.keys(rollData.attributes)
      .filter((a) => a !== attr)
      .map((a) => ({key: `${a}`, label: `ATOW.attributes.${a}`}));

  const flavor = `${game.i18n.localize(`ATOW.attributes.${attr}`)} Roll`;
  const {mod, attr2} = await showAttributeRollDialog(flavor, attrList);
  const isDoubleRoll = attr2 && attr !== attr2;
  const rollFormula = `2d6 + @${attr} + ${isDoubleRoll ? `@${attr2} + ` : ""}${mod}`;

  const roll = await new Roll(rollFormula, rollData).roll({async: true});

  const total = roll.total;

  const targetNumber = isDoubleRoll ? 18 : 12;

  const successMsg = total >= targetNumber ? "Success!" : "Failure!";

  const rollResult = await roll.render();

  const content = `<div class="flexcol"><h3>${successMsg}</h3><p>${total} vs. TN ${targetNumber}</p><div>${rollResult}</div></div>`;

  const chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    roll: roll,
    content,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
  };

  await ChatMessage.create(chatData);
}

async function showAttributeRollDialog(title, attrList) {
  async function _processRollOptions(form) {
    return {
      mod: parseInt(form.mod.value || 0),
      attr2: form.attr2.value,
    };
  }

  const template = "systems/atow/templates/chat/attribute-dialog.hbs";
  const content = await renderTemplate(template, {title, attrList});

  return new Promise((resolve) => new Dialog({
    title,
    content,
    buttons: {
      roll: {
        label: "Roll",
        callback: (html) => resolve(_processRollOptions(html[0].querySelector("form"))),
      },
      cancel: {
        label: "Cancel",
        callback: () => resolve({cancelled: true}),
      },
    },
    default: "roll",
    close: () => resolve({cancelled: true}),
  }, null).render(true));
}
