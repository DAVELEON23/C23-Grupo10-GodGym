

export default function LastMovie({nombre,info,imagen,id}) {


//logica encima del div contenedor


    return(
		<div className="col-lg-6 mb-4">
		
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h5 className="m-0 font-weight-bold text-gray-800">Ultimo agregado: {nombre}</h5>
								</div>
			<div className="card-body">
				<div className="text-center">
					<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" src={`http://localhost:3000/images/${imagen}`} alt=" Star Wars - Mandalorian "/>
				</div>
				<p>{info}</p>
				<a className="btn btn-danger" target="_blank" rel="nofollow" href={`http://localhost:3000/products/detail/${id}`}>Detalle de Actividad</a>
			</div>
			</div>
			</div>
    )
}

