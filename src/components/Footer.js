import React, { useEffect, useState } from "react";
import axios from "axios";

export const Footer = ({ items = [] }) => {
  const [quote, setQuotes] = useState(() => {
    const savedQuote = localStorage.getItem("quote_today");
    return savedQuote ? JSON.parse(savedQuote) : "";
  });
  const [err, setErr] = useState("");
  
  const fetchQuoteApi = async () => {
    const apiUrl = `https://api.realinspire.tech/v1/quotes/random`;

    try {
      const response = await axios.get(apiUrl);
    console.log(response.data); 
    const { content="No content available", author="unknown" } = response.data[0];
    const todayQuote = {content,author};
    localStorage.setItem('quote_today',JSON.stringify(todayQuote));
    setQuotes(todayQuote);
    setErr("");
    } catch (err) {
      console.error(err);
      setErr("Failed to fetch quotes. Please try again later.");
    }
  };

  return (
    <footer>
      <div>
        <p>
          Your Score: {items.filter((item) => item.checked).length}/{items.length}
        </p>
        <p>
          Remaining Tasks: {items.length - items.filter((item) => item.checked).length}
        </p>
        <button type="button" onClick={fetchQuoteApi}>Get new Quote</button>
        {quote.content && <p>"{quote.content}" - {quote.author}</p>}
        {err && <p style={{ color: "red" }}>{err}</p>}
        <p id="myWebLink" style={{marginBottom:"0px"}}><a href="https://baranikumar954.github.io/myWebsiteBk/" target="_blank">About me</a></p>
      </div>
{/*       
      <div>
        <p id="myWebLink" style={{marginBottom:"0px"}}><a href="https://baranikumar954.github.io/myWebsiteBk/" target="_blank">About me</a></p>
      </div>
       */}
    </footer>
  );
};
