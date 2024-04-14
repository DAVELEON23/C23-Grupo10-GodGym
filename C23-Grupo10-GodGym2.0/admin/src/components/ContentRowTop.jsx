import ContentRouteMovie from "./ContentRouteMovie";
import Genres from "./Genres";
import LastMovie from "./LastMovie";

export default function ContentRowTop() {
    return(
            <div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">GOD GYM</h1>
					</div>
					
						<ContentRouteMovie/>

					<div className="row">
						<LastMovie/>
						<Genres/>
					</div>
				</div>
    )
}