import React, { useState } from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, SlideContainer, Slider, Container, Header, Link } from "./components";

import { addresses, abis } from "@project/contracts";
import { GET_INDEX_HISTORIES } from "./graphql/subgraph";
// import indexEntities from "./data/indexEntities"
// import indexHistories from "./data/indexHistories"
import Chart from "./components/chart"
import moment from 'moment'
async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(addresses.ceaErc20, abis.erc20, defaultProvider);
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf("0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C");
  console.log({ tokenBalance: tokenBalance.toString() });
}


function App() {
  const [ pctDiff, setPctDiff ] = useState('0');
  console.log({pctDiff})
  const { loading, error, data  } = useQuery(GET_INDEX_HISTORIES, {
    variables:{ pctDiff }
  });
  let historyData
  // React.useEffect(() => {
  //   console.log({indexHistories})

  //   if (!loading && !error && data && data.transfers) {
  //     console.log({ transfers: data.transfers });
  //   }
  // }, [loading, error, data]);
  if(error){
    return(JSON.stringify(error))
  }else{
    console.log({data})
    historyData = (data && data.indexHistories && data.indexHistories.map(d => {
      return({
        dpiValue: parseFloat(d.dpiValue),
        tokenSumValue: parseFloat(d.tokenSumValue),
        pctDiff: parseFloat(d.pctDiff),
        date: moment(parseInt(d.timestamp) * 1000).format("MMM Do kk:mm:ss")
      })
    }).reverse()) || []
    const num = historyData.length

    const inputHandler = (e) => {
      console.log({e})
      setPctDiff(e.target.value)
    }
    console.log({
      num , historyData
    })
  
    return (
      <>
        <Header>🦉 Index COOP DPI Arbitrage 🦅 opportunity graph 📈 </Header>
        <Container>
          <p>
            This chart is inspired by <Link href="https://github.com/ConcourseOpen/DPI_Arb_Bot_Example">DPI_Arb_Bot_Example</Link>.
            It takes the underlying token reserve from <Link href="https://etherscan.io/address/0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b">Index DPI Token</Link> then sums up the total value and compare with the price of DPI Token itself.
            <br />
          </p>
          <div>
            { num === 0 ? ('loading') : (
              <>
                <SlideContainer>
                  <p>Price Diffrence: { pctDiff } % </p> 
                  <Slider
                    type="range" min="0" max="5" value={pctDiff} class="slider" id="myRange" step="0.1"
                    onChange={inputHandler}
                  />
                  <p>
                    Plotting { num } points btw { historyData[0].date } and { historyData[num - 1].date } 
                  </p>

                </SlideContainer>
                <Body>
                  <Chart data={historyData} xKey={'date'} yKeys={['dpiValue', 'tokenSumValue']} />
                  <Chart data={historyData} xKey={'date'} yKeys={['pctDiff']} brush={true} axis={true} />
                </Body>
              </>
            ) }
          </div>
        </Container>
      </>
    );  
  }
}

export default App;
