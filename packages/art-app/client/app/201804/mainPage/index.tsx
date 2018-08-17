import './styles';

document.body.onload = addElement;

function addElement() {
  const spinner = document.getElementById('global-spinner');
  const app = document.getElementById('app');
  const newDiv = document.createElement('div');
  const newContent = document.createTextNode('Hi there and greetings!!');
  // add the text node to the newly created div
  newDiv.appendChild(newContent);
  if (spinner === null || app === null) { return; }
  spinner.remove();
  app.appendChild(newDiv);
}