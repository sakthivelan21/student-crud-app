import "./NavBar.css"

function NavBar(props){
    return(
        <div className="nav-bar">
            <h2 className="nav-bar-title">
            <i className="fa-solid fa-database"></i> {props.title}
            </h2>
        </div>
    )
}

export default NavBar;