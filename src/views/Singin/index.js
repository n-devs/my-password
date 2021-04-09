import React from 'react';
// import SingInComponent from '../../components/SignIn';
import './style.css';

const SingInComponent = React.lazy(() => import('../../components/SignIn'));

function SingInView() {
    return (
        <div className="full-screen-center">
            <SingInComponent>

            </SingInComponent>
        </div>)
};

export default SingInView;