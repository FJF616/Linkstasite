import { configure } from '@storybook/react';
import { withBackgrounds } from '@storybook/addon-backgrounds';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
const req = require.context('../src/components', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

stories.addDecorator(withKnobs);

addDecorator(
  withBackgrounds([
    { name: 'twitter', value: '#00aced', default: true },
    { name: 'facebook', value: '#3b5998' },
  ])
);
configure(loadStories, module);
