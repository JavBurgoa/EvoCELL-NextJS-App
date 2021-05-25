import Footer from '../components/Footer';
import Title from '../components/Title';

const Layout = ({children}) =>{
	return(
		<div className="content">
			<Title />
			{children}
			<Footer />
		</div>
		);
}

export default Layout