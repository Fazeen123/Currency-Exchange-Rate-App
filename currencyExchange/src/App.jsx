import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Head from './Head'

const App = () => {

  const [fromCurrency,setFromCurrency]=useState("USD");
  const [toCurrency,setToCurrency]=useState("LKR");
  const [finalRate,setFinalRate]=useState(null);
  const [amount,setAmount]=useState(1);
  const [exchangeRate,setExchangeRate]=useState(null);
  
  
  
  useEffect(()=>{
    const getExchangeRate = async()=>{
      try{
        const Url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
        
        const resp=await axios.get(Url);
        console.log(resp);
        setExchangeRate(resp.data.rates[toCurrency]);
      }catch(error){
        console.error("Error occured while Exchange Api fetching :",error);
      }
    }
    getExchangeRate();
  },[fromCurrency,toCurrency]
  );

  const handleFromCurrencyChange= (e)=>{setFromCurrency(e.target.value)};
  const handleToCurrencyChange= (e)=>{setToCurrency(e.target.value)};
  const changeRate = (e)=>{
    const val = parseFloat(e.target.value)
    setAmount(isNaN(val) ? 0: val);

  }

  useEffect(()=>{
    if(exchangeRate !== null){
      setFinalRate((amount*exchangeRate).toFixed(2));
    }
  },[amount,exchangeRate]);

  return (
    <>
    <Head/>
    <div className='Main-containor'>
      <div className='Image-containor'>
      </div>
      <div className='Content-containor'>
        <div className='Heading'>Currency Exchange Calculator</div>
        <div className='Content'>
          <label htmlFor="Amount">Amount : </label>
          <input type="text" id='Amount'  onChange={changeRate}/>
          <div className='from-currency'>From Currency : </div>
          <select name="From-Currency" id="from-currency-sel" value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="USD">USD-US Dollar</option>
            <option value="AED">AED</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
            <option value="HKD">HKD</option>
            <option value="JPY">JPY</option>
            <option value="LKR">LKR</option>
            <option value="PKR">PKR</option>
            <option value="QAR">QAR</option>
            <option value="SAR">SAR</option>
          </select>
          <div className='to-currency'>To Currency : </div>
          <select name="To-Currency" id="to-Currency" value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="USD">USD-US Dollar</option>
            <option value="AED">AED</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
            <option value="HKD">HKD</option>
            <option value="JPY">JPY</option>
            <option value="LKR">LKR</option>
            <option value="PKR">PKR</option>
            <option value="QAR">QAR</option>
            <option value="SAR">SAR</option>
          </select>
          <div className='Result-containor'>
            <div>1 {fromCurrency} is equal to {finalRate} {toCurrency}</div>
          </div>
        </div>
      </div>
    </div>    
    </>
  )
}

export default App
