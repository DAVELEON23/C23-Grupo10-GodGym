import ContentRowTop from './ContentRowTop'
import Footer from './Footer'



export default function ContentWrapper() {
    return(
                <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            
                            <ContentRowTop/>
                        </div>
                            <Footer/>
                </div>
    )
}