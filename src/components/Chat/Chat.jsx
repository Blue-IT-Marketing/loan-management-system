/* eslint-disable no-unused-vars */
import React, { Fragment, useState, useContext, useEffect } from 'react';
import { UserAccountContext } from '../../context/UserAccount/userAccountContext';
import { firebase } from '../../firebase';
import { routes } from '../../constants';
import axios from 'axios';
import avatar from '../../assets/avatar04.png';
import './Chat.css';
const list_users_init = [
	{
		uid:'3457934hfdhfy034yt3vf34f',
		email:'joeslovo@gmail.com',
		photoURL: avatar,
		displayName : 'joe slovo'
	},
	{
		uid:'3457934h67reydh34yt3vf34f',
		email:'thomaschauke@gmail.com',
		photoURL: avatar,
		displayName : 'thomas chauke'
	},
	{
		uid:'32498ufpsdofo54it459uf34f',
		email:'tshililo@gmail.com',
		photoURL: avatar,
		displayName : 'tshililo mawela'
	},
	{
		uid:'3457934hfdhfy034y4354f',
		email:'tendanitsedu@gmail.com',
		photoURL: avatar,
		displayName : 'Tendani Tsedu'
	}



];


const chat_room_init = {
	room_id: '123',
	room_name: 'Midey General',
	capacity: 255,
	room_description: 'General Midey Talk'
};

const chat_rooms_default = [
	{
		room_id: '123',
		room_name: 'Midey General',
		capacity: 255,
		room_description: 'General Midey Talk'
	},
	{
		room_id: '213',
		room_name: 'Loan Clients',
		capacity: 255,
		room_description: 'Everything Related to loan clients'
	}
];


const RenderListUser = ({
	listUsers,
	currentUserId,
	currentPeerUser,
	setPeerUser
}) => {
	return (
		<Fragment>
			
			{listUsers.map((item, index) => {
				
				if (item.uid !== currentUserId) {
					return (
						<li
							key={index}
							onClick={e => {
								setPeerUser(item);								
							}}														
						>	<a href="#">
								<img
									className="contacts-list-image"
									src={item.photoURL || avatar}
									alt="avatar"
									height="32"
									width="32"
								/>
								<div className='contacts-list-info'>
									<span className='my-contacts-list-name'>{item.displayName ? item.displayName : item.email}</span>
								</div>		
							</a>													
						</li>
					);
				}
			})}
		</Fragment>
	);
};


const ReceivedMessages = () => {
	return(
			
		<div className="direct-chat-msg">
			<div className="direct-chat-info clearfix">
				<span className="direct-chat-name pull-left">
			Alexander Pierce
				</span>
				<span className="direct-chat-timestamp pull-right">
			23 Jan 2:00 pm
				</span>
			</div>
			{/* <!-- /.direct-chat-info --> */}
			<img
				className="direct-chat-img"
				src={avatar}
				alt="Message User Image"
			/>
			{/* <!-- /.direct-chat-img --> */}
			<div className="direct-chat-text">
			Is this template really for free? That's unbelievable!
			</div>
			{/* <!-- /.direct-chat-text --> */}
		</div>
			
	);
};

const SentMessages = () => {

	return(
		<div className="direct-chat-msg right">
			<div className="direct-chat-info clearfix">
				<span className="direct-chat-name pull-right">
                        Sarah Bullock
				</span>
				<span className="direct-chat-timestamp pull-left">
                        23 Jan 2:05 pm
				</span>
			</div>
			{/* <!-- /.direct-chat-info --> */}
			<img
				className="direct-chat-img"
				src={avatar}
				alt="Message User Image"
			/>
			{/* <!-- /.direct-chat-img --> */}
			<div className="direct-chat-text">
                      You better believe it!
			</div>                    
		</div>
	);
};

