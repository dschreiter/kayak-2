//OW == 17
//ST = 20
//SA = 27
// all non filter == 1315

import { useState, useEffect } from 'react';
import jsonData from './data/myData.json';

function App() {
	const [activeDataFilters, setActiveDataFilters] = useState([]); // checkboxes
	const [filteredData, setFilteredData] = useState([]);
	const [counter, setCounter] = useState(0);

	const checkboxHandler = (event) => {
		if (event.target.checked) {
			addFilter(event);
		} else {
			removeFilter(event);
		}
	};

	const addFilter = (event) => {
		setActiveDataFilters(() => {
			return [...activeDataFilters, event.target.value];
		});
	};

	const removeFilter = (event) => {
		return setActiveDataFilters(
			activeDataFilters.filter((checkbox) => {
				return event.target.value !== checkbox;
			})
		);
	};

	//looping thru a jsonData, building new []
	// for each iteration check alliance against, activeDataFilters strings
	// add to [] where a match occurs
	// pass the activeData Array to the variable "setFilteredData()" updating it's state

	useEffect(() => {
		const activeData = jsonData.filter((obj) => {
			//************************************* ALL DATA
			// if (obj.alliance.length > 0) {
			// 	//no check options
			// 	// OW,ST,SA, 'none'
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }

			//************************************* THREE GROUPS
			// OW,ST,SA
			// if (
			// 	obj.alliance == 'OW' ||
			// 	obj.alliance == 'ST' ||
			// 	obj.alliance == 'SA'
			// ) {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }



			//************************************* TWO GROUPS
			// OW,ST
			// OW, SA
			// ST, SA
			// if (obj.alliance == 'OW' || obj.alliance == 'ST') {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }
			// if (obj.alliance == 'OW' || obj.alliance == 'SA') {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }
			// if (obj.alliance == 'ST' || obj.alliance == 'SA') {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }
			//************************************* SINGLE GROUPS
			//** SHOW OW
			// if (obj.alliance === 'OW') {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }
			//** SHOW ST
			// if (obj.alliance === 'ST') {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }
			//** SHOW SA
			// if (obj.alliance === 'SA') {
			// 	setCounter((x) => {
			// 		return x + 1;
			// 	});
			// 	return obj;
			// }
		});
		//set the array
		setFilteredData(activeData);
	}, [activeDataFilters]);

	return (
		<div className='App'>
			<h3>Counter or NUm of records: {counter}</h3>
			<label htmlFor='oneWorld'>
				<input
					name='OW'
					type='checkbox'
					value='OW'
					onClick={checkboxHandler}
				/>
				One World
			</label>
			<label htmlFor='oneWorld'>
				<input
					name='ST'
					type='checkbox'
					value='ST'
					onClick={checkboxHandler}
				/>{' '}
				Sky Team
			</label>
			<label htmlFor='oneWorld'>
				<input
					name='SA'
					type='checkbox'
					value='SA'
					onClick={checkboxHandler}
				/>{' '}
				Star Alliance
			</label>

			<ul>
				{filteredData.map((obj, i) => {
					return <li key={i}>{obj.name}</li>;
				})}
			</ul>
		</div>
	);
}

export default App;
