'use strict';

// React
import React from 'react';

// Libraries
import assign from 'object-assign';
import {Link, RouteHandler} from 'react-router';

// Components
import Select from 'react-select';

/**
 * Footer
 */
class Footer extends React.Component {
    constructor(props, context) {
        super(props, context); // NOTE: IntelliJ lints this as invalid. Ignore warning.
    }
    renderSelectOption(option) {
        let flag = null;
        if (option.value === 'singapore') {
            flag = (
                <span className="icon-singapore">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                    <span className="path5"></span>
                    <span className="path6"></span>
                    <span className="path7"></span>
                    <span className="path8"></span>
                    <span className="path9"></span>
                </span>
            );
        }
        if (option.value === 'malaysia') {
            flag = (
                <span className="icon-malaysia">
                    <span className="path1"></span>
                    <span className="path2"></span>
                    <span className="path3"></span>
                    <span className="path4"></span>
                    <span className="path5"></span>
                    <span className="path6"></span>
                    <span className="path7"></span>
                    <span className="path8"></span>
                    <span className="path9"></span>
                    <span className="path10"></span>
                    <span className="path11"></span>
                </span>
            );
        }
        return (
            <span>
                {flag}&nbsp;&nbsp;{option.label}
            </span>
        );
    }
    /**
     * @return {object}
     */
    render() {
        const currentYear = new Date().getFullYear();
        const options = [{
            value: 'singapore',
            label: 'Singapore'
        }, {
            value: 'malaysia',
            label: 'Malaysia'
        }];

        return (
            <footer className='container-fluid page-footer'>
                <div className='container'>
                    <div className='row'>
                        <section>
                            <p>Follow Us</p>
                            <p>
                                <a href="#" target="_blank"><i className='fa fa-2x fa-facebook'></i></a>
                                <a href="#" target="_blank"><i className='fa fa-2x fa-twitter'></i></a>
                                <a href="#" target="_blank"><i className='fa fa-2x fa-instagram'></i></a>
                            </p>
                        </section>
                        <section>
                            <p>Contact Us</p>
                            <p>
                                <a href="mailto:heretohelp@qanvast.com" target="_top">heretohelp@qanvast.com</a>
                            </p>
                        </section>
                        <section>
                            <p>List your Projects on Qanvast</p>
                            <p>
                                <a href="mailto:pros@qanvast.com" target="_top">pros@qanvast.com</a>
                            </p>
                        </section>
                        <section>
                            <p>Country</p>
                            <Select
                                name='country-select'
                                value={options[0]}
                                clearable={false}
                                searchable={false}
                                optionRenderer={this.renderSelectOption}
                                valueRenderer={this.renderSelectOption}
                                options={options}
                            />
                        </section>
                    </div>
                    <hr />
                    <div className="row">
                        <p>&copy; {currentYear} Qanvast Pte Ltd</p>
                        <p className="policy-links">
                            <a href='#'>Privacy Policy</a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href='#'>Terms & Conditions</a>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Footer;
