import BannerService from "./services/BannerService";

import React from 'react';
const ReactDOM = require('react-dom'); // <2>
const client = require('./client');
const {assertSourceType} = require("@babel/core/lib/config/validation/option-assertions"); // <3>
import BannerListComponent from './components/BannerListComponent.jsx';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import BannerEditComponent from "./components/BannerEditComponent.jsx";
import BannerCreateComponent from "./components/BannerCreateComponent.jsx";
import EmptyFieldComponent from "./components/EmptyFieldComponent.jsx";


class  MainFieldApp extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <div className="container">
                        <Switch>
                            <Route path="/" exact component={EmptyFieldComponent}/>
                            <Route path="/:bid" component={BannerEditComponent}/>
                            <Route path="/create" component={BannerCreateComponent}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}
ReactDOM.render(
    <MainFieldApp />,
    document.getElementById('mainField')
)



class BannersBarApp extends React.Component { // <1>

    constructor(props) {
        super(props);
        this.state = {banners: []};
    }

    componentDidMount() { // <2>
        BannerService.getBanners().then(r => {
            this.setState({banners: r.data});
        });
    }

    render() { // <3>
        return (
            <BannerListComponent banners={this.state.banners}/>
        )
    }
}

// end::employee[]

// tag::render[]
ReactDOM.render(

    <BannersBarApp />,
    document.getElementById('bannersBar')
)

