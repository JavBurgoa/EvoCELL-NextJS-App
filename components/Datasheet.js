import fs from 'fs';

const Datasheet = ({ data }) => {
	// List all JSON files given our structure
	const columns = ['Species', 'Paper', 'Ontogenic_Stage', 'Number_of_cells', 'GEO_Number']
	
	const al = (e, path) => {

		return alert(path)
	} //erase

	return (
	<>
		<h1>EvoCELL App</h1>

		<table id = "table_id" class = "Table">
			<tr>
				<th style = {{width:'15%'}}>Species</th>
				<th>Paper</th>
				<th>Ontogenic stage</th>
				<th>Number of cells</th>
				<th>GEO Number</th>
				<th>Download</th>
			</tr>
			{
			data.map( array => <>
							   <tr>
									{columns.map( col => <td key = {col}>{array[col]}</td>) }

									<td>
										<button onClick={(e) => al(e, '../../Datasets/S3database/' + array.Species.replace(' ', '_') + '/' + array.Species.replace(' ', '_') + '.json')}>Download</button>
									</td>
							   </tr>
							   </>
					)
			}
		</table>
	</>
	)
};

export default Datasheet;


export async function getStaticProps() {

	const speciesNames = fs.readdirSync('../../Datasets/S3database/'); // important: SYNC
	const databasePath = '../../Datasets/S3database/'
	const pathsToFiles = speciesNames.map(species => databasePath + species + '/' + species + '.json')

	var data = []
	for(var path in pathsToFiles){
		const a = fs.readFileSync(pathsToFiles[path], 'utf8', (err, jsonString) => { return jsonString }); // important: SYNC
		data.push(JSON.parse(a))
	}

  	return {
  	  props: {data}
  }
};