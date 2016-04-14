'use strict';

// React
import React from 'react';

// Libraries
import NukaCarousel from 'nuka-carousel';

/**
 * Carousel
 */
class Carousel extends React.Component {
    /**
     * @return {object}
     */
    render() {
        let carouselData = this.props.data;
        let Decorators = [{
            component: React.createClass({
                render() {
                    return (
                        <div className="carousel-text">
                            <h2>{carouselData[this.props.currentSlide].title}</h2>
                            <p>{carouselData[this.props.currentSlide].description}</p>
                        </div>
                    )
                }
            }),
            position: 'BottomLeft',
            style: {
                padding: '20px 50px'
            }
        }, {
            component: React.createClass({
                render() {
                    let className = (this.props.currentSlide === 0)?'carousel-navigation-disabled':'carousel-navigation';
                    return (
                        <a className={className} onClick={this.props.previousSlide}>
                            <i className="icon-lg icon-left-arrow"></i>
                        </a>
                    )
                }
            }),
            position: 'CenterLeft',
            style: {
                padding: 20
            }
        }, {
            component: React.createClass({
                render() {
                    let className = (this.props.currentSlide >= (this.props.slideCount - 1))?'carousel-navigation-disabled':'carousel-navigation';
                    return (
                        <a className={className} onClick={this.props.nextSlide}>
                            <i className="icon-lg icon-right-arrow"></i>
                        </a>
                    )
                }
            }),
            position: 'CenterRight',
            style: {
                padding: 20
            }
        }];

        return (
            <NukaCarousel decorators={Decorators}>
                {carouselData.map(function(img, index) {
                    return (<img key={index} src={img.src}/>);
                    })}
            </NukaCarousel>
        );
    }
}

export default Carousel;
