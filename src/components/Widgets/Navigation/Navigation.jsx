'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import {Navbar, Nav, NavItem, Button, Collapse, NavDropdown, MenuItem} from 'react-bootstrap';
//import {Link, RouteHandler} from 'react-router';

// Configs
import appConfig from '../../../configs/app';

// Components
import SubNavigation from '../SubNavigation';

/**
 * Navigation
 */
class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.toggleSubNavigation = this.toggleSubNavigation.bind(this);
        this.state = {showSubNavigation: false};
    }

    toggleSubNavigation(e) {
        e.preventDefault();
        this.setState({showSubNavigation: !this.state.showSubNavigation});
    }

    /**
     * @return {object}
     */
    render() {
        console.log(`TITLE :: ${appConfig.metadata.title}`);
        let brand = (
            <a href='#' onClick={() => {console.log(this.context.router);this.context.router.push('/');}}>
                <h1>
                    <span className='qv-logo-title'>{appConfig.metadata.title}</span>
                    <span className='icon-logo-horizontal'>
                        <span className='path1'></span>
                        <span className='path2'></span>
                        <span className='path3'></span>
                        <span className='path4'></span>
                        <span className='path5'></span>
                        <span className='path6'></span>
                        <span className='path7'></span>
                        <span className='path8'></span>
                    </span>
                </h1>
            </a>
        );

        let discoverClassName = `hidden-xs ${(this.state.showSubNavigation)?'active':''}`;

        return (
            <div>
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            {brand}
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Button bsSize='small' className='navbar-btn btn-quote visible-lg-inline-block'>Get a FREE Quote today!</Button>
                        <Nav pullRight className='nav-download visible-lg-inline-block'>
                            <Navbar.Text>
                                Download App
                                <Navbar.Link href="#"><i className='fa fa-lg fa-apple'></i></Navbar.Link>
                                <Navbar.Link href="#"><i className='fa fa-lg fa-android'></i></Navbar.Link>
                            </Navbar.Text>
                        </Nav>
                        <Nav pullRight>
                            <NavDropdown eventKey={1} title="Discover" id="discover-dropdown" className="visible-xs">
                                <MenuItem eventKey={1.1}>Professionals</MenuItem>
                                <MenuItem eventKey={1.2}>Projects</MenuItem>
                                <MenuItem eventKey={1.3}>Articles</MenuItem>
                            </NavDropdown>
                            <NavItem eventKey={2} className={discoverClassName} onClick={this.toggleSubNavigation}>Discover <i className='fa fa-angle-down'></i></NavItem>
                            <NavItem eventKey={3} href="#">Coupons</NavItem>
                            <NavItem eventKey={4} href="#">My Boards</NavItem>
                            <NavItem onClick={this.props.onLogin} eventKey={4} href="#">Login/Sign Up</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Collapse in={this.state.showSubNavigation}>
                    <div className="hidden-xs">
                        <SubNavigation />
                    </div>
                </Collapse>
            </div>
        );
    }
}

Navigation.contextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
};

export default Navigation;
