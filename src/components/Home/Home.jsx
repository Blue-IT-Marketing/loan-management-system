import React, { Fragment } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

import {settings, routes} from '../../constants';


import './Home.css';

export default function Home (){
	
	return (
    <Fragment>
      <div className="box box-body">
        <div className="box-header">
          <h3 className='box-title'>
          <strong><i className={'fa fa-home'}> </i> {settings.app_name} </strong>          
          </h3>
          <div className='box-tools'>
            <span>{settings.app_long_name}</span>
          </div>
        </div>
        <div className="box box-footer">
            <div className='box-header'>
              <h3 className='box-title'>{settings.app_descrition}</h3>
            </div>
        </div>
      </div>
    </Fragment>
  );
}
