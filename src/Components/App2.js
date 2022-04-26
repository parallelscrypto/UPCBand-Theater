import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
//import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import MLS from '../abis/MalcolmsLittleSecret.json'

import { ethers } from "ethers";

export default function UPCBR_Channel(props) {
  const [lvids, setLvids] = useState([]);
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChannel = async (channel) => {
    let contractAddress = "0x2b41E1C9E0cC5ee321B68FeA123a37E60B82a732";
    const { ethereum } = window;


	  
    if (!ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      MLS.abi,
      provider
    );

    if(channel.length == 12 || channel.length == 13) {
	 console.log(props);
         const currentChannel = await contract.upcInfo(channel);

         var channelVidsCommas =  currentChannel.ipfs;
         var channelArray      =  channelVidsCommas.split(',');
         var mediaLinks = new Array();
         for(let i = 0; i < channelArray.length; i++) {
            let mediaInfo = await contract.nftInfo(channelArray[i]);
            mediaLinks.push(mediaInfo.vr)
         }
         //var svids = props.setVids;
	 setLvids(mediaLinks);
	 //svids(mediaLinks);
         //return mediaLinks;
    }
  };

  useEffect(() => {
    if(props.channel) {
       fetchChannel(props.channel);
    }
    connectWallet();
  }, []);

        //console.log(lvids);
	var finalOutput = Array();
	for(let v=0; v<lvids.length; v++) {
	    var localOutput = <ReactPlayer
	      width="100vw"
	      url={lvids[v]}
	      style={{padding:"10px", borderBottom:"20px dashed white"}}
	    />
	    finalOutput.push(localOutput)
	    

//	   finalOutput += "<iframe src='" + lvids[v] + "' />";
	}
	if(finalOutput) {
return ( finalOutput)
	}
  return (
    <h1>Loading videos for channel {props.channel}</h1>
  )
}

