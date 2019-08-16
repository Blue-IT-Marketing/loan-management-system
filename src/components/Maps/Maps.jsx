import React,{Fragment} from 'react';
import {settings} from '../../constants';

export default function Maps ({maps_url}) {

	return(
		<Fragment>
			{
				maps_url ?
					<iframe
						src={maps_url}
						className="map-style"
						height='460'
						width='600'
						allowFullScreen
						frameBorder="0"
					/>: `
                    Google Map not Available
                    `
			}
		</Fragment>
	);
}