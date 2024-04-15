import ContentRowTop from './ContentRowTop'
import Footer from './Footer'



export default function ContentWrapper({apiData,productData}) {
    return(
                <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <ContentRowTop  apiData={apiData}
                                            productData={productData}
                            />
                        </div>
                            <Footer/>
                </div>
    )
}