import { contractAddresses, abi } from "../constants"
// dont export from moralis when using react
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"
import { Input, Select, Spacer, Row } from "./Input"
import { useForm } from "react-hook-form"

export default function PostFeild() {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()
    const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    // These get re-rendered every time due to our connect button!
    const chainId = parseInt(chainIdHex)
    // console.log(`ChainId is ${chainId}`)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    // State hooks
    // https://stackoverflow.com/questions/58252454/react-hooks-using-usestate-vs-just-variables
    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    // const {
    //     runContractFunction: enterRaffle,
    //     data: enterTxResponse,
    //     isLoading,
    //     isFetching,
    // } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress,
    //     functionName: "enterRaffle",
    //     msgValue: entranceFee,
    //     params: {},
    // })
    const {
        data,
        runContractFunction: postLand,
        isLoading,
        isFetching,
    } = useWeb3Contract(
    //     {
    //     abi: abi,
    //     contractAddress: raffleAddress, // specify the networkId
    //     functionName: "add_land",
    //     params: {
    //         _fid: "GJDW0001",
    //         _UPIN: 87465385834,
    //         _landTitle: "varla vadi",
    //         _SurvayNo: 234,
    //         _area: "300msq",
    //         _landUse: "agri",
    //     },
    // }
    )

    /* View Functions */

    // const { runContractFunction: getEntranceFee } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress, // specify the networkId
    //     functionName: "getEntranceFee",
    //     params: {},
    // })

    // const { runContractFunction: getPlayersNumber } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress,
    //     functionName: "getNumberOfPlayers",
    //     params: {},
    // })

    // const { runContractFunction: getRecentWinner } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress,
    //     functionName: "getRecentWinner",
    //     params: {},
    // })

    // async function updateUIValues() {
    //     // Another way we could make a contract call:
    //     // const options = { abi, contractAddress: raffleAddress }
    //     // const fee = await Moralis.executeFunction({
    //     //     functionName: "getEntranceFee",
    //     //     ...options,
    //     // })
    //     const entranceFeeFromCall = (await getEntranceFee()).toString()
    //     const numPlayersFromCall = (await getPlayersNumber()).toString()
    //     const recentWinnerFromCall = await getRecentWinner()
    //     setEntranceFee(entranceFeeFromCall)
    //     setNumberOfPlayers(numPlayersFromCall)
    //     setRecentWinner(recentWinnerFromCall)
    // }

    useEffect(() => {
        if (isWeb3Enabled) {
            //updateUIValues()
            console.log(data)
        }
    }, [isWeb3Enabled, data])
    // no list means it'll update everytime anything changes or happens
    // empty list means it'll run once after the initial rendering
    // and dependencies mean it'll run whenever those things in the list change

    // An example filter for listening for events, we will learn more on this next Front end lesson
    // const filter = {
    //     address: raffleAddress,
    //     topics: [
    //         // the name of the event, parnetheses containing the data type of each event, no spaces
    //         utils.id("RaffleEnter(address)"),
    //     ],
    // }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Transaction Notification",
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
        <div className="p-5" style={{width:"100%",background:"transparent"}}>
            <h1 className="py-4 px-4 font-bold text-3xl">Land</h1>
            <div >

            <form
                onSubmit={handleSubmit(async (data) => {
                    const options = {
                        abi: abi,
                        contractAddress: raffleAddress, // specify the networkId
                        functionName: "add_land",
                        params: data,
                    }
                    console.log(data)
                    await postLand({
                        params: options,
                        onSuccess: handleSuccess,
                        onError: (error) => console.log(error),
                    })
                })}
            >
                <Row>
                    <Input
                        placeholder="fid"
                        width={30}
                        register={register}
                        label="_fid"
                        validation={{ required: true, maxLength: 20 }}
                        errors={errors}
                    />
                    <Input
                        placeholder="upin"
                        width={30}
                        register={register}
                        label="_UPIN"
                        validation={{ required: true, maxLength: 20 }}
                        errors={errors}
                        valueAsNumber={true}

                    />
                </Row>
                <Spacer />
                <Row>
                    <Input
                        placeholder="Land Title"
                        width={30}
                        register={register}
                        label="_landTitle"
                        validation={{ required: true, maxLength: 20 }}
                        errors={errors}
                    />
                     <Input
                        placeholder="Land Use"
                        width={30}
                        register={register}
                        label="_landUse"
                        validation={{ required: true, maxLength: 20 }}
                        errors={errors}
                    />
                </Row>
                <Spacer />

                <Row>
                    <Input
                        placeholder="Survey No"
                        width={30}
                        register={register}
                        label="_SurvayNo"
                        validation={{ required: true, maxLength: 20 }}
                        errors={errors}
                        valueAsNumber={true}
                    />
                    <Input
                        placeholder="Area"
                        width={30}
                        register={register}
                        label="_area"
                        validation={{ required: true, maxLength: 20 }}
                        errors={errors}
                    />
                </Row>
                <Spacer />
                <Row>
                   
                </Row>
                <Spacer />

                {raffleAddress ? (
                    <>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                            onClick={async () => {
                                console.log(errors)
                                // await postLand({
                                //     // onComplete:
                                //     // onError:
                                //     onSuccess: handleSuccess,
                                //     onError: (error) => console.log(error),
                                // })
                            }}
                            disabled={isLoading || isFetching}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                            ) : (
                                "post Feild"
                            )}
                        </button>
                        {/* <div>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</div>
                    <div>The current number of players is: {numberOfPlayers}</div>
                    <div>The most previous winner was: {recentWinner}</div> */}
                    </>
                ) : (
                    <div>Please connect to a supported chain </div>
                )}
            </form>
            </div>

        </div>
    )
}
