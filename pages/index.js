import fs from 'fs';
import path from 'path';


const Home = ({ data }) => {
	// List all JSON files given our structure

	return (
		<div>
			<h1>MetaData</h1>
			<p>
			  {
				data[1].Species
			  }
			  </p>
			<p>
			  {
				data.map( file => <p key={file.Species}> {file.Species} </p>)
			  }
			  ##########################
			</p>
		</div>
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