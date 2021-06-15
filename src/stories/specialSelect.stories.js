import React from 'react';
import SpecialSelect from './components/SpecialSelect/SpecialSelect';

export default {
	title: 'Example/SpecialSelect',
	component: SpecialSelect
}

const Template = args => <SpecialSelect {...args} />;

export const Options = Template.bind({});

