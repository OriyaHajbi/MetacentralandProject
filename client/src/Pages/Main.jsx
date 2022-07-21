import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Popup from "../Components/Popup";
import { mouseWheelZoom } from 'mouse-wheel-zoom';
const axios = require('axios').default;
const FormData = require('form-data');

function Main(){

    const userMail = localStorage.getItem("userMail").substring(1,localStorage.getItem("userMail").length-1);
    const userBalance = localStorage.getItem("userBalance");
    const [lands , setMap] = useState([]);
    const [user , setUser] = useState({
      username: "",
      userBalance: "",
      isSeller: ""
    });
    const [isDataLoad , setDataLoad] = useState(false);
    const matrix = [];
    
    function init(){
      var size = 50;
        for (var i =0; i<size ; i++){
        matrix[i] = [];
        for (var j=0; j<size; j++){
          matrix[i][j] = {
            ownerId: "oriya",
            type: "",
            rowIndex: i,
            colIndex: j,
            cost: 0,
            game: "",
            isForSale: false
          };
        }
      }
      getLandsFromDB();
    }
    
    userDetail(userMail);

    function userDetail(userMail){
      const params = {
        username: userMail,
      }
      const URL = 'http://localhost:4000/users/user';
      axios.get(URL , {params: params})
      .then((res) => {
        if (res.data){
          user.userBalance = res.data[0].balance;
          user.username = res.data[0].username;
          user.isSeller = res.data[0].isSeller;
        }else{

        }
      });
    }
    useEffect( () => {
      init();
    } , [isDataLoad]);

    function getLandsFromDB(){
      const URL = 'http://localhost:4000/lands/lands';
      axios.get(URL)
      .then((res) => {
        if (res.data){
          // console.log(res.data);
          // console.log(res.data.length);
          //setMap(res.data);
          var size = res.data.length;
          for (var i=0; i<size ; i++){
            for (var j=0; j<size; j++){
              matrix[i][j].ownerId = res.data[i][j].ownerId; 
              matrix[i][j].type = res.data[i][j].type; 
              matrix[i][j].rowIndex = res.data[i][j].rowIndex; 
              matrix[i][j].colIndex = res.data[i][j].colIndex; 
              matrix[i][j].cost = res.data[i][j].cost; 
              matrix[i][j].game = res.data[i][j].game; 
              matrix[i][j].isForSale = res.data[i][j].isForSale; 
              
            }
          }
          setMap(matrix);

        }else{

        }
      });
    }

    const [land , setLand] = useState({
            id: "",
            ownerId: "",
            type: "",
            rowIndex: -1,
            colIndex: -1,
            cost: 0,
            game: "",
            isForSale: false
          });

    const [isLandNFT , setLandShow] = useState(false);

   async function getLandfromDB(row , col){
      const params = {
        col: col,
        row: row
      }
      const URL = 'http://localhost:4000/lands/land';
      axios.get(URL , {params: params})
      .then((res) => {
        if (res){
          land.ownerId = res.data.ownerId;
          land.type = res.data.type;
          land.rowIndex = res.data.rowIndex;
          land.colIndex = res.data.colIndex;
          land.cost = res.data.cost;
          land.game = res.data.game;
          land.isForSale = res.data.isForSale;
          land.id = res.data._id;
          //console.log("ater update:" + land);
          openPopUp();
        }else{
          console.log("doesnt find land");
        }
      });
   }
    

   function checkLand(land){
    if (land.type === "park"){
      return "park-land";
    }else if (land.type === "road"){
      return "road-land";
    }else if (land.type === "NFT"){
      if (land.ownerId === userMail){
        return "mynft-land";
      }else if (land.isForSale){
        return "nftsale-land";
      }else if (!land.isForSale){
        return "nftnotsale-land";
      }
    }
   }
   
   function openPopUp(){
     if (land.type === "NFT"){
        setLandShow(true);
      }
   }

   function updateLandRowCol(row , col){
      getLandfromDB(row , col);
      setLandShow(false);
     
     
   }
   window.addEventListener("wheel" , zoom , {passive: false});
   var scale = 1;
   const el = document.getElementById("root");
   el.onwheel= zoom;

   function zoom(event) {
      event.preventDefault();

      scale += event.deltaY * -0.001;

      // Restrict scale
      scale = Math.min(Math.max(.125, scale), 1.5);
      if (scale < 1)
          scale=1;
      // Apply scale transform
      
      el.style.transform = `scale(${scale})`;
    }
  //  const wz = mouseWheelZoom({
  //     element: document.getElementById("root"),
  //     zoomStep: .25  
  //   });

    // reset zoom
    //wz.reset();

    return <div>
        <NavBar userBalance={user.userBalance} userMail={user.username}/>
        {isLandNFT ? <Popup land={land} userMail={userMail} isSeller={user.isSeller}/>: ""}
        <div className="rowOfLands" id="matrix">
           {
            lands.map( (row , rowIndex) => {
              return <div className="colOfLands" key={`col${rowIndex}`}>
                  {row.map( (element , colIndex) => {
                      const l = checkLand(element); 
                      //console.log(element);
                      return <div onClick={ () => updateLandRowCol(rowIndex , colIndex)} className={`matrixOfLands land ${l}`} key={`${rowIndex}_${colIndex}`} id={`${rowIndex}_${colIndex}`} > 
                          
                      </div>
                  })}  
              
              </div>
            })
           }
        </div>
  
        <Footer/>
    </div>
}

export default Main;