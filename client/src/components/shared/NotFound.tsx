
import gif from "../../assets/gifnotfound.gif";
function NotFound(){
    return(
        <div className="w-full h-screen">
            
            <div className="flex justify-center items-center h-full">
                <img src={gif} alt="gif not found" />
            </div>
        </div>
    )
}

export default NotFound;