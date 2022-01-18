import '../App.css';
import './AirlineCard.css';
import { useState, useEffect } from 'react';

// JSON data
// didn't have much luck with JSONp in react, it doesn't seem to be supported
// by fetch API or axios, NPM list jsonp https://www.npmjs.com/package/fetch-jsonp package
// I didnt have any luck with that supports Aysnc/Await???
// other JSONP documentation is pretty poor, as a result hardcoded
import Data from '../data/myData.json';

function AirlineCard(props) {
	const [cardStatus, setCardStatus] = useState('card');
	const [activeCardId, setactiveCardId] = useState('');
	const [content, setContent] = useState('111');

	let makeCard;

	//mimics Array of checked boxes from USER
	const checkedAlliances = props.allianceFilters;

	const getAllianceName = (alliance) => {
		//presentational name
		if (alliance === 'OW') {
			return 'One World';
		} else if (alliance === 'ST') {
			return 'Sky Team';
		} else if (alliance === 'SA') {
			return 'Star Alliance';
		} else {
			return ''; // "none", or no alliance specified
		}
	};

	const cardOriginal = (event) => {
		let activeId = event.target.id;
		console.log(activeId);
		setactiveCardId('');
		setCardStatus('card');
		setContent('111');
	};

	const cardHover = (event) => {
		let activeId = event.target.id;
		console.log(activeId);
		setactiveCardId(activeId);
		setCardStatus('card-hover');
		setContent('222');
	};

	//Currently updates the state of all cards, instead of the one which is hovered, a problem...
	if (cardStatus === 'card') {
		makeCard = Data.map((company) => {
			console.log(company.length); //total:1315
			return (
				// standard presentation

				<div
					className='card flexCenter flexVerticalCenter'
					onMouseEnter={() => {
						setCardStatus('cardHover');
					}}
				>
					<img
						className='card-icon'
						// json data does not produce valid URL
						// src={company.logoURL}
						src='//via.placeholder.com/32x32'
						alt='filler'
					/>

					<label className='card-company'>{company.name}</label>
				</div>
			);
		});
	} else if (cardStatus === 'cardHover') {
		makeCard = Data.map((company) => {
			//Could loop through the "checkedAlliances" array for future checkboxes creation
			//no need to over-engineer at this point.
			// if (
			// 	company.alliance === checkedAlliances[0] ||
			// 	company.alliance === checkedAlliances[1] ||
			// 	company.alliance === checkedAlliances[2]
			// ) {
			return (
				<div
					className='card card-hovered flexCenter flexVerticalCenter'
					onMouseLeave={() => {
						setCardStatus('card');
					}}
				>
					<div>
						<img
							className='card-icon'
							// json data does not produce valid URL
							//src={company.logoURL}
							src='//via.placeholder.com/32x32'
							alt='filler'
						/>
					</div>
					<div className='card-hovered-info'>
						<div className='card-hovered-company'>
							{company.name} ({company.code})
						</div>
						<div>{getAllianceName(company.alliance)}</div>
						<div>{company.phone}</div>
						<div className='card-web-label'>
							{/* more robust is possible, substring suitable for this need */}
							{company.site
								.replace(/https:\/\/www.|https:\/\/|/g, '')
								.substring(0, 20)}
						</div>
					</div>
				</div>
			);
			// }
		});
	}

	return <div className='card-container'>{makeCard}</div>;
}

export default AirlineCard;
