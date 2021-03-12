import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';

window.reactAppLoad = 'reactAppLoad';
export default function App() {
    const jumpToVue = e => {
        window.history.pushState({}, 'vue', '/views/app-vue');
    };
    return (
        <BrowserRouter basename="/views/app-react">
            <div className='App-header'>
                <img src={logo} className="App-logo" alt="logo" />
                <nav>
                    <ul className='link'>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/users">Users</Link>
                        </li>
                        <li>
                            <a onClick={jumpToVue}>跳转到vue</a>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}
