import React, { useState, useRef, useEffect } from "react"
import instructor1Img from "../../../assets/instructor1.png"
import studentchatImg from '../../../assets/studentchat.png'
import imageSend from '../../../assets/imageSend.png'

const Chatboard = () => {
  const [messages, setMessages] = useState([
    {
      from: "instructor",
      name: "Instructor",
      text: "Hi Student, welcome to the course! I'm excited to work with you.",
      img: instructor1Img,
    },
    {
      from: "student",
      name: "You",
      text: "Thanks! Looking forward to it.",
      img: studentchatImg, 
    },
  ])

  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef(null)

  // Scroll to bottom when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return

    setMessages((prev) => [
      ...prev,
      {
        from: "student",
        name: "You",
        text: inputText,
        img: studentchatImg,
      },
    ])
    setInputText("")
  }

  return (
    <div className=" flex flex-col  w-full md:h-[700px] overflow-hidden md:mx-4  text-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[#333] text-lg font-semibold">
      Instructor's Name
      </div>

      {/* Chat messages */}
      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.from === "student" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-end ${
                msg.from === "student" ? "flex-row-reverse" : ""
              }`}
            >
              <img
                src={msg.img}
                alt=""
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="mx-3 text-sm max-w-xs">
                <p
                  className={`mb-1 ${
                    msg.from === "student"
                      ? "text-right text-[#9696C4]"
                      : "text-[#9696C4]"
                  }`}
                >
                  {msg.name}
                </p>
                <div
                  className={`p-3 rounded-lg ${
                    msg.from === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-[#262645]"
                  }`}
                >
                  <p className="break-words">{msg.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing input */}
      <div className="flex flex-row  border-t border-[#333] px-4  py-3 max-w-sm md:max-w-2xl">
        <input
          type="text"
          className="flex-1 md:px-4  py-2 rounded-md bg-[#2a2a40] text-white placeholder-[#777]"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="t-0 inline-block md:-ml-10 ">
            <img src={imageSend} alt="" />
        </button>
        <button
          onClick={handleSend}
          className="ml-3 px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chatboard
