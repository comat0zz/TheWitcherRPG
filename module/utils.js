
export const arrayRemove = function (arr, value) {
  return arr.filter(function(ele){ 
      return ele != value; 
  });
}


export const genId = function() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

/*
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
*/
