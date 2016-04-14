'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import { Link } from 'react-router';

// Components
import {Button} from 'react-bootstrap';


/**
 * Article Widget
 */
class Widget extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.
    }

    /**
     * @return {object}
     */
    render() {
        let data = this.props.data;
        return (
            <div className={`feed-widget widget-size-${this.props.size}`}>
                <div className="article-widget widget-content" style={{backgroundImage: `url(${data.img})`}}>
                    <div className="widget-top-right-addon">
                        <div className="widget-category">
                            {data.category}
                        </div>
                    </div>
                    <div className="widget-bottom-addon">
                        <h2>{data.title}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

Widget.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Widget.propTypes = {
    size: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired
};

export default Widget;
