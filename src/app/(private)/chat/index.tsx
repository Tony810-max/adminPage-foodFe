"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, XCircleIcon } from "lucide-react";
import io from "socket.io-client";
import { API_URL } from "@/types/common";
import { IUserLocacl, Message } from "./types/common";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const socket = io(`${API_URL}/chat`); // Kết nối đến endpoint /chat

const ChatMessage = () => {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  const [text, setText] = React.useState("");
  const [user, setUser] = React.useState<IUserLocacl | null>(null);

  const handleCheckBox = () => {
    setOpen(!open);
    const userLocal = JSON.parse(localStorage.getItem("user")!);
    setUser(userLocal);
  };

  const senderId = user ? user?.id.toString() : "";
  const senderName = `${user?.firstName} ${user?.lastName} `;

  React.useEffect(() => {
    socket.emit("joinChat");

    socket.on("previousMessages", (msgs: Message[]) => {
      setMessages(msgs);
    });

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("messageDeleted", (deletedMsgId: number) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === deletedMsgId
            ? { ...msg, deletedAt: new Date().toISOString() }
            : msg
        )
      );
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receiveMessage");
      socket.off("messageDeleted");
    };
  }, []);

  const sendMessage = () => {
    const timestamp = new Date().toISOString();
    const message: Omit<Message, "id" | "deletedAt"> = {
      senderId,
      text,
      senderName,
      timestamp,
    };
    socket.emit("sendMessage", message);
    setText("");
  };

  const deleteMessage = (msgId: number) => {
    socket.emit("deleteMessage", msgId);
  };

  return (
    <div>
      {open && (
        <div className="min-w-96 fixed z-10 right-10 bottom-20 bg-white border">
          <div className="flex justify-end w-full p-2">
            <XCircleIcon
              className="hover:opacity-50 hover:cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className=" min-h-52  max-h-60 overflow-auto p-2">
            {messages.map((msg) => {
              return (
                <div
                  key={msg.id}
                  className={`flex  ${
                    Number(msg?.sender?.id) === Number(senderId)
                      ? "justify-end"
                      : "justify-start"
                  } items-center p-1 `}
                >
                  <div
                    className={`p-2 ${
                      msg.senderId === senderId ? "bg-blue-200" : "bg-gray-200"
                    } rounded`}
                  >
                    {msg.deletedAt ? (
                      <>
                        <span className="text-gray-400 font-normal">
                          This message is not available!!!
                        </span>
                        {msg.deletedAt && (
                          <span className="block text-xs text-red-600">
                            Deleted at:{" "}
                            {new Date(msg.deletedAt).toLocaleString()}
                          </span>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col">
                        <div>
                          <span className="block font-sans font-bold">
                            {msg.senderName}
                          </span>
                          <span className="block">{msg.text}</span>
                        </div>
                        <p className="block text-xs text-gray-600">
                          Sent at:{" "}
                          {msg?.createdAt &&
                            format(
                              new Date(msg?.createdAt),
                              "dd-MM-yyyy HH:mm"
                            )}
                        </p>
                      </div>
                    )}
                  </div>
                  {Number(msg.sender?.id) === Number(senderId) &&
                    !msg.deletedAt && (
                      <Button
                        onClick={() => deleteMessage(msg.id)}
                        className="ml-2"
                      >
                        Xóa
                      </Button>
                    )}
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-2 p-2 border">
            <Input
              placeholder="Type message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Send
              size={28}
              className="hover:opacity-50 hover:cursor-pointer"
              onClick={sendMessage}
            />
          </div>
        </div>
      )}
      <MessageCircle
        className="fixed z-10 right-10 bottom-10 hover:opacity-50 hover:cursor-pointer"
        size={32}
        onClick={handleCheckBox}
      />
    </div>
  );
};

export default ChatMessage;
