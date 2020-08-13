const getData = async (url, params) => {
	const { maps, position, name } = params;
	const endpoint = `?maps=${maps}${name ? `&name=${name}` : ""}${position ? `&position=${position}` : ""}`;

	// if taking multiple parameters
	// const endpoint = `?maps=${[...maps]}${name ? `&name=${[...name]}` : ""}${position ? `&position=${[...position]}` : ""}`;
	const res = await fetch(url + endpoint);
	return res.json();
};

export default getData;
