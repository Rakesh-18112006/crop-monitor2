const messages = [];

exports.sendMessage = (socket, io) => {
  socket.on("send_message", (data) => {
    messages.push(data);

    // Send the message only to other users, NOT the sender
    socket.broadcast.emit("receive_message", data);
  });
};
