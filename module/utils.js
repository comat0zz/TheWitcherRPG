

var preparePack = async function(name) {
  // https://gitlab.com/-/snippets/2138719
  const pack = game.packs.get(name);
  let data = await pack.getDocuments();
  console.log(dataPack);
  return;
}

module.exports.preparePack = async function(session, lat, lon) {
  await preparePack(session, lat, lon);
}