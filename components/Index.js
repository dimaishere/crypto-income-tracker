import { useState, useEffect } from "react"
import { useEthers } from '@usedapp/core'
import { formatEther } from "@ethersproject/units"
import { useCoingeckoPrice } from '@usedapp/coingecko'
import Web3 from 'web3';

const Index = () => {

  const { activateBrowserWallet, account, deactivate, chainId } = useEthers();

  const [totalBalance, setTotalBalance] = useState(0);

  const [ethBalance, setEthBalance] = useState(0);
  const [harmonyBalance, setHarmonyBalance] = useState(0);
  const [fantomBalance, setFantomBalance] = useState(0);

  const ethWeb3 = new Web3(process.env.NEXT_PUBLIC_ALCHEMY);
  const harmonyWeb3 = new Web3("https://api.harmony.one");
  const fantomWeb3 = new Web3("https://rpc.ftm.tools/");

  const ethPrice = useCoingeckoPrice('ethereum', 'usd');
  const harmonyPrice = useCoingeckoPrice('harmony', 'usd');
  const fantomPrice = useCoingeckoPrice('fantom', 'usd');

  const deactivateWallet = () => {
    setTotalBalance(0);
    setEthBalance(0);
    setHarmonyBalance(0);
    setFantomBalance(0);
    deactivate();
  }

  useEffect(() => {
    async function fetchW3Balance(web3Obj, setter) {
      const balance = await web3Obj.eth.getBalance(account);
      setter(formatEther(balance));
    }

    if (account !== undefined) {
      harmonyWeb3.eth.defaultAccount = account;
      ethWeb3.eth.defaultAccount = account;
      fetchW3Balance(ethWeb3, setEthBalance);
      fetchW3Balance(harmonyWeb3, setHarmonyBalance);
      fetchW3Balance(fantomWeb3, setFantomBalance);
    }
  }, [account]);

  useEffect(() => {
    const toUSD = (balance, price) => {
      return balance * price;
    }

    const ethUSD = toUSD(ethBalance, ethPrice);
    const harmonyUSD = toUSD(harmonyBalance, harmonyPrice);
    const fantomUSD = toUSD(fantomBalance, fantomPrice);
    setTotalBalance(ethUSD + harmonyUSD + fantomUSD);

  }, [ethBalance, harmonyBalance, fantomBalance])

  return (
    <div className="flex w-full min-h-screen items-center font-serif flex-col justify-evenly">
      <nav className="pt-3 pr-3 w-full flex flex-end">
        {!account && <button
          onClick={activateBrowserWallet}
          className="font-serif ml-auto text-base py-2 px-3 borderr border-gray-900 rounded-sm italic">→ Connect Metamask</button>}
        {account && <p className="ml-auto text-tiny py-2 cursor-pointer"
          onClick={deactivateWallet}>
          Account: {account.slice(0, 5)}...{account.slice(
            account.length - 4,
            account.length
          )}</p>}
      </nav>
      <div className="my-auto flex flex-col items-center">
        {<h1 className="text-3xl">{!isNaN(totalBalance) ? Math.round(totalBalance) : "loading..."} USD</h1>}
      </div>

      <div className="pb-2">
        {!account && <p className="text-tiny text-gray-700">Connect your Metamask wallet to see your data</p>}
        {ethBalance > 0 &&
          <p className="text-tiny mx-2 inline-block">$ETH: {parseFloat(ethBalance).toFixed(5)}</p>
        }
        {harmonyBalance > 0 &&
          <p className="text-tiny mx-2 inline-block">$ONE: {parseFloat(harmonyBalance).toFixed(2)}</p>
        }
        {fantomBalance > 0 &&
          <p className="text-tiny mx-2 inline-block">$FTM: {parseFloat(fantomBalance).toFixed(1)}</p>
        }
      </div>
    </div>
  );
};

export default Index;
