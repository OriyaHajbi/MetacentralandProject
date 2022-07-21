import {React , useState} from "react";
const axios = require('axios').default;

function Popup(props){

    const [isUpdatePressed , setUpdateBTN] = useState(false);
    const [newCost , setCost] = useState(-1); 
    const [newGame , setGame] = useState("");
    const [newIsForSale , setIsForSale] = useState();

    function closePopUp(){
        const popup = document.getElementById("popUpWindow");
        popup.classList.remove('popUp-active');
    }
    
    function updateLand(){
      const updateSaveBTNbtn = document.getElementById("updateSaveBTN");
      const buyBTN = document.getElementById("buyBTN");
      // console.log(updateSaveBTNbtn.innerText);
      setUpdateBTN(!isUpdatePressed);
      if (updateSaveBTNbtn.innerText === "Update"){
        updateSaveBTNbtn.innerText = "Save";
        // buyBTN.style.visibility = "hidden";
      }else { // Save to DB
        updateSaveBTNbtn.innerText = "Update";
        // buyBTN.style.visibility = "visible";

        //take new data from inputs
        if (newCost !== -1 && newGame !== ""){
          updateLandInDB();
        }

        // const newIsForSale = document.getElementById("isForSaleInput")
        
        
      }
    }

    function updateLandInDB(){
      const params = {
        id: props.land.id,
        cost: parseInt(newCost),
        game: newGame,
        isForSale: newIsForSale === "Yes"
      }
      console.log(params);
      const URL = 'http://localhost:4000/lands/updateland';
      axios.patch(URL , params)
      .then((res) => {
        if (res){
          alert("Land is updated sucessuflly")
          window.location.reload();

        }else{
          console.log("doesnt find land");
        }
      });
    }

    function updateCost(event){
      setCost(event.target.value)
    }

    function updateGame(event){
      setGame(event.target.value)
    }
    
    function updateIsForSale(event){
      //console.log(newIsForSale);
      setIsForSale(event.target.value)
    }
    
    function buyLand(){
      const params = {
        newOwnerId: props.userMail,
        landCost: props.land.cost,
        landId: props.land.id,
        oldOwnerId: props.land.ownerId
      }
      const URL = 'http://localhost:4000/lands/buyland';
      axios.patch(URL , params)
      .then((res) => {
        if (res.data){
          alert("The land was successfully purchased")
          window.location.reload();

        }else{
          alert("You didnt have enough Coins in your Wallet")
        }
      });
    }

    return  <div id="popUpWindow" className={"popUp popUpTexture popUp-active"}>
                <div className="popUp-header">
                    <button type="button" class="close"  onClick={closePopUp} >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h1><ins>Land ({props.land.rowIndex} , {props.land.colIndex}) detail:</ins></h1>
                </div>
                <div className="bodyPopUp">
                    <dl class="row">
                      <dt class="col-sm-3">Owner:</dt>
                        <dd class="col-sm-9">{props.land.ownerId}</dd>
                      <dt class="col-sm-3">LandId:</dt>
                        <dd class="col-sm-9">{props.land.id}</dd>
                      <dt class="col-sm-3">Type:</dt>
                        <dd class="col-sm-9">{props.land.type}</dd>

                      <dt class="col-sm-3">Cost:</dt>
                        <dd class="col-sm-9">{isUpdatePressed ? <input onChange={updateCost} id="costInput" ></input> : props.land.cost}</dd>

                      <dt class="col-sm-3">Game:</dt>
                        <dd class="col-sm-9"> {isUpdatePressed ? <input onChange={updateGame} id="gameInput" ></input> : props.land.game ? <a href={props.land.game}>Link to the Game</a>: "None"}</dd>
                      <dt class="col-sm-3">ForSale:</dt>
                        <dd class="col-sm-9">
                            
                            {isUpdatePressed ? <select id = "isForSaleInput" onChange={updateIsForSale}>  
                                                <option> No </option>    
                                                <option> Yes </option>    
                                               </select> : props.land.isForSale ? "Yes" : "No"}
                        </dd>
                    </dl>
                    
                    
                    {(props.isSeller && props.land.isForSale) ? 
                    <button id="buyBTN"  type="button" class="btn btn-warning btn-lg center"   onClick={buyLand} >Buy </button>
                    : ""}
                    {props.userMail == props.land.ownerId ? 
                    <button id="updateSaveBTN" type="button" class="btn btn-outline-primary left"   onClick={updateLand} >Update </button>
                    : ""}
                </div>
            </div>
}




export default Popup;