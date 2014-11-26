var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var data = require("sdk/self").data;
var tabs = require("sdk/tabs");

var button = ToggleButton({
  id: "my-button",
  label: "my button",
  icon: "./icon-16.png",
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: data.url("popup.html"),
  onHide: handleHide
});

panel.on('show', function () {
  panel.port.emit('show', tabs.activeTab.url);
});

tabs.on('ready', enableButton);
tabs.on('activate', enableButton);

function enableButton(tab) {
  button.disabled = tab.url.search(/musescore\.com\/.*\/scores/) === -1;
}

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}