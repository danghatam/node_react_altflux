'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import { Link } from 'react-router';

// Components
import ArticleWidget from '../../Article/Widget';
import BannerWidget from '../../Banner/Widget';
import ProjectWidget from '../../Project/Widget';


/**
 * DiscoveryFeeds
 */
class Feeds extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.
    }

    /**
     * @return {object}
     */
    render() {
        let widgets = this.props.data.map(function(d,i) {
            let size = (i%7 === 0 || i%7 === 6)?'expanded':'standard';
            if (d.type === 1)
                return (<ArticleWidget key={i} size={size} data={d}/>);
            if (d.type === 2)
                return (<BannerWidget key={i} size={size} data={d}/>);
            if (d.type === 3)
                return (<ProjectWidget key={i} size={size} data={d}/>);
        })
        return (
            <div className="discovery-feeds">
                <h2 className="title">Lorem ipsum dolor sit amet</h2>
                <p className="description">Excepteur sint occaecat cupidatat non proident, sunt in</p>
                <div className="feeds-container">
                    {widgets}
                </div>
            </div>
        )
    }
}

Feeds.contextTypes = {
    router: React.PropTypes.object.isRequired
};

Feeds.propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

export default Feeds;
