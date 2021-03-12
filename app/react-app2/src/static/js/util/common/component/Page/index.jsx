import React from 'react';
import PropTypes from 'prop-types';
import 'style/lib/common';

class Page extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <div id='top-header'></div >
                <div id='wrapper'>
                    <div id='left-menu'>
                        <div className='list'></div>
                    </div>
                    <div id='right-content'>
                        {this.props.children}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Page.propTypes = {
    onMetaChange: PropTypes.func,
    children: PropTypes.node.isRequired
};

Page.defaultProps = {
    onMetaChange: () => {
    }
};

export default Page;
