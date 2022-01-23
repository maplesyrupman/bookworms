
export default function ClubTab() {
  function joinClub() {
  }
  
  function createClub() {
  }

  return (
    <div className="clubtab">
      <div className="clubtabContainer">
        <h3 className="clubtabTitle"> </h3>
        <img width="200" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fstack-of-colored-books-isolated-on-white-with-clipping-path-picture-id496954602%3Fk%3D6%26m%3D496954602%26s%3D612x612%26w%3D0%26h%3DjQwzUYtwiBKzvgKZusMtKpvX4Bt2zII_hc4nCk6x2tU%3D&f=1&nofb=1"
        alt="book"/>
        <div className="Book-info">
          <h3>Title:</h3>
          <h4>Description:</h4>
        </div>
        <p>{}</p>
        <button type="button" onClick={joinClub}>
          Join
        </button>
        <button type="button" onClick={createClub}>
          Create
        </button>
      </div>
    </div>
  );
}
