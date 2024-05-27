import React from 'react';
import "./MySelect.scss"

interface OptionType {
	// id: string;
	value: string;
	name: string;
}

interface MySelectProps {
	option: OptionType[];
	value: string;
	onChange: (value: string) => void;
}

const MySelect: React.FC<MySelectProps> = ({ option, value, onChange }) => {
	return (
		<div className="select-container">
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
			>
				{option.map((option, count:number) =>
					<option
						key={count}
						value={option.value}
					>
						{option.name}
					</option>
				)}
			</select>
		</div>
	);
}

export default MySelect;
