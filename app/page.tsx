"use client";

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import ArrowSvg from "./svg/ArrowSvg";
import ImageSvg from "./svg/Image";
import OnchainkitSvg from "./svg/OnchainKit";
import { useSendCalls } from "wagmi/experimental";
import { useWriteContract } from "wagmi";
import { encodeFunctionData, erc20Abi, parseUnits } from "viem";

const components = [
  {
    name: "Transaction",
    url: "https://onchainkit.xyz/transaction/transaction",
  },
  { name: "Swap", url: "https://onchainkit.xyz/swap/swap" },
  { name: "Checkout", url: "https://onchainkit.xyz/checkout/checkout" },
  { name: "Wallet", url: "https://onchainkit.xyz/wallet/wallet" },
  { name: "Identity", url: "https://onchainkit.xyz/identity/identity" },
];

const templates = [
  { name: "NFT", url: "https://github.com/coinbase/onchain-app-template" },
  {
    name: "Commerce",
    url: "https://github.com/coinbase/onchain-commerce-template",
  },
  { name: "Fund", url: "https://github.com/fakepixels/fund-component" },
];

const USDC_ADDRESS = "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913";

const TO_ADDRESS = "0x448cd76BE24DF28AdAbE7786135f9b14D50e6dab";
// const TO_ADDRESS_2 = "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045";

export default function App() {
  const { writeContractAsync } = useWriteContract();
  const { sendCallsAsync } = useSendCalls();

  // this call is sponsored correctly
  const handleSendUsdcClick = async () => {
    await writeContractAsync({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "transfer",
      args: [TO_ADDRESS, parseUnits("0.01", 6)],
    });
  };

  // this call is not sponsored correctly
  const handleSendUsdcWithSendCallsClick = async () => {
    const calls = [
      {
        to: USDC_ADDRESS,
        data: encodeFunctionData({
          abi: erc20Abi,
          functionName: "transfer",
          args: [TO_ADDRESS, parseUnits("0.01", 6)],
        }),
      },
      // {
      //   to: USDC_ADDRESS,
      //   data: encodeFunctionData({
      //     abi: erc20Abi,
      //     functionName: "transfer",
      //     args: [TO_ADDRESS_2, parseUnits("0.01", 6)],
      //   }),
      // },
    ];
    await sendCallsAsync({ calls });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <header className="pt-4 pr-4">
        <div className="flex justify-end">
          <div className="wallet-container">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl w-full p-4">
          <div className="flex gap-20 items-center justify-center">
            <div className="flex flex-col gap-2">
              <div>This call is not sponsored correctly</div>
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleSendUsdcWithSendCallsClick}
              >
                Send USDC with sendCallsAsync
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div>This call is sponsored correctly</div>
              <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleSendUsdcClick}
              >
                Send USDC with write contract
              </button>
            </div>
          </div>
          <div className="w-1/3 mx-auto mb-6 mt-20">
            <ImageSvg />
          </div>
          <div className="flex justify-center mb-6">
            <a target="_blank" rel="_template" href="https://onchainkit.xyz">
              <OnchainkitSvg className="dark:text-white text-black" />
            </a>
          </div>
          <p className="text-center mb-6">
            Get started by editing
            <code className="p-1 ml-1 rounded dark:bg-gray-800 bg-gray-200">
              app/page.tsx
            </code>
            .
          </p>
          <div className="flex flex-col items-center">
            <div className="max-w-2xl w-full">
              <div className="flex flex-col md:flex-row justify-between mt-4">
                <div className="md:w-1/2 mb-4 md:mb-0 flex flex-col items-center">
                  <p className="font-semibold mb-2 text-center">
                    Explore components
                  </p>
                  <ul className="list-disc pl-5 space-y-2 inline-block text-left">
                    {components.map((component, index) => (
                      <li key={index}>
                        <a
                          href={component.url}
                          className="hover:underline inline-flex items-center dark:text-white text-black"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {component.name}
                          <ArrowSvg />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:w-1/2 flex flex-col items-center">
                  <p className="font-semibold mb-2 text-center">
                    Explore templates
                  </p>
                  <ul className="list-disc pl-5 space-y-2 inline-block text-left">
                    {templates.map((template, index) => (
                      <li key={index}>
                        <a
                          href={template.url}
                          className="hover:underline inline-flex items-center dark:text-white text-black"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {template.name}
                          <ArrowSvg />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
