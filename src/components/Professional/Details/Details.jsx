'use strict';

// React
import React, { Component } from 'react';

//Libraries
import _ from 'lodash';
import assign from 'object-assign';

//Actions
import AppActions from '../../../actions/AppActions';
import ProfessionalActions from '../../../actions/ProfessionalActions';

//Store
import ProfessionalStore from '../../../stores/ProfessionalStore';

//components
import Projects from './Projects';
import Reviews from './Reviews';

function getInitialState(){
	return {
		idLoading: true,
		professional: {
			categories: []
		}
	};
}

function getStateFromStores(parameters){
	let professional = ProfessionalStore.get(parameters.professional.id);
	return professional == null ? null : {
		isLoading: false,
		professional
	};
}

function fireActions(state, callback){
	let parameters = {
		id: state.professional.id,
		callback: callback
	};
	ProfessionalActions.getProfessional(parameters);
}

class Details extends Component {

	constructor(props, context){
		super(props, context);

		this.state = getInitialState();

		this.onChange = () => {
			let parameters = {
				professional: {
					id: null
				}
			};
			if (this.props.params != null) {
                if (this.props.params.id != null) {
                    let proId = parseInt(this.props.params.id);

                    if (!isNaN(proId)) {
                        parameters.professional.id = proId;
                    }
                }
            }

            let newState = getStateFromStores(parameters);

            if (newState != null) {
                this.setState(newState);
            }
		};
	}

	componentDidMount() {
        ProfessionalStore.listen(this.onChange);
    }

    componentWillUnmount() {
        ProfessionalStore.unlisten(this.onChange);
    }

    componentWillReceiveProps(nextProps) {
        this.onChange();
    }

	render(){
		// console.log(this.state);
		let professional = this.state.professional;
		return (
			<div className='container-fluid'>
				<div className='professional-detail'>
					<ol className="breadcrumb">
					  <li><a href="#">Home</a></li>
					  <li><a href="#">Library</a></li>
					  <li className="active">Data</li>
					</ol>
					<div className='top'>
						<div className='img-showcase' style={ {
							backgroundImage: 'url(https://qanvast-api.s3.amazonaws.com/ware/large/ce807a0d-e2cd-4c34-ac0e-651edc67af5f.jpg)',
							backgroundSize: 'cover'
						} } />
					</div>
					<section className='main'>
						<div className='left'>
							<div className='detail'>
								<div className='info'>
									<img className='logo' src={'https://qanvast-api.s3.amazonaws.com/company/logo/thumbnail/21261984-a08a-43b9-b01a-d1bca5d7f021.jpg'} />
									<p className='category'>{professional.categories[0]}</p>
									<p className='name'>{professional.name}</p>
									<p className='address'>{professional.address}</p>
									<p className='phone'><i className="fa fa-phone"></i><span>{professional.phone}</span></p>
									<p className='email'><i className="fa fa-envelope-o"></i><span>{professional.email}</span></p>
								</div>
								<div className='description'>
									<h2>About This Professional</h2>
									<p>{professional.description}</p>
								</div>
							</div>
							<Projects id={professional.id} />
						</div>
						<div className='right'>
							<Reviews id={professional.id} />
						</div>
					</section>
				</div>
			</div>
		);
	}

	static fetchData(routerState, callback) {
        let state = getInitialState();

        if (routerState.params != null) {
            if (routerState.params.id != null) {
                let proId = parseInt(routerState.params.id);

                if (!isNaN(proId)) {
                    state.professional.id = proId;
                }
            }
        }

        fireActions(state, callback);
    }

    static generateMetadata(routerState) {
        let state = getInitialState();

        if (routerState.params != null) {
            if (routerState.params.id != null) {
                let proId = parseInt(routerState.params.id);

                if (!isNaN(proId)) {
                    state.professional.id = proId;
                }
            }
        }

        let professional = ProfessionalStore.get(state.professional.id);

        return {
            title: `Professional Details - ${professional.name}`,
            description: `${professional.description}`
        };
    }
}

export default Details;