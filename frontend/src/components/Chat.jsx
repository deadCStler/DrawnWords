function Chat({ socket }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };
  return (
    <>
      <h1>Chat:</h1>
      <ul id="messages"></ul>
      <form id="form" onSubmit={handleFormSubmit}>
        <input id="input" autoComplete="off" />
        <button>Send</button>
      </form>
    </>
  );
}

export default Chat;
