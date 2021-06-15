// import '/common/utils/prototypes/array';

export default function getObjFromOptions(
	v,
	options,
	compareFunc = (o, b) => typeof b === 'string' ? o.value === b : b && o.value === b.value) {
	console.log('getObjFromOptuions', v, options);
	let o = options.find(i => compareFunc(i, v));
	console.log('o 1 is ', o);
	if (o) return o;
	if (v?.value) {
		const opt = options?.filter(i => v.value.startsWith(i.value.replace('-', ''))).last();
		if (opt?.options) return getObjFromOptions(v, opt.options, compareFunc) || null;
	}
	else if (v) {
		console.log('coming into v');
		for (let i = 0; i < options.length; i++) {
			console.log('Option of i', options[i]);
			if (options[i].options) o = getObjFromOptions(v, options[i].options, compareFunc);
			// console.log('o is', o);
			if (o) return o;
		}
	}
	return null;
}
