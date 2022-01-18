import { useState, useEffect } from 'react';
//data
import jsonData from './data/myData.json';

function App() {
	const [activeFiltersList, setActiveFiltersList] = useState([]); // checkboxes
	const [companyData, setCompanyData] = useState([]); // filtered Data set based on checkboxes
	const [numOfRecords, setNumOfRecords] = useState(0);

	const checkboxHandler = (event) => {
		if (event.target.checked) {
			addFilter(event);
		} else {
			removeFilter(event);
		}
	};

	const addFilter = (event) => {
		setActiveFiltersList(() => {
			return [...activeFiltersList, event.target.value];
		});
	};

	const removeFilter = (event) => {
		return setActiveFiltersList(
			activeFiltersList.filter((checkbox) => {
				return event.target.value !== checkbox;
			})
		);
	};

	const filteredDataHandler = () => {
		// return data based on checkbox status
		// for every obj, ask the question: Is this current obj.alliance === Any of the indexs of "active Filter" i.e Checkbox
		return jsonData.filter((currentObj) => {
			if (activeFiltersList.length === 0) {
				// show all records
				return currentObj;
			} else if (
				currentObj.alliance === activeFiltersList[0] ||
				currentObj.alliance === activeFiltersList[1] ||
				currentObj.alliance === activeFiltersList[2]
			) {
				// show records with filter checked
				return currentObj;
			}
		});
	};

	const alphSortedDataHandler = (data) => {
		// sort alphabetically asc
		return data.sort((a, b) => {
			let name1 = a.name.toLowerCase(),
				name2 = b.name.toLowerCase();

			if (name1 < name2) {
				return -1;
			}
			if (name1 > name2) {
				return 1;
			}
			return 0;
		});
	};

	useEffect(() => {
		const filteredData = filteredDataHandler();
		const alphaSortedData = alphSortedDataHandler(filteredData);

		setNumOfRecords(alphaSortedData.length);
		setCompanyData(alphaSortedData);
	}, [activeFiltersList]);

	return (
		<div className='App'>
			<h3>Number of Records: {numOfRecords}</h3>
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
				{companyData.map((obj, i) => {
					return (
						<li key={i}>
							{obj.name}
							{obj.site}
						</li>
					);
				})}
				{/* {filteredData === undefined
					? filteredData.map((obj, i) => {
							return <li key={i}>{obj.name}</li>;
					  })
					: 'no data'} */}
			</ul>
		</div>
	);
}

export default App;

// this use effect works combines together as oppossed to breaking into sepereate functions
// useEffect(() => {
// 	let activeData = jsonData.filter((obj) => {
// 		// for every obj, ask the question: Is this current obj.alliance === Any of the indexs of "active Filter"
// 		if (activeFiltersList.length === 0) {
// 			// show all records
// 			return obj;
// 		} else if (
// 			obj.alliance === activeFiltersList[0] ||
// 			obj.alliance === activeFiltersList[1] ||
// 			obj.alliance === activeFiltersList[2]
// 		) {
// 			// show records with filter checked
// 			return obj;
// 		}
// 	});

// 	const sortedData = activeData.sort((a, b) => {
// 		let fa = a.name.toLowerCase(),
// 			fb = b.name.toLowerCase();

// 		if (fa < fb) {
// 			return -1;
// 		}
// 		if (fa > fb) {
// 			return 1;
// 		}
// 		return 0;
// 	});

// 	// sortedData(activeData);

// 	setNumOfRecords(activeData.length);
// 	setCompanyData(sortedData);
// }, [activeFiltersList]);

//OW == 17
//ST = 20
//SA = 27
// all non filter == 1315

// useEffect(() => {
// 	const checkboxes = activeFiltersList.map((checkbox) => {
// 		return checkbox;
// 	});
// 	// cycle thru jsonDatad
// 	//get data obj where alliance === activeFiltersList[]
// 	const activeData = jsonData.filter((obj) => {
// 		//			return obj.alliance == activeFiltersList;
// 		// if (obj.alliance === 'OW' || obj.alliance === 'SA') {
// 		// 	return obj;
// 		// }

// 		if (obj.alliance === checkboxes) {
// 			console.log(4114);
// 			return obj;
// 		}
// 	});

// 	//set the array
// 	setFilteredData(activeData);
// }, [activeFiltersList]);

//******POSSIBILTIES**********
//no check options
// OW,ST,SA, 'none' or all data

// three check options
// OW,ST,SA

// two check options
// OW,ST
// OW, SA
// ST, SA

// if (
// 	obj.alliance === 'OW' ||
// 	obj.alliance === 'ST' ||
// 	obj.alliance === 'SA'
// ) {
// 	// three check options
// 	// OW,ST,SA
// 	setCounter((x) => {
// 		return x + 1; //64 records
// 	});
// 	return obj;
// }

// one check options
// OW
// ST
// SA
