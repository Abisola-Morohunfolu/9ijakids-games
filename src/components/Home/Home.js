import classes from './Home.module.css';
import * as React from 'react';
import { GameList } from '../../static-data';
import SearchBar from '../SearchBar/SearchBar';
import GameCard from '../GameCard/GameCard';
import SelectGroup from '../SelectGroup/SelectGroup';

const Home = () => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [searchResults, setSearchResults] = React.useState(null);
	const [isFiltered, setIsFiltered] = React.useState(false);
	const [groupFilter, setGroupFilter] = React.useState('');
	const [levelFilter, setLevelFilter] = React.useState('');

	const onSearchChange = (e) => {
		const query = e.target.value.toLowerCase();
		setSearchQuery(query);

		if (!isFiltered || groupFilter === '') {
			const searches = GameList.filter((game) => game.Topic.toLowerCase().includes(query));
			setSearchResults(searches);
		} else {
			const searches = searchResults.filter((game) => game.Topic.toLowerCase().includes(query));
			setSearchResults(searches);
		}
	};

	const changeFilter = (e, filterType) => {
		const filterValue = e.target.value;
		setIsFiltered(true);

		if (filterType === 'groups') {
			setGroupFilter(filterValue);
			filterByGroup(filterValue);
		}

		if (filterType === 'level') {
			setLevelFilter(filterValue);
			filterByLevel(filterValue);
		}
	};

	const filterByGroup = (value) => {
		if (searchQuery !== '') {
			// if value is '' i.e all, then search through with the search query instead
			if (value === '' && levelFilter === '') {
				const filtered = GameList.filter((game) => game.Topic.toLowerCase().includes(searchQuery));
				return setSearchResults(filtered);
			}

			if (value === '' && levelFilter !== '') {
				const filtered = GameList.filter((game) => game.Level === levelFilter);
				const results = filtered.filter((game) => game.Topic.toLowerCase().includes(searchQuery));
				return setSearchResults(results);
			}
		}
		if (searchQuery === '') {
			if (value === '' && levelFilter === '') return setSearchResults(GameList);

			if (value === '' && levelFilter !== '') {
				const filtered = searchResults.filter((game) => game.Level === levelFilter);
				return setSearchResults(filtered);
			}

			if (value !== '' && levelFilter !== '') {
				const filtered = searchResults.filter((game) => game.Group === value);
				setSearchResults(filtered);
			}

			if (value !== '' && levelFilter === '') {
				const filtered = GameList.filter((game) => game.Group === value);
				setSearchResults(filtered);
			}
		}
	};

	const filterByLevel = (value) => {
		if (searchQuery !== '') {
			// if value is '' i.e all, then search through with the search query instead
			if (value === '' && groupFilter === '') {
				const filtered = GameList.filter((game) => game.Topic.toLowerCase().includes(searchQuery));
				return setSearchResults(filtered);
			}

			if (value === '' && groupFilter !== '') {
				const filtered = GameList.filter((game) => game.Group === groupFilter);
				const results = filtered.filter((game) => game.Topic.toLowerCase().includes(searchQuery));
				return setSearchResults(results);
			}

			const filtered = searchResults.filter((game) => game.Level === value);
			setSearchResults(filtered);
		}

		if (searchQuery === '') {
			if (value === '' && groupFilter === '') return setSearchResults(GameList);

			if (value === '' && groupFilter !== '') {
				const filtered = searchResults.filter((game) => game.Group === groupFilter);
				return setSearchResults(filtered);
			}

			if (value !== '' && groupFilter !== '') {
				const filtered = searchResults.filter((game) => game.Level === value);
				setSearchResults(filtered);
			}

			if (value !== '' && groupFilter === '') {
				const filtered = GameList.filter((game) => game.Level === value);
				setSearchResults(filtered);
			}
		}
	};

	return (
		<section className={classes.Container}>
			<div className={classes.SideBar}>
				<SearchBar onChange={onSearchChange} query={searchQuery} />
				<div>
					<SelectGroup
						label="groups"
						values={['Academic', 'Financial Literacy']}
						value={groupFilter}
						onChange={changeFilter}
					/>
					<SelectGroup
						label="level"
						values={['Key Stage 1', 'Key Stage 2', 'Financial Literacy']}
						value={levelFilter}
						onChange={changeFilter}
					/>
				</div>
			</div>
			<section className={classes.GamesContainer}>
				{searchResults === null
					? GameList.map((game) => (
							<GameCard
								title={game.GameTitle}
								image={game.GameImage}
								description={game.GameDescription}
								key={game.GameTitle}
							/>
					  ))
					: searchResults.map((game) => (
							<GameCard
								title={game.GameTitle}
								image={game.GameImage}
								description={game.GameDescription}
								key={game.GameTitle}
							/>
					  ))}
				{(searchQuery !== '' && searchResults.length === 0) ||
				(isFiltered && searchResults.length === 0) ? (
					<div className={classes.EmptyState}>
						<h5>No Games found</h5>
					</div>
				) : null}
			</section>
		</section>
	);
};

export default Home;
