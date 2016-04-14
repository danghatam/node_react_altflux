'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import { Link } from 'react-router';

// Components

/**
 * Project Widget
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
                <div className="project-widget widget-content" style={{backgroundImage: `url(${data.img})`}}>
                    <div className="widget-top-left-addon">
                        <div className="widget-price">
                            S${data.price}
                        </div>
                    </div>
                    <div className="widget-top-right-addon">
                        <i className="fa fa-lg fa-heart-o"></i>
                    </div>
                    <div className="widget-bottom-addon">
                        <h3>{data.title}</h3>
                        <p>{data.description}</p>
                        <p><i className="icon-hdb"></i> HDB | 2 room | 100m<sup>2</sup></p>
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
