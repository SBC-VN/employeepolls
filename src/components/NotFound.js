import { useLocation } from 'react-router-dom';

const NotFound = ({itemType}) => {
    const location = useLocation();

    let value = location.pathname;
    if (itemType !== "path") {
        value = location.pathname.split('/').pop();
    }

    return (
        <div className="notfound-page-main">
            <div className="notfound-page-header">
                <h2>404 Invalid {itemType}</h2>
                <h3>{value}</h3>
            </div>
        </div>
    );
};

export default NotFound;