
export default function SideBar() {
    return(
        <ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

			<a className="sidebar-brand d-flex align-items-center justify-content-center " href="/">
				<div className="sidebar-brand-icon-height: 100%">
					<img className="w-100" src="/images/logo-proyecto.svg" alt="GOD GYM"/>
				</div>
			</a>

			<hr className="sidebar-divider my-0"/>

			<li className="nav-item active">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard</span></a>
			</li>

			<hr className="sidebar-divider"/>


			
			<li className="nav-item">
					<i className="fas fa-fw fa-folder"></i>
						<a href="http://localhost:3000/products/dashboard" className="nav-link">Productos</a>
						<a href="http://localhost:3000/users/dashboard" className="nav-link">Usuarios</a>
					<hr className="sidebar-divider"/>
						<a href="http://localhost:3000" className="nav-link">HOME</a>
					<hr class="sidebar-divider d-none d-md-block"/>
			</li>
		</ul>
    )
}