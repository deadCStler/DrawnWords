function RoomForm({ socket }) {
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // eslint-disable-next-line react/prop-types
    socket.emit("session/create");
  };

  return (
    <>
      <form id="form" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="userName">Enter user name</label>
          <input type="text" id="userName" />
        </div>
        <input type="submit" value="Create a room" />
        <input type="button" value="Join a room" />
      </form>
    </>
  );
}

export default RoomForm;
