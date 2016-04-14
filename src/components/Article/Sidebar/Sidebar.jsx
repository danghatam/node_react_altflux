'use strict';

// React
import React from 'react';

// Components
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap';


/**
 * Article Sidebar
 */
class Sidebar extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.
    }

    /**
     * @return {object}
     */
    render() {
        const data = this.props.data;
        const header = (<h3 className="panel-title">{data.title}</h3>);
        return (
            <Panel header={header} className="article-sidebar">
                <ListGroup fill>
                    <ListGroupItem href="#1">Item 1</ListGroupItem>
                    <ListGroupItem href="#2">Item 2</ListGroupItem>
                    <ListGroupItem href="#3">&hellip;</ListGroupItem>
                </ListGroup>
                <br/>
            </Panel>
        );
    }
}

Sidebar.propTypes = {
    data: React.PropTypes.object.isRequired
};

export default Sidebar;
