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
    render() {
        return (
            <Page onMetaChange={() => { this.onMetaChange(); }}>
                {/* 在这里写页面的内容 */}
                <Example />
                <Example />
            </Page>
        );
    }
}

export default App;
