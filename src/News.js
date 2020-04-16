import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import GridContainer from './components/GridContainer.js';
import GridItem from './components/GridItem.js';

const useStyles = makeStyles((theme) => ({
	small: {
		fontSize: '65%',
		fontWeight: '400',
		lineHeight: '1.5',
		color: '#777',
	},
	cardPadding: {
		padding: 15,
	},
	zhFont: {
		fontFamily: 'source-han-sans-traditional !important',
	},
	button: {
		'&:hover,&:focus': {
			color: 'inherit',
			background: 'rgba(200, 200, 200, 0.2)',
		},
	},
	media: {
		height: 150,
	},
	subText: {
		fontSize: '65%',
		fontWeight: '400',
		lineHeight: '1.5',
	},
	hiddenScroll: {
		padding: 20,
		textAlign: 'center',
		overflowX: 'hidden',
		overflowY: 'hidden',
	},
}));

export default function News(props) {
	const classes = useStyles();
	const [newsData, setNewsData] = useState({});

	useEffect(() => {
		props.onGetNews().then((result) => {
			setNewsData({ ...result });
		});
	}, []);

	if (newsData.articles && newsData.articles.length > 0) {
		return (
			<GridContainer justify='center' spacing={2}>
				{newsData.articles.map((news, index) => (
					<GridItem xs={12} sm={9} md={4} key={index}>
						<Card>
							<CardActionArea
								href={news.url}
								target='_blank'
								className={classes.button}
							>
								<CardMedia className={classes.media} image={news.urlToImage} />
								<CardContent>
									<Typography
										variant='h5'
										gutterBottom
										className={classes.zhFont}
									>
										{news.title.split('-')[0]}
									</Typography>
									<Typography
										variant='subtitle1'
										gutterBottom
										className={classNames(classes.zhFont, classes.subTitle)}
									>
										{news.title.split('-')[1]}
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'
										gutterBottom
										className={classes.zhFont}
									>
										{String(news.description) !== 'null'
											? String(news.description).length > 100
												? String(news.description).substring(0, 100) + `...`
												: String(news.description)
											: ''}
									</Typography>
									<br />
									<Typography
										variant='h6'
										color='primary'
										className={classes.subText}
									>
										Click to learn more
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</GridItem>
				))}
			</GridContainer>
		);
	} else {
		return (
			<GridContainer justify='center'>
				<CircularProgress />
			</GridContainer>
		);
	}
}
