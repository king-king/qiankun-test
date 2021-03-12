import React from 'react';
import Page from 'util/common/component/Page';

import Example from './Example';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onMetaChange() {
        // meta数据准备完毕后的回调
    }
    jump = () => {
        history.pushState({}, 'react', '/views/app-react');
    }
    render() {
        return (
            <Page onMetaChange={() => { this.onMetaChange(); }}>
                {/* 在这里写页面的内容 */}
                <button onClick={this.jump}>react</button>
                <Example />
            </Page>
        );
    }
}

export default App;
