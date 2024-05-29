import RoomForm from "./components/RoomForm";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000/", {
    // autoConnect: false,
  });
  socket.on("connect", () => {
    console.log("Connect with socket" + socket.id);
  });

  return (
    <>
      <RoomForm socket={socket} />
    </>
  );
}

export default App;
