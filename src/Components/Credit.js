import { Link } from "react-router-dom"
const Credit = () => {
    return(
        <>
            <div className='oopss'>
      <div className='error-text'>
          <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404"/>
          <h2>Coming Soon</h2>
          <p>Page is building</p>
          <Link to={`/`}>
          <button>Home</button>
          </Link>
      </div>
    </div>
        </>
    )
}
export default Credit