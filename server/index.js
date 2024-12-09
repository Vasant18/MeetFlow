// const express = require('express'); // Import the express module
// const app = express(); // Create an express application
// const http = require('http'); // Import the http module
// const server = http.createServer(app); // Create an HTTP server using the express app
// const { Server } = require("socket.io"); // Import the Server class from socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173" // Allow CORS for the specified origin
//   }
// });

// const rooms = {}; // Object to store room information
// const users = {}; // Object to store user information

// io.on('connection', (socket) => { // Listen for new socket connections
//   console.log('a user connected ' + socket.id); // Log the connection

//   socket.on("disconnect", (params) => { // Listen for disconnect events
//     Object.keys(rooms).map(roomId => {
//       rooms[roomId].users = rooms[roomId].users.filter(x => x !== socket.id) // Remove the user from all rooms
//     })
//     delete users[socket.id]; // Remove the user from the users object
//   })



//   socket.on("join", (params) => { // Listen for join events
//     const roomId = params.roomId; // Get the roomId from the params
//     console.log("user joined room " + roomId); // Log the room join
//     users[socket.id] = {
//       roomId: roomId // Store the roomId in the users object
//     }
//     if (!rooms[roomId]) { // If the room doesn't exist, create it
//       rooms[roomId] = {
//         roomId,
//         users: []
//       }
//     }
//     rooms[roomId].users.push(socket.id); // Add the user to the room
//     console.log("user added to room " + roomId); // Log the addition
//   });

//   socket.on("localDescription", (params) => { // Listen for localDescription events
//     let roomId = users[socket.id].roomId; // Get the roomId for the user

//     let otherUsers = rooms[roomId].users; // Get the other users in the room
//     otherUsers.forEach(otherUser => {
//       if (otherUser !== socket.id) { // Send the localDescription to all other users in the room
//         io.to(otherUser).emit("localDescription", {
//             description: params.description
//         })
//       }
//     })
//   })

//   socket.on("remoteDescription", (params) => { // Listen for remoteDescription events
//     let roomId = users[socket.id].roomId; // Get the roomId for the user    
//     let otherUsers = rooms[roomId].users; // Get the other users in the room

//     otherUsers.forEach(otherUser => {
//       if (otherUser !== socket.id) { // Send the remoteDescription to all other users in the room
//         io.to(otherUser).emit("remoteDescription", {
//             description: params.description
//         })
//       }
//     })
//   });

//   socket.on("iceCandidate", (params) => { // Listen for iceCandidate events
//     let roomId = users[socket.id].roomId; // Get the roomId for the user    
//     let otherUsers = rooms[roomId].users; // Get the other users in the room

//     otherUsers.forEach(otherUser => {
//       if (otherUser !== socket.id) { // Send the iceCandidate to all other users in the room
//         io.to(otherUser).emit("iceCandidate", {
//           candidate: params.candidate
//         })
//       }
//     })
//   });

//   socket.on("iceCandidateReply", (params) => { // Listen for iceCandidateReply events
//     let roomId = users[socket.id].roomId; // Get the roomId for the user    
//     let otherUsers = rooms[roomId].users; // Get the other users in the room

//     otherUsers.forEach(otherUser => {
//       if (otherUser !== socket.id) { // Send the iceCandidateReply to all other users in the room
//         io.to(otherUser).emit("iceCandidateReply", {
//           candidate: params.candidate
//         })
//       }
//     })
//   });

// });

// server.listen(3000, () => { // Start the server on port 3000
//   console.log("http://localhost:3000"); // Log the server URL
// });












const express = require('express'); // Import the express module
const app = express(); // Create an express application
const http = require('http'); // Import the http module
const server = http.createServer(app); // Create an HTTP server using the express app
const { Server } = require("socket.io"); // Import the Server class from socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173" // Allow CORS for the specified origin
  }
});

const rooms = {}; // Object to store room information
const users = {}; // Object to store user information

io.on('connection', (socket) => { // Listen for new socket connections
  console.log('A user connected: ' + socket.id); // Log the connection

  socket.on("disconnect", (params) => { // Listen for disconnect events
    console.log('User disconnected: ' + socket.id); // Log the disconnection
    Object.keys(rooms).map(roomId => {g
      rooms[roomId].users = rooms[roomId].users.filter(x => x !== socket.id) // Remove the user from all rooms
    });
    delete users[socket.id]; // Remove the user from the users object
    console.log('Updated rooms:', rooms); // Log the updated rooms object
    console.log('Updated users:', users); // Log the updated users object
  });

  socket.on("join", (params) => { // Listen for join events
    const roomId = params.roomId; // Get the roomId from the params
    console.log("User wants to join the room with the roomID: " + roomId);
    users[socket.id] = {   // Store the roomId in the users object, using the socket ID as the key
      roomId: roomId // Store the roomId in the users object
    };
    console.log('User object:', users, ', ', users[socket.id]); // Log the user object
    console.log('Room object:', rooms, ', ', rooms[roomId]); // Log the room object
    if (!rooms[roomId]) { // If the room doesn't exist, create it
      console.log("Room doesn't exist. Creating room: " + roomId); // Log the room creation
      rooms[roomId] = {
        roomId,
        users: []
      };
      console.log('Room object:', rooms[roomId]); // Log the room object
    }

    rooms[roomId].users.push(socket.id); // Add the user to the room
    //Access the room object
    // const room = rooms[roomId];

    // // Access the users array within the room object
    // const usersArray = room.users;

    // // Add the user's socket ID to the users array
    // usersArray.push(socket.id);

    console.log("User added to room: " + roomId); // Log the addition
    console.log('Current rooms:', rooms); // Log the current rooms object
    console.log('Current users:', users); // Log the current users object
  });

  
  socket.on("localDescription", (params) => { // Listen for localDescription events
    let roomId = users[socket.id].roomId; // Get the roomId for the user
    let otherUsers = rooms[roomId].users; // Get the other users in the room
    console.log(otherUsers);
    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) { // Send the localDescription to all other users in the room
        io.to(otherUser).emit("localDescription", {
          description: params.description
        });
      }
    });
  });


  socket.on("remoteDescription", (params) => { // Listen for remoteDescription events
    let roomId = users[socket.id].roomId; // Get the roomId for the user    
    let otherUsers = rooms[roomId].users; // Get the other users in the room
    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) { // Send the remoteDescription to all other users in the room
        io.to(otherUser).emit("remoteDescription", {
          description: params.description
        });
      }
    });
  });

  socket.on("iceCandidate", (params) => { // Listen for iceCandidate events
    let roomId = users[socket.id].roomId; // Get the roomId for the user    
    let otherUsers = rooms[roomId].users; // Get the other users in the room
    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) { // Send the iceCandidate to all other users in the room
        io.to(otherUser).emit("iceCandidate", {
          candidate: params.candidate
        });
      }
    });
  });

  socket.on("iceCandidateReply", (params) => { // Listen for iceCandidateReply events
    let roomId = users[socket.id].roomId; // Get the roomId for the user    
    let otherUsers = rooms[roomId].users; // Get the other users in the room
    otherUsers.forEach(otherUser => {
      if (otherUser !== socket.id) { // Send the iceCandidateReply to all other users in the room
        io.to(otherUser).emit("iceCandidateReply", {
          candidate: params.candidate
        });
      }
    });
  });

});

server.listen(3000, () => { // Start the server on port 3000
  console.log("Server running at http://localhost:3000"); // Log the server URL
});