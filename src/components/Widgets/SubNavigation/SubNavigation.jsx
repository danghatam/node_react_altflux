'use strict';

// React
import React from 'react';

// Libraries
import {Navbar, Nav, NavItem} from 'react-bootstrap';

/**
 * SubNavigation
 */
class SubNavigation extends React.Component {

    /**
     * @return {object}
     */
    render() {
        return (
            <Navbar fluid className='sub-navbar'>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem href="#">Professionals</NavItem>
                        <NavItem href="#">Projects</NavItem>
                        <NavItem href="#">Articles</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default SubNavigation;
