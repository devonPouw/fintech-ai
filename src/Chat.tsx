import React from "react";

const Chat: React.FC = () => {
  const messages = [
    { sender: "Alice", text: "Hey there!" },
    { sender: "Bob", text: "Hi! How are you?" },
    { sender: "Alice", text: "Doing well, just testing this chat UI." },
  ];

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "250px",
        overflowY: "auto",
      }}
    >
      <h3>Chat Messages</h3>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ marginBottom: "8px" }}>
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Chat;