const Chat = () => {
	const [listUsers, setUsersList] = useState(list_users_init);
	const [currentPeerUser, setPeerUser] = useState('');
	const [chatRooms, setChatRooms] = useState(chat_rooms_default);
	const [Chat,setChat] = useState(chatRooms[0]);
	const [messageInput,setMessage] = useState('');
	
	const [messageStream,setMessageStream] = useState('');
	
	const { user_account_state } = useContext(UserAccountContext);
	


	const onSwitchChat = e => {
		let chat = chatRooms.find(chat => chat.room_id === e.target.value);
		setChat(chat);
	};

	const sendMessage = e => {	
		console.log('Chat Message',e.target.value);
		setMessage('');
		// Send message here using web sockets
		
	};

	const receiveMessage = e => {

	};

	const loadMessages = async e => {
		try{
			await axios.get(routes.chat_messages_api_endpoint).then(result => {
				if(result.status === 200){
					return result.data;
				}else{
					throw new Error('there was an error fetching chat messages');
				}
			}).then(messages => {
				setMessageStream(messages);
			}).catch(error => {
				console.log(error);
			});
		}catch(error){
			console.log(error);
		}
	};

	useEffect(() => {
		let my_result = '';
		const getListUsers = async () => {
			let results;
			try {
				await axios
					.get(routes.chat_users_api_endpoint)
					.then(result => {
						console.log('Request result ', result);
						if (result.status === 200 || result.status === 304) {
							return result.data;
						} else {
							throw new Error('Error getting users list');
						}
					})
					.then(users_list => {
						console.log('i was already here muss', users_list);
						setUsersList(users_list);
						results = users_list;
					})
					.catch(error => {
						console.log('error loading chat users : ', error);

						results = [];
					});
			} catch (error) {
				console.log(error);
				results = [];
			}

			console.log('i soud never come here HERE');
			return results;
		};

		getListUsers().then(result => console.log('Done with fetch API', result));
		return () => {
			setUsersList([]);
		};
	}, []);

	return (
		<Fragment>
			<div className="box box-primary">
				<div className="box-header with-border">
					<h3 className="box-title">
						<i className="fa fa-comment"> </i> Chat
					</h3>
					<div className="box-tools pull-right">
						<button className="btn btn-box-tool">
							<select
								className="dropdown-item col-sm-9 "
								name="select-room"
								value={Chat.room_id}
								onChange={e => onSwitchChat(e)}
							>
								{chatRooms.map(room => {
									return (
										<option value={room.room_id} className="dropdown-item-text">
											{room.room_name}{' '}
										</option>
									);
								})}
							</select>
						</button>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-3">
						<div className="direct-chat-contacts-open">
							<div className='box-header with-border'>
								<h3 className='box-title'>
									<i className='fa fa-user'> </i>  Contacts
								</h3>
							</div>
							<ul className="contacts-list">
								{listUsers ? (
									<RenderListUser
										listUsers={listUsers}
										currentUserId={user_account_state.user_account.uid}
										setPeerUser={setPeerUser}
										currentPeerUser={currentPeerUser}
									/>
								) : (
									''
								)}
							</ul>
						</div>
					</div>
					<div className="col-sm-9">
						{/* <!-- DIRECT CHAT PRIMARY --> */}
						<div className="box box-primary direct-chat direct-chat-primary">
							<div className="box-header with-border">
								<h3 className="box-title" title={Chat.room_description}>
									<i className='fa fa-commenting-o'> </i> {Chat.room_name}
								</h3>

								<div className="box-tools pull-right">
									<span
										data-toggle="tooltip"
										title="3 New Messages"
										className="badge bg-light-blue"
									>
                    3
									</span>
									<button
										type="button"
										className="btn btn-box-tool"
										data-widget="collapse"
									>
										<i className="fa fa-minus"></i>
									</button>
									<button
										type="button"
										className="btn btn-box-tool"
										data-toggle="tooltip"
										title="Contacts"
										data-widget="chat-pane-toggle"
									>
										<i className="fa fa-comments"></i>
									</button>
									<button
										type="button"
										className="btn btn-box-tool"
										data-widget="remove"
									>
										<i className="fa fa-times"></i>
									</button>
								</div>
							</div>
							{/* <!-- /.box-header --> */}
							<div className="box-body">
								{/* <!-- Conversations are loaded here --> */}
								<div className="direct-chat-messages">
									<ReceivedMessages />
									<SentMessages />
									
								</div>
								{/* <!--/.direct-chat-messages--> */}


								{/* <!-- /.direct-chat-pane --> */}
							</div>
							{/* <!-- /.box-body --> */}
							<div className="box-footer">
								<form action="#" method="post">
									<div className="input-group">
										<input
											type="text"
											name="message"
											placeholder="Type Message ..."
											className="form-control"
											value={messageInput}
											onChange={e => setMessage(e.target.value)}
										/>
										<span className="input-group-btn">
											<button
												type="button"
												className="btn btn-primary btn-flat"
												onClick={e => sendMessage(e)}
											>Send</button>
										</span>
									</div>
								</form>
							</div>
							{/* <!-- /.box-footer--> */}
						</div>
						{/* <!--/.direct-chat -->						 */}
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default Chat;
