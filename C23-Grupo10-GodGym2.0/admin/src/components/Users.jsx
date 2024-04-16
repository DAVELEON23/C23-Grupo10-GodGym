

const Users = ({ userList }) => {
		return (
			<div className="col-lg-6 mb-4">
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h5 className="m-0 font-weight-bold text-gray-800">Lista de Usuarios</h5>
					</div>
					<div className="card-body">
						<div className="row">
						{userList.map((user, index) => (
							<div className="col-lg-6 mb-4" key={index}>
								<div className="card bg-dark text-white shadow">
									<div className="card-body">
										<p>ID:{user.id}</p>
										<p>Nombre: {user.name}</p>
										<p>Habilitado para actividad física: {user.aptoMedico}</p>
									</div>
								</div>
							</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
		};

export default Users;