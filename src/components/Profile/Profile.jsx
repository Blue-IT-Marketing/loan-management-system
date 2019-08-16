import React, { Fragment,useState } from 'react'
import UploadMusic from './UploadMusic';
import UploadVideos from './UploadVideos';

export default function Profile (){
	const[display,setDisplay] = useState('upload-music');
	return (
    <Fragment>
      <div className="box box-body">
        <div className="box box-header">
          <h3 className="box-title">
            <strong>
              {" "}
              <i className="fa fa-user"> </i> Profile Manager
            </strong>
          </h3>

          <div className="box-tools">
            <button
              type="button"
              className="btn btn-box-tool"
              name="upload-music"
              onClick={() => setDisplay("upload-music")}
            >
              <strong>
                <i className="fa fa-soundcloud"> </i>
                Upload Music
              </strong>
            </button>
            <button
              type="button"
              className="btn btn-box-tool"
              name="upload-videos"
              onClick={() => setDisplay("upload-videos")}
            >
              <strong>
                <i className="fa fa-youtube-play"> </i>
                Upload Videos
              </strong>
            </button>
          </div>
        </div>

        {display === "upload-music" ? <UploadMusic /> : ""}
        {display === "upload-videos" ? <UploadVideos /> : ""}
      </div>
    </Fragment>
  );
}
