'use strict';

// React
import React, { Component } from 'react';

class Projects extends Component {

	render() {
		return (
			<div className='projects'>
				<h3 className='title'>Project by Lorem Ipsum</h3>
				<section>
					<div className='project'>
						<div className='thumbnail'>
							<img src={'https://qanvast-api.s3.amazonaws.com/ware/large/f82a46ac-5fcc-4166-a588-432aae137526.jpg'} />
							<div className='caption'>
								<p className='name'>Lorem ipsum dolor sit</p>
								<p>
									<i className='icon-md icon-apartment'></i>
									<span>HBD</span>
									<span className='separator'></span>
									<span>2 rooms</span>
									<span className='separator'></span>
									<span>110m2</span>
								</p>
							</div>
						</div>
					</div>
					<div className='project'>
						<div className='thumbnail'>
							<img src={'https://qanvast-api.s3.amazonaws.com/ware/large/f82a46ac-5fcc-4166-a588-432aae137526.jpg'} />
							<div className='caption'>
								<p className='name'>Lorem ipsum dolor sit</p>
								<p>
									<i className='icon-md icon-apartment'></i>
									<span>HBD</span>
									<span className='separator'></span>
									<span>2 rooms</span>
									<span className='separator'></span>
									<span>110m2</span>
								</p>
							</div>
						</div>
					</div>
					<div className='project'>
						<div className='thumbnail'>
							<img src={'https://qanvast-api.s3.amazonaws.com/ware/large/f82a46ac-5fcc-4166-a588-432aae137526.jpg'} />
							<div className='caption'>
								<p className='name'>Lorem ipsum dolor sit</p>
								<p>
									<i className='icon-md icon-apartment'></i>
									<span>HBD</span>
									<span className='separator'></span>
									<span>2 rooms</span>
									<span className='separator'></span>
									<span>110m2</span>
								</p>
							</div>
						</div>
					</div>
				</section>
				<button className="btn btn-default">View All</button>
			</div>
		);
	}
}

export default Projects;