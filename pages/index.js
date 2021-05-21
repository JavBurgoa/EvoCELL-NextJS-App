import fs from 'fs';
import path from 'path';


const Home = ({ data }) => {
	// List all JSON files given our structure
	const columns = ['Species', 'Paper', 'Ontogenic_Stage', 'Number_of_cells', 'GEO_Number']
	return (
	<>
		<h1>MetaData</h1>
		<table id = "table_id" class = "Table">
			<tr>
				<th style = {{width:'15%'}}>Species</th>
				<th>Paper</th>
				<th>Ontogenic stage</th>
				<th>Number of cells</th>
				<th>GEO Number</th>
			</tr>
			{
			data.map( array => <>
							   <tr>
									{columns.map( col => <td>{array[col]}</td>) }
							   </tr>
							   </>
					)
			}
		</table>
			<p>
		  ############## This part below is just to show better how the optimized version works #####
			 </p>
		<table>
			{
				data.map( array => <>
									 <tr>
									 	<td>{array.Species}</td>
										<td>{array.Paper}</td>
										<td>{array.Ontogenic_Stage}</td>
										<td>{array.Number_of_cells}</td>
										<td>{array.GEO_Number}</td>
									 </tr>
								   </>
							 )
			}

		</table>
		##############
		<div>
			
			<p>
			  {
				data[1].Species
			  }
			  </p>
		</div>
	</>
	)
};

export default Home;

// Get all JSONs content into a single array
// Also, if this code below does not exist, import fs on the top gives an error
export async function getStaticProps() {

	const speciesNames = fs.readdirSync('../../Datasets/S3database/'); // important: SYNC
	const databasePath = '../../Datasets/S3database/'
	const pathsToFiles = speciesNames.map(species => databasePath + species + '/' + species + '.json')

	var data = []
	for(var path in pathsToFiles){
		const a = fs.readFileSync(pathsToFiles[path], 'utf8', (err, jsonString) => { return jsonString }); // important: SYNC
		data.push(JSON.parse(a))
	}
	console.log(data) //erase

  	return {
  	  props: {data}
  }
};