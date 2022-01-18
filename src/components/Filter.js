import { useState } from 'react';
// import Checkbox from './Checkbox';
import './filter.css';

function Filter({ numOfRecords, checkboxHandler, companyData }) {
	return (
		<div className='filter'>
			<h1 className='filter-header'>Airlines</h1>
			<h3 className='filter-subheader'>Filter by Alliances</h3>
			<div className='checkbox-wrapper flexStart'>
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
			</div>
			<div>
				<h3>Number of Records: {numOfRecords}</h3>
			</div>
			<div>
				<ul>
					{companyData.map((obj, i) => {
						return (
							<li key={i}>
								{obj.name}
								{obj.site}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default Filter;
