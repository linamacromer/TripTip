function setTipPartial() {
  return $.Mustache.add('tipTemplate', $('#tip-partial').html());
};

function renderTipPartial(tipData) {
  setTipPartial();
  return $.Mustache.render('tipTemplate', tipData);
};

function setTipNavPartial() {
  return $.Mustache.add('navTemplate', $('#tip-nav-partial').html());
};

function renderTipNavPartial(navData) {
  setTipNavPartial();
  return $.Mustache.render('navTemplate', navData);
};
