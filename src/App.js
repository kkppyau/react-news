import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import News from './News.js';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: '10vh',
		paddingRight: '15px',
		paddingLeft: '15px',
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '90%',
		'@media (min-width: 576px)': {
			maxWidth: '540px',
		},
		'@media (min-width: 768px)': {
			maxWidth: '720px',
		},
		'@media (min-width: 992px)': {
			maxWidth: '960px',
		},
		'@media (min-width: 1200px)': {
			maxWidth: '960px',
		},
	},
	title: {
		textAlign: 'center',
		paddingBottom: 15,
	},
}));

export default function App() {
	const classes = useStyles();

	const getNewsData = () => {
		return fetch(
			'https://newsapi.org/v2/top-headlines?country={COUNTRY}&apiKey={API_KEY}'
		)
			.then((res) => res.json())
			.then(
				(result) => {
					return result;
				},
				(error) => {
					console.log(error);
				}
			);
	};

	return (
		<div className={classes.root}>
			<Typography variant='h3' gutterBottom className={classes.title}>
				Simple Newsfeed
			</Typography>
			<News onGetNews={getNewsData} />
		</div>
	);
}
