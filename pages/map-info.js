import Link from "next/link";
import { useState, useEffect } from "react";
import getData from "../lib/data";

const url = "https://native-land.ca/api/index.php";
const mapTypes = [
	{value: "territories", label: "Territories"},
	{value: "languages", label: "Languages"},
	{value: "treaties", label: "Treaties"}
];

const MapInfo = () => {
	const [apiParams, setApiParams] = useState({
		maps: "territories",
		name: null,
		position: null
	});
	const [mapData, setMapData] = useState(null);

	const handleApiParams = e => {
		const key = e.target.id;
		const val = e.target.value.toLowerCase();
		setApiParams(prevState => ({
			...prevState,
			[key]: val.trim()
		}));
	};

	const callApi = async e => {
		e.preventDefault();
		getData(url, apiParams)
			.then(res => setMapData(res));
	};

	useEffect(() => {
		console.log(mapData);
	}, [mapData]);

	return (
		<div>
			<h2>API parameters</h2>
			<p>
				<a href="https://native-land.ca/api-docs/" target="_blank" rel="noreferrer noopener">API documentation</a>
			</p>
			<form onSubmit={callApi}>
				<div>
					<label htmlFor="map-type">Map Type</label><br />
					<select id="maps" onChange={handleApiParams} value={apiParams.maps}>
						{mapTypes.map(mType => (
							<option key={mType.value} id={mType.value} type="checkbox" value={mType.value}>{mType.label}</option>
						))}
					</select>
				</div>
				<div>
					<label htmlFor="name">Name</label><br />
					<input id="name" type="text" onChange={handleApiParams}/>
				</div>
				<div>
					<label htmlFor="position">Latitude/Longitude (format: lat,lon)</label><br />
					<input id="position" type="text" onChange={handleApiParams}/>
				</div>
				<button>Call API</button>
			</form>
			<div>
				<h3>I think these are the only two Hawaii combos:</h3>
				<p>Map Type: Languages, Name: ʻolelo-hawaiʻi</p>
				<p>Map Type: Territories, Name: hawaiian</p>
				<h3>Stored in state:</h3>
				{mapData
					&& mapData.map(d => (
						<div key={d.id}>
							<span>{d.properties.Name} -&nbsp;</span>
							<a href={d.properties.description} target="_blank" rel="noreferrer noopener">Find more information</a>
						</div>
					))
				}
			</div>
			<Link href="/">
				<a>Back to home</a>
			</Link>
		</div>
	);
};

export default MapInfo;
