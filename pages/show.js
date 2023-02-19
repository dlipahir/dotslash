import { contractAddresses, abi } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

//import { Input, Select, Spacer, Row } from "./Input"
import { useForm } from "react-hook-form"
import Header from "../components/Header"

const Show = () => {
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const dispatch = useNotification()

    const {
        data,
        runContractFunction: getLand,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, // specify the networkId
        functionName: "getAllFarmers",
    })
    // console.log(getLand);
    useEffect(() => {
        if (isWeb3Enabled) {
            //updateUIValues()
            console.log(data)
        }
    }, [isWeb3Enabled, data])

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Farmers Profile fetched!",
            title: "Profile Fetching",
            position: "topR",
            icon: "bell",
        })
    }

    const handleSuccess = async (tx) => {
        try {
            //await tx.wait(1)
            //updateUIValues()
            // console.log(data)
            handleNewNotification(tx)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header />
            <div
                onClick={async () => {
                    console.log("gettin data")
                    await getLand({
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    })
                }}
            >
                <div style={{ padding: 20 }}>Show</div>
                <div>
                    {data ? (
                        <>
                            {data.map((item,i) => {
                                return <div key={i} style={{padding:10,fontSize:20,background:"#7777",margin:10,borderRadius:5}}>{item}</div>
                            })}
                        </>
                    ) : (
                        <>
                            <div>no Data available</div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Show
