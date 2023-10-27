export async function skillRoll(rollData, skillName, rank, tn, linkMod) {
  const flavor = `${skillName} Roll`;
  const {mod, cancelled} = await showAttributeRollDialog(flavor, null);

  if (cancelled) return;

  const rollFormula = `2d6 + ${rank} + ${linkMod} + ${mod || 0}`;

  const roll = await new Roll(rollFormula, rollData).roll({async: true});

  const total = roll.total;

  const margin = total - tn;

  const successMsg = margin >= 0 ? `Success! MoS: ${margin}` : `Failure! MoF: ${Math.abs(margin)}`;

  const rollResult = await roll.render();

  const content = `<div class="flexcol"><h3>${successMsg}</h3><p>${total} vs. TN ${tn}</p><div>${rollResult}</div></div>`;

  const chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    roll,
    content,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    flavor,
  };

  await ChatMessage.create(chatData);
}

export async function attributeRoll(rollData, attr) {
  // Attribute list for drop-down
  const attrList = Object.keys(rollData.attributes)
      .filter((a) => a !== attr)
      .map((a) => ({key: `${a}`, label: `ATOW.attributes.${a}`}));

  const flavor = `${game.i18n.localize(`ATOW.attributes.${attr}`)} Roll`;
  const {mod, attr2, cancelled} = await showAttributeRollDialog(flavor, attrList);
  if (cancelled) return;

  const isDoubleRoll = Boolean(attr2 && attr !== attr2);
  const rollFormula = `2d6 + @${attr} + ${isDoubleRoll ? `@${attr2} + ` : ""}${mod || 0}`;

  const roll = await new Roll(rollFormula, rollData).roll({async: true});

  const total = roll.total;

  const targetNumber = isDoubleRoll ? 18 : 12;

  const margin = total - targetNumber;

  const successMsg = margin >= 0 ? `Success! MoS: ${margin}` : `Failure! MoF: ${Math.abs(margin)}`;

  const rollResult = await roll.render();

  const content = `<div class="flexcol"><h3>${successMsg}</h3><p>${total} vs. TN ${targetNumber}</p><div>${rollResult}</div></div>`;

  const chatData = {
    user: game.user.id,
    speaker: ChatMessage.getSpeaker(),
    roll,
    content,
    type: CONST.CHAT_MESSAGE_TYPES.ROLL,
    flavor,
  };

  await ChatMessage.create(chatData);
}

async function showAttributeRollDialog(title, attrList) {
  async function _processRollOptions(form) {
    return {
      mod: parseInt(form.mod.value || 0),
      attr2: form?.attr2?.value,
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
