import "./NavBar.css"

function NavBar({title}){
    return(
        <div className="nav-bar">
            <h2 className="nav-bar-title">
            <i className="fa-solid fa-database"></i> {title}
            </h2>
        </div>
    )
}

export default NavBar;