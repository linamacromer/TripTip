function setTipPartial() {
  return $.Mustache.add('tipTemplate', $('#tip-partial').html());
};

function renderTipPartial(tipData) {
  setTipPartial();
  return $.Mustache.render('tipTemplate', tipData);
};

function setNavPartial() {
  return $.Mustache.add('navTemplate', $('#nav-partial').html());
};

function renderNavPartial(navData) {
  setNavPartial();
  return $.Mustache.render('navTemplate', navData);
};
