const express = require("express");
const Land = require("../models/Land");
const User = require("../models/User");
const router = express.Router();

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const { Blockchain , Transaction } = require("../blockchain")
const blockchain = new Blockchain();


//GETTING ALL lands
router.get("/lands" , async (req, res) => {
    try {
        const lands = await Land.find();
        const size = Math.sqrt(lands.length);
        const landsRow = [];
        for (var i=0; i< size ; i++){
            const landsCol = [];
            for (var j=0; j<size; j++){
                landsCol.push(lands[i*size+j]);
            }
            landsRow.push(landsCol);
        }
        return res.send(landsRow);
    }catch(err){
        return res.json(err);
    }
});

//get Land by row & col
router.get("/land" , async (req, res) => {
   const row = req.query.row;
   const col = req.query.col;

    Land.findOne({rowIndex: row , colIndex: col} , function(err , foundLand){
        if (foundLand){
            res.send(foundLand);
        }else{
            res.send(err);
        }
    })
});

//update Land fields{cost , game , forSale} by land ID
router.patch("/updateland" , async (req, res) => {
   const id = req.body.id;
   const newCost = parseInt(req.body.cost);
   const newGame = req.body.game;
   const newIsForSale = req.body.isForSale;
   const newData = {
    cost: newCost,
    game: newGame,
    isForSale: newIsForSale
   }

    Land.findByIdAndUpdate(id, newData , function(err , foundLand){
        if (foundLand){
            res.send(foundLand)
        }else{
            res.send(err);
        }
    })
});

//buy Land
router.patch("/buyland" , async (req, res) => {
   const landId = req.body.landId;
   const landCost = req.body.landCost;
   const newOwnerId = req.body.newOwnerId;
   const oldOwnerId = req.body.oldOwnerId;
   
   
   User.findOne({username: newOwnerId} , function(err , foundUser){
        if (foundUser){
            //console.log(foundUser);
            if ( foundUser.balance >= landCost){
                // res.send(foundUser)
                // update newBalance To user
                const newBalance = foundUser.balance - landCost;
                User.findByIdAndUpdate(foundUser._id , {balance: newBalance , block: blockchain} , function(errBalance , UserUpdatedBalance){
                    if (UserUpdatedBalance){
                        
                         Land.findById(landId , function(errLand , foundLand){
                            if (foundLand){
                                const key = ec.keyFromPrivate(oldOwnerId , 'hex');
                                const tx = new Transaction(oldOwnerId , newOwnerId , landCost);
                                //tx.signTransaction(key);
                                blockchain.addTransaction(tx);

                                const newData = {
                                    ownerId: newOwnerId,
                                    isForSale: false,
                                    block: {
                                        previosHash: foundLand.block.previosHash,
                                        nonce: foundLand.block.nonce,
                                        hash: foundLand.block.hash,
                                        transactions:  blockchain.pendingTransactions
                                    }
                                }
                                Land.findByIdAndUpdate(landId , newData , function(errLandAfterUpdate , foundLandAfterUpdate){
                                    if (foundLandAfterUpdate){
                                        User.findOne({username: oldOwnerId} , function(errOldUser , foundOldUser){
                                            if (foundOldUser){
                                                const newBalanceToOldOwner = foundOldUser.balance + landCost;
                                                User.findByIdAndUpdate(foundOldUser._id ,{balance: newBalanceToOldOwner} , function(errBalanceToOldOwner , oldUserUpdateBalane){
                                                    if (oldUserUpdateBalane){
                                                        // console.log(oldUserUpdateBalane);
                                                        // sconsole.log("new balance updated successfully to old Owner");
                                                        res.send(foundUser);
                                                    }else{
                                                        res.send(null);
                                                    }
                                                } )
                                            }
                                        })
                                    }else{
                                        res.send(null);
                                    }
                                })
                                
                            }else {
                                res.send(null);
                            }
                        });
                    }else{
                        res.send(null);
                    }
                });
                
            }else{
                res.send(null)
            }
            
        }
   })

   
});

module.exports = router;