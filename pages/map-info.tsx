import Link from "next/link";
import { useState, useEffect } from "react";
import getData from "../lib/data";

interface IMapType {
	value: string;
	label: string;
};
interface IApiParams {
	maps: string;
	name: string|null;
	position: string|null;
};
	
const url: string = "https://native-land.ca/api/index.php";
const mapTypes: Array<IMapType> = [
	{value: "territories", label: "Territories"},
	{value: "languages", label: "Languages"},
	{value: "treaties", label: "Treaties"}
];

const MapInfo = () => {
	const [apiParams, setApiParams] = useState<IApiParams>({
		maps: "territories",
		name: null,
		position: null
	});
	const [mapData, setMapData] = useState<Array<any>|null>(null);

	const handleApiParams = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
		const key = e.target.id;
		const val = e.target.value.toLowerCase();
		setApiParams(prevState => ({
			...prevState,
			[key]: val.trim()
		}));
	};

	const callApi = async (e: React.FormEvent<HTMLFormElement>) => {
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
				<h3>1. Select Map Type</h3>
				<div>
					<label htmlFor="map-type">Map Type</label><br />
					<select id="maps" onChange={handleApiParams} value={apiParams.maps}>
						{mapTypes.map((mType: IMapType) => (
							<option
								key={mType.value}
								id={mType.value}
								value={mType.value}>
								{mType.label}
							</option>
						))}
					</select>
				</div>
				<h3>2. Enter Name or Latitude/Longitude</h3>
				<div>
					<label htmlFor="name">Name</label><br />
					<input id="name" type="text" onChange={handleApiParams}/>
				</div>
				<div>
					<label htmlFor="position">Latitude/Longitude (format: lat,lon)</label><br />
					<input id="position" type="text" onChange={handleApiParams}/>
				</div>
				<h3>3. Push this button</h3>
				<button style={{backgroundColor: "pink"}}>Call API</button>
			</form>
			<div>
				<h3>*Enter these values to check Hawaii:</h3>
				<p>Map Type: Languages, Name: ʻolelo-hawaiʻi</p>
				<p>Map Type: Territories, Name: hawaiian</p>
				<h3>Currently stored in state: (returned from API call in step 3)</h3>
				<ul>
					{mapData
						&& mapData.map(d => (
							<li key={d.id}>
								<h4 style={{color: "#2A1E5C", fontWeight: 700, fontSize: "1.2rem", display: "inline-block"}}>{d.properties.Name} -&nbsp;</h4>
								<a href={d.properties.description} target="_blank" rel="noreferrer noopener">Details on Native-Lands page</a>
							</li>
						))
					}
				</ul>
			</div>
			<Link as="/" href="/">
				<a>&larr; Back to home</a>
			</Link>
		</div>
	);
};

export default MapInfo;
