import React,{Fragment} from 'react';

const UploadMusic = () => {
	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<strong>
							<i className="fa fa-soundcloud"> </i> Uploading Music Files
						</strong>
					</h3>
				</div>
				<div className="box-footer">
					<form className="form-horizontal">
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Music Title..."
							/>
						</div>
						<div className="form-group">
							<textarea
								className="form-control"
								placeholder="Describe your music..."
							/>
						</div>
						<div className="form-group">
							<input
								type="file"
								className="form-control"
								name="upload-file"
							/>
						</div>
						<div className="form-group">
							<button
								type="button"
								className="btn btn-success btn-lg"
								name="upload-music"
							>
								<strong>
									<i className="fa fa-cloud-upload"> </i>
                  Upload
								</strong>
							</button>
							<button type="button" className="btn btn-warning btn-lg">
								<strong>
									{" "}
									<i className="fa fa-eraser"> </i> Reset{" "}
								</strong>
							</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default UploadMusic;
