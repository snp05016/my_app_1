import React, { useEffect } from 'react';
import io from 'socket.io-client';

const App = () => {
  useEffect(() => {
    // Connect to the Flask-SocketIO server
    const socket = io("http://localhost:5000", {
      transports: ['websocket']  // Use websocket for faster communication
    });

    // Log when connected
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Listen for 'alert' messages from the Flask backend
    socket.on('alert', (data) => {
      console.log('Alert message:', data.message);
      // You can display the alert in your UI, for example:
      alert(data.message);
    });

    // Clean up when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);  // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <h1>Socket.IO React Client</h1>
      <p>Check the console for messages from the backend!</p>
    </div>
  );
};

export default App;
