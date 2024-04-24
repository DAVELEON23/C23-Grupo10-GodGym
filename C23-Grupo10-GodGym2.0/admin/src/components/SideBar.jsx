
export default function SideBar() {
    return(
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

			{/* <a className="sidebar-brand d-flex align-items-center justify-content-center " href="/"> */}
				<div className="container p-2 ">
					<img className="img-fluid w-100 p-3" src="/images/logo-proyecto.svg" alt="GOD GYM"/>
				</div>
			{/* </a> */}

			<hr className="sidebar-divider my-0"/>

			<li className="nav-item active">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>DASHBOARD</span></a>
			</li>

			<hr className="sidebar-divider"/>


			
			<li className="nav-item">
					<i className="fas fa-fw fa-folder"></i>
						<a href="http://localhost:3000/products/dashboard" className="nav-link">Actividades</a>
						<a href="http://localhost:3000/users/dashboard" className="nav-link">Usuarios</a>
					<hr className="sidebar-divider"/>
						<a href="http://localhost:3000" className="nav-link">Home</a>
					<hr className="sidebar-divider d-none d-md-block"/>
			</li>
		</ul>
    )
}