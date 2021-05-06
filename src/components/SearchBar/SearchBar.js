import classes from './SearchBar.module.css';

const SearchBar = (props) => {
	return (
		<div className={classes.SearchBar}>
			{/* <label htmlFor="search">Search for game by topic...</label> */}
			<input
				type="search"
				id="search"
				placeholder="Search for game by topic..."
				name="search"
				value={props.query}
				onChange={(e) => props.onChange(e)}
				className={classes.SearchInput}
			/>
		</div>
	);
};

export default SearchBar;
