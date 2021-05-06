import classes from './GameCard.module.css';

const GameCard = (props) => {
	return (
		<div className={classes.GameCard}>
			<div className={classes.GameImageContainer}>
				<img src={props.image} alt={props.title} className={classes.GameImageContainer} />
			</div>
			<div className={classes.GameTextContainer}>
				<h4 className={classes.GameTitle}>{props.title}</h4>
				<p className={classes.GameDescription}>{props.description}</p>
			</div>
		</div>
	);
};

export default GameCard;
