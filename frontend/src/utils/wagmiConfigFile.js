import { configureChains, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WagmiConfig, createClient, defaultChains } from 'wagmi';

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai, chain.sepolia],
  [publicProvider()],
);

export const client = createClient({
  autoConnect: true,
  chains,
  provider,
  webSocketProvider,
  connectors: [
    new MetaMaskConnector({
      chains,
      options: {
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
      }
    }),
    new InjectedConnector({
      chains,
      options: {
        name : "injected",
        shimDisconnect: false,
        shimChainChangedDisconnect: true,
      }
    })
  ]
});

// import { configureChains, createConfig } from 'wagmi';
// import { publicProvider } from 'wagmi/providers/public';
// import {
//   mainnet,
//   goerli,
//   sepolia,
//   polygonMumbai,
//   polygon,
//   bsc,
//   bscTestnet,
// } from 'wagmi/chains';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [mainnet, goerli, sepolia, polygonMumbai, polygon, bsc, bscTestnet],
//   [publicProvider()],
// );

// export const config = createConfig({
//   autoConnect: true,
//   chains,
//   connectors: [
//     new MetaMaskConnector({
//       options: {
//         shimDisconnect: false,
//       },
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// });
