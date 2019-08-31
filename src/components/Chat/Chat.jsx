/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import { firebase } from '../../firebase';
import { routes } from '../../constants';
import  axios  from 'axios';


const list_users_init = [];


const RenderListUser = ({
	listUsers,
	currentUserId,
	currentPeerUser,
	setPeerUser
}) => {
	return (
		<Fragment>
			<div className="box box-comments">
				{listUsers.map((item, index) => {
					console.log('ITEMS',item);
					if (item.uid !== currentUserId) {
						return (
							<button
								key={index}
								className={
									currentPeerUser && currentPeerUser.uid === item.uid
										? 'viewWrapItemFocused'
										: 'viewWrapItem'
								}
								onClick={() => {
									setPeerUser(item);
								}}
							>
								<img
									className="viewAvatarItem"
									src={item.photoUrl}
									alt="icon avatar"
								/>
								<div className="viewWrapContentItem">
									<span className="textItem">{`Nickname: ${
										item.nickname
									}`}</span>
									<span className="textItem">{`About me: ${
										item.aboutMe ? item.aboutMe : 'Not available'
									}`}</span>
								</div>
							</button>
						);
					}
				})}
			</div>
		</Fragment>
	);
};


const Chat = () => {	
	const [listUsers, setUsersList ] = useState(list_users_init);
	const [currentPeerUser, setPeerUser ] = useState({});
	const [ user_account_state ] = useContext(UserAccountContext);
	

	const getListUsers = async () => {	
		try{
			await axios.get(routes.chat_users_api_endpoint).then(result => {
				console.log('Request result ',result);
				if (result.status === 200 || result.status === 304) {
					return result.data;
				}else{
					throw new Error('Error getting users list');
				}
			}).then(users_list => {     
				console.log('i was already here muss',users_list);			
				return users_list;
			}).catch(error => {
				console.log('error loading chat users : ', error);
				return [];
			});	
		}catch(error){
			console.log(error);
		}
			
		console.log('i soud never come here HERE');	
	};

	

	useEffect( () => {
		let my_result = '';
		const getUsers = () => { 
			getListUsers().then(result => {
				console.log('Running fetch API', result);				
				console.log('User List',result);
				setUsersList(result);				
			});
			
			console.log('are we there yet');
		};
		getUsers();

		console.log('Done with fetch API');
	}, []);

	return (
		<Fragment>
			<div className="box box-body">
				<div className="box box-header">
					<h3 className="box-title">
						<i className="fa fa-comment"> </i> Chat
					</h3>
				</div>
				<div className="row">
					<div className="col-sm-3">
						{
							listUsers ? <RenderListUser
								listUsers={listUsers}
								currentUserId={user_account_state.user_account.uid}
								setPeerUser={setPeerUser}
								currentPeerUser={currentPeerUser}
							/> 
								: ''
						}
					</div>
				</div>
			</div>
		</Fragment>
	);
};





export default Chat;
