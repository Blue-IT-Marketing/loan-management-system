// eslint-disable-next-line no-unused-vars
import React,{Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import { routes } from '../../constants';
import {chunk} from 'lodash';

// eslint-disable-next-line no-unused-vars
const ShowVideo = () => {
	return(
		<Fragment>
			<div className='box box-body'>
				<div className='box box-header'>
					<h3 className='box-title'></h3>
				</div>                
			</div>
		</Fragment>
	);
};
// eslint-disable-next-line no-unused-vars
const ShowMusic = ({media}) => {
	return (
		<Fragment>
			<div className="box box-info">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-music"> </i> {media.title}
					</h3>
				</div>
				<div className="box-footer">
					{media.description}
					<ul className="list-group">
						<li className="list-group-item">Genre : {media.genre}</li>
						<li className="list-group-item">Length : {media.play_time}</li>
						<li className='list-group-item'>
							<button
								type='button'
								className='btn btn-soundcloud btn-sm'
							><i className='fa fa-play'> </i> {' '}
                                play
							</button>
							<button
								type='button'
								className='btn btn-success btn-sm'
							><i className='fa fa-download'> </i> {' '}
                                download
							</button>                
						</li>
					</ul>
				</div>
			</div>
		</Fragment>
	);
};
// eslint-disable-next-line no-unused-vars
const MediaItem = ({mediaItem}) => {
	const [media, setMedia] = useState({
		uid: '',
		mediaid: '',
		mediatype: '',
		title: '',
		description: '',
		genre: '',
		media_file: '',
		play_time: ''
	});
    
	useEffect(() => {
		setMedia({
			...mediaItem
		});
	}, [mediaItem]);
    
	console.log('Media Item Called',mediaItem);
	return (
		<Fragment>
			{media.mediatype === 'music' ? <ShowMusic media={media} /> : ''}
			{media.mediatype === 'video' ? <ShowVideo media={media} /> : ''}
		</Fragment>
	);
};


const initState = [
	{
		uid: '32427942834',
		mediaid: '423423',
		mediatype: 'music',
		title: 'redemption song',
		genre: 'reggae',
		description: 'bob marley the wailers song about freedom',
		media_file: '',
		play_time: '3:42'
	},
	{
		uid: '32427942ertertre834',
		mediaid: '42342gerger3',
		mediatype: 'music',
		title: 'Yellow',
		genre: 'Country Music',
		description: 'American Golden Oldies',
		media_file: '',
		play_time: '4:55'
	},
	{
		uid: '3242794tgtgerr2834',
		mediaid: '423ergerrt423',
		mediatype: 'music',
		title: 'Mama Africa',
		genre: 'Mbaxanga',
		description: 'South African Traditional Music',
		media_file: '',
		play_time: '4:55'
	},
	{
		uid: '32427rwettrgt942834',
		mediaid: '4234dfsdfasd23',
		mediatype: 'music',
		title: 'Yellow',
		genre: 'Country Music',
		description: 'American Golden Oldies',
		media_file: '',
		play_time: '4:55'
	},
	{
		uid: '324279428sda34',
		mediaid: '423asdasdef423',
		mediatype: 'music',
		title: 'Yellow',
		genre: 'Country Music',
		description: 'American Golden Oldies',
		media_file: '',
		play_time: '4:55'
	}
];

// eslint-disable-next-line no-unused-vars
const Media = () => {
	//limit returned mediafiles from the backend
	const[mediaFiles,setMediafiles] = useState(initState);
    
	useEffect(() => {
        
		axios.get(routes.media_files).then(result => {
			if(result.status === 200){
				return result.data;
			}else{
				throw new Error('there was an error retrieving media files');
			}
		}).then(media_files => {
			if (media_files.length > 0){
				// setMediafiles({
				// 	mediaFiles: media_files
				// });
			}
		}).catch(e => {
			console.log('Error loading media files',e);			
		});
	},[]);
    

	function onSearch () {

	}

	const mediafilesChunks = chunk(mediaFiles, 4);
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-medium"> </i> Media
					</h3>
					<div className="box-tools">
						<form
							onSubmit={e => onSearch(e)}
							method="get"
							className="sidebar-form box-tool"
						>
							<div className="input-group">
								<input
									type="text"
									name="q"
									className="form-control"
									placeholder="Search Media..."
								/>
								<span className="input-group-btn">
									<button
										type="submit"
										name="search"
										id="search-btn"
										className="btn btn-flat"
									>
										<i className="fa fa-search" />
									</button>
								</span>
							</div>
						</form>
					</div>
				</div>
				{mediafilesChunks.map(mediaFiles => {
					return (
						<div className="row">
							{mediaFiles.map(mediaItem => {
								return (
									<div className="col-lg-3">
										<MediaItem
											mediaItem={mediaItem}
											key={mediaItem.mediaid}
										/>
									</div>
								);
							})}
						</div>
					);
				})}
			</div>
		</Fragment>
	);
};

export default Media;
