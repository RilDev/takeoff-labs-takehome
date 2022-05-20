import generateUsers from "data/users";
import generateChats from "data/chats";

import ClubLogoSvg from "icons/club-logo.svg";
import SeachIconSvg from "icons/search-icon.svg";
import UserInterface from "types/users";
import ChatInterface from "types/chats";
import MessageInterface from "types/messages";

import { useEffect, useState, useRef } from "react";

import { find } from "lodash";
import moment from "moment";

// shorter time stamps
moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "Now",
    ss: "Now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    w: "w",
    ww: "%dw",
    M: "1m",
    MM: "%dm",
    y: "1y",
    yy: "%dy",
  },
});

interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
}

const LandingPage = ({ users, chats, messages }: LandingPageProps) => {
  console.log({ users, chats, messages });

  const [fullChat, setFullChat] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const chatMessagesRef = useRef(null);

  // generate fullChat
  useEffect(() => {
    const fullChatTemp = chats.map((chat) => {
      const user = find(users, { id: chat.withUser });
      const lastMessage = find(messages, { id: chat.lastMessage });
      const orderedByDateMessages = messages.sort((messageA, messageB) =>
        moment(messageA.date).diff(messageB.date)
      );

      return { ...chat, user, lastMessage, messages };
    });

    const orderedByDateFullChatTemp = fullChatTemp.sort((chatA, chatB) =>
      moment(chatB.lastMessage.date).diff(chatA.lastMessage.date)
    );

    setFullChat(orderedByDateFullChatTemp);
    setActiveChat(orderedByDateFullChatTemp[0]);
  }, []);

  // scroll to bottom of chat
  useEffect(() => {
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
  }, [activeChat]);

  console.log("fullchat", fullChat);

  return (
    <>
      <div className="flex w-full h-screen bg-gray-400 main">
        <div className="flex flex-col flex-shrink-0 items-center px-2 py-6 w-96 border-r chat-list border-gray">
          <ClubLogoSvg className="w-[114px] mb-5" />
          <div className="flex justify-between items-center mb-4 w-full user">
            <img className="w-9 h-9 rounded-full" src="/images/user.png" />
            <div>
              {fullChat.length} chat{fullChat.length > 1 ? "s" : ""}
            </div>
          </div>
          <div className="relative mb-4 w-full search-person">
            <SeachIconSvg className="absolute top-[7px] left-2 w-3 h-3" />
            <input
              type="text"
              className="pl-7 w-full text-sm rounded-full gray"
              placeholder="Search a person"
            />
          </div>

          <div className="space-y-2 w-full person-list">
            {fullChat &&
              fullChat.map(({ user, lastMessage, isActive, id }) => (
                <div
                  key={user.id}
                  style={{
                    gridTemplateColumns: "50px minmax(auto, 250px) auto",
                  }}
                  className={`grid gap-4 px-2 py-2 w-full h-16 rounded-xl cursor-pointer person ${
                    user.id === activeChat?.user?.id ? "gray" : ""
                  }`}
                  onClick={() => setActiveChat(find(fullChat, { id }))}
                >
                  <div className="relative">
                    <img
                      src={user.profilePicture}
                      className="w-[50px] h-[50px] rounded-full block"
                    />
                    {isActive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full border border-white status absolute top-[38px] left-[40px]"></div>
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-lg username ${
                        lastMessage.writtenByMe === false ? "font-bold" : ""
                      }`}
                    >
                      {user.name}
                    </div>
                    <div className="text-sm truncate tagline">
                      {lastMessage.content}
                    </div>
                  </div>
                  <div className="place-self-end text-sm date light-gray">
                    {moment(lastMessage.date).fromNow()}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="relative w-full chat">
          <div className="flex absolute items-center px-4 py-3 w-full bg-white border-b chat-header border-gray">
            <div className="block relative flex-shrink-0 mr-4">
              <img
                src={activeChat?.id && activeChat.user.profilePicture}
                className="w-[50px] h-[50px] rounded-full block"
              />
              {activeChat.isActive && (
                <div className="w-2 h-2 bg-green-500 rounded-full border border-white status absolute top-[38px] left-[40px]"></div>
              )}
            </div>
            <div className="text-lg username">
              {activeChat?.id && activeChat.user.name}
            </div>
          </div>
          <div
            ref={chatMessagesRef}
            className="flex overflow-y-scroll px-4 pt-24 pb-8 w-full h-screen chat-messages"
          >
            <div className="flex flex-col mt-auto space-y-2 w-full">
              {activeChat?.id &&
                activeChat.messages.map((message) => {
                  if (message.writtenByMe && message.chatId === activeChat.id) {
                    return (
                      <div className="flex self-end you">
                        <div className="message green text-white text-sm px-[13px] mr-[6px] py-[6px] rounded-full">
                          {message.content}
                        </div>
                        <img
                          src="/images/user.png"
                          alt="oter user"
                          className="w-[26px] h-[26px] rounded-full"
                        />
                      </div>
                    );
                  } else if (
                    !message.writtenByMe &&
                    message.chatId === activeChat.id
                  ) {
                    return (
                      <div className="flex other">
                        <img
                          src={activeChat.user.profilePicture}
                          alt="oter user"
                          className="w-[26px] h-[26px] rounded-full mr-[6px]"
                        />
                        <div className="message gray text-sm px-[13px] py-[6px] rounded-full">
                          {message.content}
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className="absolute bottom-0 px-4 w-full chat-bar">
            <input
              type="text"
              className="px-3 w-full text-sm rounded-full gray mb-[5px]"
              placeholder="Aa"
            />
          </div>
        </div>
        <div className="flex flex-col flex-shrink-0 items-center px-4 py-8 w-80 border-l search chat-list border-gray">
          <div className="block relative flex-shrink-0 mb-4">
            <img
              src={activeChat?.id && activeChat.user.profilePicture}
              className="w-[85px] h-[85px] rounded-full block"
            />
            {activeChat?.id && activeChat.isActive && (
              <div className="w-3 h-3 bg-green-500 rounded-full border border-white status absolute top-[69px] left-[65px]"></div>
            )}
          </div>
          <div className="mb-8 text-lg text-center name">
            {activeChat?.id && activeChat.user.name}
          </div>
          <div className="relative mb-4 w-full search-person">
            <SeachIconSvg className="absolute top-[7px] left-2 w-3 h-3" />
            <input
              type="text"
              className="pl-7 w-full text-sm rounded-full gray"
              placeholder="Search a message"
            />
          </div>
        </div>
      </div>

      <style>
        {`
        .main {

        }

        .chat-list {

        }

        .chat-messages {
        }

        .chat-messages::-webkit-scrollbar {
          display: none;
        }

        .chat {

        }

        .search {

        }

        .gray {
          background: #C4C4C433;
        }

        .green {
          background: #4C734C;
        }

        .bg-green-500 {
          background: #00C514;
        }

        .text-light-gray {
          color: #848383;
        }

        .border-gray {
          border-color: #C2C2C2;
        }

        input:placeholder {
          color: #676767;
          font-size: 14px;
        }
          `}
      </style>
    </>
  );
};

export const getServerSideProps = () => {
  // This is only an exemple of how you could pass data from server to client,
  // you may create another page and not use that use
  const users: UserInterface[] = generateUsers();
  const {
    chats,
    messages,
  }: { chats: ChatInterface[]; messages: MessageInterface[] } = generateChats();

  return {
    props: {
      users,
      chats,
      messages,
    },
  };
};

export default LandingPage;
