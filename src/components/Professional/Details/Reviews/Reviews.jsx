'use strict';

//React
import React, { Component } from 'react';

class Reviews extends Component {

	render() {
		return (
			<div className='reviews'>
				<div className='total'>9 reviews</div>
				<section>
					<div className='review'>
						<p className='name'>Lorem ipsum dolor</p>
						<div className='rating'>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-half-o"></i>
						</div>
						<p className='comment'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra ultricies nibh ac viverra. Nunc molestie dui eget ultrices dictum.
						</p>
						<a href='#' className='readmore'>Read more</a>
					</div>
					<div className='review'>
						<p className='name'>Lorem ipsum dolor</p>
						<div className='rating'>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-half-o"></i>
						</div>
						<p className='comment'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra ultricies nibh ac viverra. Nunc molestie dui eget ultrices dictum.
						</p>
						<a href='#' className='readmore'>Read more</a>
					</div>
					<div className='review'>
						<p className='name'>Lorem ipsum dolor</p>
						<div className='rating'>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-half-o"></i>
						</div>
						<p className='comment'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra ultricies nibh ac viverra. Nunc molestie dui eget ultrices dictum.
						</p>
						<a href='#' className='readmore'>Read more</a>
					</div>
					<div className='review'>
						<p className='name'>Lorem ipsum dolor</p>
						<div className='rating'>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star"></i>
							<i className="fa fa-star-half-o"></i>
						</div>
						<p className='comment'>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas viverra ultricies nibh ac viverra. Nunc molestie dui eget ultrices dictum.
						</p>
						<a href='#' className='readmore'>Read more</a>
					</div>
				</section>
				<button className="btn btn-default">View All</button>
			</div>
		);
	}
}

export default Reviews;