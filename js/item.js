// Item

function Item(id, name, type, hp, ap, sp, mp) {
  this.id = id;
  this.name = name;
  this.type = type;
  this.addHp = hp;
  this.addAp = ap;
  this.addSp = sp;
  this.addMp = mp;
}

$(document).ready(function() {
  console.log("item.js loaded!");
});