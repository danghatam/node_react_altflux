'use strict';

// React
import React from 'react';

// Libraries


/**
 * Share
 */
class Share extends React.Component {

    /**
     * @return {object}
     */
    render() {
        return (
            <div className="widget-share">
                <a href="#">
                    <i className="fa fa-2x fa-twitter"></i>
                </a>
                <a href="#">
                    <i className="fa fa-2x fa-facebook"></i>
                </a>
                <a href="#">
                    <i className="fa fa-2x fa-envelope"></i>
                </a>
                <a href="#">
                    <i className="fa fa-2x fa-share-alt"></i>
                </a>
            </div>
        );
    }
}

Share.propTypes = {
    link: React.PropTypes.string.isRequired
};

export default Share;
