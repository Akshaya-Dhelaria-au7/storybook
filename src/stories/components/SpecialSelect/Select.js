import React from 'react';
import {TextField, MenuItem} from '@material-ui/core'
import {useController} from 'react-hook-form';

export default function SelectField({options,control, name, ...rest}) {
	const {
		field: {ref, ...inputProps}
	} = useController({
		name,
		control
	});	
	return (
		<TextField {...rest} inputRef={ref} {...inputProps} select >
			{options.map((e, index) => (
				<MenuItem key={index} value={e.value}>
					{e.label}
				</MenuItem>
			))}
		</TextField>
	);
}
