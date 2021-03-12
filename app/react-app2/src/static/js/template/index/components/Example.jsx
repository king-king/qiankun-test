import React from 'react';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    shouldComponentUpdate() {
        return true;
    }
    render() {
        return (
            <div>hello</div>
        );
    }
}


export default Example;
