import React from "react";



function NavBar(props){
    return  <div>
                <nav class="navbar">
                    <span class="navbar-brand h1 font-weight-bold font-italic">{props.userMail}</span>
                    <span class="navbar-brand"></span>
                    <span class="navbar-brand mynft">my NFT</span>
                    <span class="navbar-brand park">Park</span>
                    <span class="navbar-brand road">Road</span>
                    <span class="navbar-brand nftsale">NFT-for sale</span>
                    <span class="navbar-brand nftnotsale">NFT-not for sale</span>
                    <span class="navbar-brand nftnotsale"></span>
                    <span class="navbar-brand">Coins: {props.userBalance} <i class="fab fa-btc"></i></span>
                    <a href="/"><i class="fa-solid fa-arrow-right-from-bracket"></i></a>
                </nav>
            </div>
}




export default NavBar;