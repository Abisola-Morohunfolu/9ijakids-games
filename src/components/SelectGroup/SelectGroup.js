import classes from './SelectGroup.module.css';

const SelectGroup = (props) => {
	return (
		<div className={classes.SelectGroup}>
			<label htmlFor={props.label}>Filter by {props.label}</label>
			<select
				name={props.label}
				value={props.value}
				onChange={(e) => props.onChange(e, props.label)}
			>
				<option value="">All</option>
				{props.values.map((value) => (
					<option value={value} key={value}>
						{value}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectGroup;
