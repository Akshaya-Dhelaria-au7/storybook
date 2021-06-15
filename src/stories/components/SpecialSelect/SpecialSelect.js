import React, {useState, useEffect} from 'react';
// import {Input} from '../../../src';
import { TextField } from '@material-ui/core';
import getObjFromOptions from './getObjFromOptions';
import PropTypes from 'prop-types';
import {useForm} from 'react-hook-form';
import SelectField from './Select'

function SpecialSelect({ filterOptionsFunction = null, finalValueCompareFunction}) {
	// console.log('final Value', values, 'filter', filterOptionsFunction);
	const {watch,getValues,setValue, control} = useForm()
	const [valueData, setValueData] = useState();
	// const [option, setOption] = useState([]);
	let options = [
	{value: 'a-', label: 'Apartment', options: [
		{value: 'a', label: 'Any Apartment', finalValue: {type: 'apartment', gated: true, project: true}},
		{value: 'a:n', label: 'Only Apartment', finalValue: {type: 'apartment', gated: true, project: true, penthouse: false, villament: false}},
		{value: 'a:p', label: 'Penthouse', finalValue: {type: 'apartment', gated: true, project: true, penthouse: true, villament: false}},
		{value: 'a:v', label: 'Villament', finalValue: {type: 'apartment', gated: true, project: true, villament: true, penthouse: false}},
	]},
	{
		value: 'h-', label: 'House', options: [
			// gated, project, single, villa, villaType mandatory
			{value: 'h', label: 'Any House', finalValue: {type: 'house', villa: false}},
			{
				value: 'h:g-', label: 'House in Gated Community', options: [
					{value: 'h:g', label: 'Any Gated Community House', finalValue: {type: 'house', gated: true, project: false, villa: false}},
					{value: 'h:g:s', label: 'Single Family House (GC)', finalValue: {type: 'house', gated: true, project: false, single: true, villa: false, villaType: null}},
					{value: 'h:g:m', label: 'Multi Family House (GC)', finalValue: {type: 'house', gated: true, project: false, single: false, villa: false, villaType: null}},
				],
			},
			{value: 'h:p-', label: 'House in a Project', options: [
				{value: 'h:p', label: 'Any House in a Project', finalValue: {type: 'house', gated: true, project: true, villa: false}},
				{value: 'h:p:s', label: 'Single Family House in Project', finalValue: {type: 'house', gated: true, project: true, single: true, villa: false, villaType: null}},
				{value: 'h:p:m', label: 'Multi Family House in Project', finalValue: {type: 'house', gated: true, project: true, single: false, villa: false, villaType: null}},
			]},
			{
				value: 'h:i-', label: 'Independent House', options: [
					{value: 'h:i', label: 'Any Independent House', finalValue: {type: 'house', gated: false, project: false, villa: false}},
					{value: 'h:i:s', label: 'Single Family House (I)', finalValue: {type: 'house', gated: false, project: false, single: true, villa: false, villaType: null}},
					{value: 'h:i:m', label: 'Multi Family House (I)', finalValue: {type: 'house', gated: false, project: false, single: false, villa: false, villaType: null}},
				],
			},
		],
	},
	{
		value: 'v-', label: 'Villa', options: [
			// gated, project, single, villa, villaType mandatory
			{value: 'v', label: 'Any Villa', finalValue: {type: 'house', gated: true, project: true, villa: true, single: true}},
			{value: 'v:s', label: 'Standalone (Villa)', finalValue: {type: 'house', gated: true, project: true, villa: true, single: true, villaType: 'standalone'}},
			{value: 'v:1', label: '1-2 (Villa)', finalValue: {type: 'house', gated: true, project: true, villa: true, single: true, villaType: '1-2'}},
			{value: 'v:r', label: 'Row (Villa)', finalValue: {type: 'house', gated: true, project: true, villa: true, single: true, villaType: 'row'}},
		],
	},
	{
		value: 'p-', label: 'Plot', options: [
			// gated, project mandatory
			{value: 'p', label: 'Any Plot', finalValue: {type: 'plot'}},
			{value: 'p:p', label: 'Gated Builder Plot', finalValue: {type: 'plot', gated: true, project: true}},
			{value: 'p:g', label: 'Gated Community Plot', finalValue: {type: 'plot', gated: true, project: false}},
			{value: 'p:i', label: 'Independent Plot', finalValue: {type: 'plot', gated: false, project: false}},
		],
	},
];

	const name = 'propertyType'
	const label = 'Type'
	const finalValue = true
	const isClearable = true
	const rawunitListingComp = true
	const changeFinalValueOnlyOnMenuClose = true

	const getOptions = (v) => {
		console.log('coming here', v, options);
		// Add 'Any <type>' in case of subOptions, eg: 'Any House'
		if (!v) return (filterOptionsFunction ? options?.filter(filterOptionsFunction) : options).map(({value, label}) => ({value, label}));
		const option = (getObjFromOptions(v, options) || {}).options || [];
		console.log('option in getOptions', option, filterOptionsFunction);
		let op = (filterOptionsFunction ? option.filter(filterOptionsFunction) : option).map(({value, label}) => {
			if (value === 'h:i:m' && rawunitListingComp) return ({value, label: `${label}(Rental House)`});
			console.log('here ',value, label)
			return ({value, label});
		});
		console.log('op', op);
		return [...op];
	};

	let v = watch(name);
	console.log('v is', v);
	const isTouched = true;
	v = valueData || (finalValue ? getObjFromOptions(v, options, finalValueCompareFunction) : v);
	console.log('v is ', v, valueData);
	options = getOptions(v)
	console.log('option are', options);
	const menuIsOpen = options.length > 1;

	return (
		<SelectField
			compact
			control={control}
			isClearable={isClearable}
			label={label}
			options={options}
			value={v || {}}
			name={name}
			style={{width:'15%'}}
		/>
	);
}

SpecialSelect.propTypes = {
	changeFinalValueOnlyOnMenuClose: PropTypes.bool,
	defaultMenuIsOpen: PropTypes.object,
	filterOptionsFunction: PropTypes.func,
	finalValue: PropTypes.bool,
	finalValueCompareFunction: PropTypes.func,
	formik: PropTypes.object,
	isClearable: PropTypes.bool,
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.array,
	prevValues: PropTypes.object,
	rawunitListingComp: PropTypes.object,
};

export default SpecialSelect;
