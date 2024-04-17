import PanelContador from "./PanelContador";
import Users from "./Users";
import LastProduct from "./LastProduct";
import ContentWrapper from "./ContentWrapper";
import PropTypes from "prop-types"

export default function ContentRowTop({apiData,productData}) {
    return(
            <div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h1 mb-0 text-gray-800 ">GOD GYM</h1>
					</div>
					
						<PanelContador 	countUser = {apiData && apiData.count}
										countProduct={productData && productData.count}
						/>

					<div className="row">
						<LastProduct/>
						<Users userList={apiData ? apiData.users : []} />
						{/* {apiData && apiData.users.map((data,index)=>{
							return <Users {...data} key={index} />
						})} */}
						
					</div>
				</div>
    )
}

ContentWrapper.propTypes = {
    apiData: PropTypes.shape({
        count: PropTypes.number, 
		users: PropTypes.arrayOf(
			PropTypes.shape({
				// id: PropTypes.number,
				name: PropTypes.string
			})
		)
		//seguir completando con codigo para usuarios....
        
    }),
	productData: PropTypes.shape({
        count: PropTypes.number,

		//seguir completando con codigo para producto....
	}),
};

//CONSULTA DE PRODUCTOS - USUARIOS - CATEGORIA. 
// CONSUME API, CON PROPS. 