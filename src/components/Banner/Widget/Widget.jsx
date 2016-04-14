'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import { Link } from 'react-router';

// Components


/**
 * Banner Widget
 */
class Widget extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.
    }

    /**
     * @return {object}
     */
    render() {
        return (
            <div className={`feed-widget widget-size-${this.props.size}`}>
                <div className="banner-widget widget-content" style={{backgroundImage: `url(${this.props.data.img})`}}>
                    <div className="widget-bottom-addon">
                        <h2>{this.props.data.title}</h2>
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
