import React, { useEffect } from "react";
//import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import MLS from '../abis/MalcolmsLittleSecret.json'

import { ethers } from "ethers";

export default function UPCBR_Channel(props) {
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

    if(channel.length == 12) {
	    console.log("entering");
	    console.log(channel);
         const currentChannel = await contract.upcInfo(channel);

         var channelVidsCommas =  currentChannel.ipfs;
         var channelArray      =  channelVidsCommas.split(',');
         var mediaLinks = new Array();
         for(let i = 0; i < channelArray.length; i++) {
            let mediaInfo = await contract.nftInfo(channelArray[i]);
            mediaLinks.push(mediaInfo.vr)
         }
         
         console.log(mediaLinks);	
         return mediaLinks;
    }
  };

  useEffect(() => {
    if(props.channel) {
       console.log(props.channel);
       fetchChannel(props.channel);
    }
    connectWallet();
  }, []);

  return (
    <h1>child component</h1>
  )
}

