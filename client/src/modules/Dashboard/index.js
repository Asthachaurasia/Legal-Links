import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Avatar from '../../assets/avatar.svg';
import Input from "../../components/input";
import { io } from 'socket.io-client';
import Sidebar from '../../components/Sidebar';

const Dashboard = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')));
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({ messages: [], receiver: null, conversationId: null });
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);
  const location = useLocation();

  // Extract the lawyerId from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const lawyerId = queryParams.get('lawyerId');

  // Initialize socket connection
  useEffect(() => {
    setSocket(io('http://localhost:8080'));
  }, []);

  // Add user to socket and listen for messages
  useEffect(() => {
    socket?.emit('addUser', user?.id);
    socket?.on('getUsers', (users) => {
      console.log("active user", users);
    });
    socket?.on('getMessage', (data) => {
      console.log("data", data);
      setMessages(prev => ({
        ...prev,
        messages: [...(prev.messages || []), { message: data.message, user: { id: data.user } }]
      }));
    });
  }, [socket]);

  // Scroll to the latest message
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages?.messages]);

  // Fetch conversations for the user
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch(`http://localhost:4000/conversation/${user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resData = await res.json();
      console.log("Conversations API Response:", resData);

      if (Array.isArray(resData.allconversation)) {
        setConversations(resData.allconversation);
      } else {
        setConversations([]);
      }
    };
    if (user) {
      fetchConversations();
    }
  }, [user]);

  // Fetch lawyer details and messages when a lawyer is selected
  useEffect(() => {
    if (lawyerId) {
      console.log("Conversations:", conversations);
      const conversation = conversations.find(conv => conv.talker.id === lawyerId);

      if (conversation) {
        // If a conversation exists, fetch the messages
        fetchMessage(conversation.conversationId, conversation.talker);
      } else {
        // If no conversation exists, fetch the lawyer details
        const fetchLawyerDetails = async () => {
          try {
            const res = await fetch(`http://localhost:4000/lawyer/fetch/${lawyerId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const lawyerData = await res.json();
            console.log("Lawyer Details:", lawyerData.details );

            // Set the selected lawyer in the messages state
            setMessages(prev => ({
              ...prev,
              receiver: lawyerData.details, // Assuming the API returns the lawyer's details
              messages: [], // No messages yet
              conversationId: null, // No conversation ID yet
            }));
          } catch (error) {
            console.error("Error fetching lawyer details:", error);
          }
        };

        fetchLawyerDetails();
      }
    }
  }, [lawyerId, conversations]);

  // Fetch messages for a specific conversation
  const fetchMessage = async (conversationId, user) => {
    console.log("Fetching messages for conversationId:", conversationId);
    const res = await fetch(`http://localhost:4000/message/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const resData = await res.json();
    console.log('resData ', resData);
    setMessages({ messages: resData.fetched_messages, receiver: user, conversationId });
  };

  // Send a message
  const sendMessage = async () => {
    let conversationId = messages?.conversationId;

    // If no conversation ID exists, create a new conversation
    if (!conversationId) {
      const res = await fetch(`http://localhost:4000/conversation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: user?.id,
          receiverId: messages?.receiver?.id,
        }),
      });
      const resData = await res.json();
      conversationId = resData.conversationId;
      console.log("New Conversation Created:", resData);
    }

    // Send the message
    const newMessage = {
      senderId: user?.id,
      message,
      conversationId,
      receiverId: messages?.receiver?.id,
    };

    // Optimistically update UI
    setMessages(prev => ({
      ...prev,
      messages: [...(prev.messages || []), { message, user: { id: user?.id } }],
      conversationId, // Update the conversationId in the state
    }));

    socket?.emit('sendMessage', newMessage);

    // Send to backend to persist
    const res = await fetch(`http://localhost:4000/message/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMessage),
    });

    const resData = await res.json();
    console.log("resMessage", resData);
    setMessage('');
  };
    return (
        <div className='w-screen flex'>


 
 
<Sidebar text='Find Lawyer' />
 
  






            {/* Sidebar Section with Full Height Scroll */}


            <div className='w-[45%] h-screen bg-secondary overflow-y-auto flex flex-col ml-10'>
                {/* Profile Section */}
                <div className='flex items-center my-8 mx-14'>
                    <img
                        src={Avatar}
                        width={60}
                        height={75}
                        className='border-2 border-indigo-400 p-3 rounded-full'
                        alt="Avatar"
                    />
                    <div className='ml-8'>
                        <h3 className="text-2xl">{user?.name} {user?.id}</h3>
                        <p className="text-lg font-light">My Account</p>
                    </div>
                </div>
                <hr />

                {/* Messages Section */}
                <div className='mx-14 mt-10'>
                    <div className='text-indigo-400 text-lg mb-4'>Messages</div>
                    {conversations.map((conversation) => {
                         const { conversationId, talker } = conversation;
                         console.log("talker",talker); 
                        return (
                            <div key={conversationId} className='flex items-center py-4 border-b border-b-gray-300'>
                                <div className='cursor-pointer flex items-center' onClick={()=> 
                                   fetchMessage(conversationId,talker,)}>
                                    <img
                                        src={Avatar}  // Assuming Avatar is the placeholder image
                                        width={40}
                                        height={40}
                                        className='border-2 border-indigo-400 p-1 rounded-full'
                                        alt={talker.name}  // Display sender's name here
                                    />
                                    <div className='ml-6'>
                                        <h3 className='text-lg font-semibold'>{talker.name}</h3>  {/* Sender's name */}
                                        <p className='text-sm font-light text-gray-600'>{talker.email}</p>  {/* Receiver type */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Main Content Section */}
            <div className='w-[100%] h-screen bg-white flex flex-col items-center'>
                    
                {
                     
                    messages?.receiver?.name&&

                    <div className='w-[75%] bg-secondary h-[60px] my-14 rounded-full flex items-center px-14'>
                    <div className='cursor-pointer'>
                        <img
                            src={Avatar}
                            width={40}
                            height={60}
                            className='border-2 border-indigo-400 p-1 rounded-full'
                            alt='user'
                        />
                    </div>

                    <h3 className='text-lg ml-6'> {messages?.receiver?.name}</h3>
                </div>
                 
                }
                
                <div className='h-[75%] w-full overflow-y-scroll overflow-x-hidden shadow-sm custom-scroll'>
                    <div className='p-14'>
                         {
                            messages?.messages?.length>0?
                            messages.messages.map(({message,user:{ id}={}})=>{
                                if(id===user?.id){
                                    return(
                                         <>
                                        <div className='max-w-[35%] bg-indigo-500 rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6'> {message}</div>
                                        <div ref={messageRef}></div>
                                         </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                        <div className='max-w-[35%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6'> {message} </div>
                                        <div ref={messageRef}></div>
                                        
                                        </>
                                    ) 
                                }
                                
                            }):<div className='text-center text-lg font-semibold mt-24'>Start Conversation  </div>
                         }
                    </div>
                </div>
               {
                messages?.receiver?.name&&
                <div className='p-14 w-full flex items-center'>
                <Input placeholder='Type a message...' value={message} onChange={(e)=> setMessage(e.target.value)} className='w-[80%]' inputClassName='p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none '/>
                <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message &&'pointer-events-none'}`} onClick={()=>sendMessage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M10 14l11 -11"></path>
                        <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"></path>
                    </svg>
                </div>

                <div className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${!message &&'pointer-events-none'}`} onClick={()=>sendMessage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="30" height="30" stroke-width="2">
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M9 12h6"></path>
                        <path d="M12 9v6"></path>
                    </svg>
                </div>
            </div>
               }
                
           
           
           </div>

            
        </div>
    );
}

export default Dashboard;



  
