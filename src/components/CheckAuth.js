import { useSelector } from 'react-redux';

/**
 *  Simple wrapper component that checks if the user is logged in.  If so, it renders the component passed in as a prop.
 *  
*/

const Navagator = ({Component}) => {
    let auth = useSelector(store => store.authUser);

    if (auth.value !== null) {
        return <Component />;
    }

    return null;
};

export default Navagator;