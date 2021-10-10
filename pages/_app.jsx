import PropTypes from 'prop-types';

import '../styles/base/styles.scss';
import '../styles/index.scss';
import Navbar from '../components/Navbar';
import { AuthContextProvider } from '../contexts/authContext';

const MyApp = ({ Component, pageProps }) => (
	<AuthContextProvider>
		<Navbar />
		<Component {...pageProps} />
	</AuthContextProvider>
);

MyApp.defaultProps = {
	Component: null,
	pageProps: {},
};

MyApp.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.object,
};

export default MyApp;