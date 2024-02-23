import {Link} from "react-router-dom";
const Navigation =()=>{
    return(
        <header>
        <div className="logo">m$ecure 3.O</div>
        <nav>
          <ul>
          <li>
            
              <Link className="nav_link" to="/">
                Wallet
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/view-all-tasks">
                View All Keys
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/create-task">
                Create Key
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/view-task">
                View Key
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/update-task">
                Update Key
              </Link>
            </li>
            <li>
              <Link className="nav_link" to="/delete-task">
                Delete Key
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    )
}
export default Navigation;