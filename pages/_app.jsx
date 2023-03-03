import ContextProviders from '../contexts/context-providers';
import Layout from '../components/layout/layout';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
    return (
        <ContextProviders>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ContextProviders>
    );
}

export default MyApp;
