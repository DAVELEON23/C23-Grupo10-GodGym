

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
                            <div className={`shadow col-lg-6 mb-2 ${user.aptoMedico === 'NO' ? 'bg-light' : ''}`} key={index}>
                                <div className="card shadow text-white">
                                    <div className={`card-body ${user.aptoMedico === 'NO' ? 'text-white' : ''}`}>
                                        <p style={{ fontWeight: 'bold' }}> ID: {user.id} <br /> 
                                        Nombre: {user.name} <br />
                                        AptoMedico: {user.aptoMedico}</p>
                                    </div>
                                </div>
                                {user.aptoMedico === 'NO' ? (
                                    <div className="alert alert-warning" role="alert" style={{ backgroundColor: 'red', color: 'white' , fontWeight: 'bold', textAlign:"center" }}>
                                        Inhabilitado
                                    </div>
                                ) : (
                                    <div className="alert alert-success" role="alert" style={{ backgroundColor: 'green', color: 'white', fontWeight: 'bold', textAlign:"center" }}>
                                        Habilitado
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;