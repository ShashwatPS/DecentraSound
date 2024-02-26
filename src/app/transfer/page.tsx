'use client'

import { useDispatch, useSelector } from 'react-redux';
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import {SetName, SetUsername} from "@/provider/redux/SetUsername";
import {RootState} from "@/provider/redux/store";
import Link from 'next/link';
import Button from "@mui/material/Button"
import { provider } from "@/assets/web3/Provider";
import {ChangeTxHash} from "@/provider/redux/SetTxHash";
import { transferEther } from '@/assets/web3/contract/contractETH';
import { transferBinance } from '@/assets/web3/contract/contractBSC';
import {transferAvalanche} from "@/assets/web3/contract/contractAVL";
import {transferPolygon} from "@/assets/web3/contract/contractPLG";

export default function Transfer() {
    const { isLoaded, isSignedIn, user } = useUser();
    const userName = useSelector((state: RootState) => state.SetUsername.name);
    const accountName = useSelector((state: RootState) => state.SetAccount.name);
    const firstName = useSelector((state: RootState) => state.SetFirstName.name);
    const lastName = useSelector((state: RootState) => state.SetLastName.name);
    const txHash = useSelector((state: RootState) => state.SetTxHash.name);

    const dispatch = useDispatch();
    async function callContract(type: string, to: string, account: string) {
        try {
            let Hash : string;
            const amountInWei = '1000000000000000000';
            if (type==='ETH'){
                Hash = await transferEther(to, amountInWei, account);
                dispatch(ChangeTxHash(Hash));
            } else if (type==='BSC'){
                Hash = await transferBinance(to, amountInWei, account);
                dispatch(ChangeTxHash(Hash));
            } else if (type==='AVL'){
                Hash = await transferAvalanche(to, amountInWei, account);
                dispatch(ChangeTxHash(Hash));
            } else if (type === 'PLG'){
                Hash = await transferPolygon(to, amountInWei, account);
                dispatch(ChangeTxHash(Hash));
            }
        } catch (error) {
            console.error('Error transferring ether:', error);
        }
    }

    return (
        <div>
            <h1>This will be the transfer Page</h1>
            <Link href="/dashboard">Dashbaord</Link>
        </div>
    );
}
