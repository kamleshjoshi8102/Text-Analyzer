import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
  };
  const handleLowClick = () => {
    const newText = text.toLowerCase();
    setText(newText);
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  const handleClearText = () => {
    setText("");
  };
  const getWordsLength = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    return text.trim().split(" ").length;
  };
  const getSentenceLength = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    return text.trim().split(/\.(?=\s)/).length;
  };
  const handleWhiteSpaces = (text) =>{
    if (typeof text !== 'string') {
      return '';
    }
    return text.replace(/\s/g, "");
  }

  const calculateReadabilityScore = (text) => {
    const sentences = text.split(/[.?!]/);
    const numSentences = sentences.length;
    const numWords = text.split(/\s+/).length;
    const avgWordsPerSentence = numWords / numSentences;
  
    const syllableCounts = text.split(/\s+/).map((word) => {
      const syllableRegex = /[aiouy]+e*|e(?!d$|ly).|[td]ed|le$/g;
      const matches = word.toLowerCase().match(syllableRegex);
      return matches ? matches.length : 1;
    });
    const numSyllables = syllableCounts.reduce((a, b) => a + b);
    const avgSyllablesPerWord = numSyllables / numWords;
  
    const score = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
    return Math.round(score * 10) / 10; 
  };
const extractEmails = (text) => {
  const regex = /[\w.-]+@[^\s]+/g;
  const matches = text.match(regex);
  if (!matches) {
    return {emails: [], count: 0};
  }
  const emails = matches.map((match) => match.trim() + ' ');
  return {emails, count: emails.length};
}

  const [text, setText] = useState("");

  return (
    <>
      <div className="container">
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          id="exampleFormContr olTextarea1"
          onChange={handleOnChange}
          value={text}
          rows="8"
        ></textarea>
        <br />
        <button className="btn btn-success mx-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-success mx-1" onClick={handleLowClick}>
          Convert to LowerCase
        </button>
        <button className="btn btn-success mx-1" onClick={handleWhiteSpaces}>
          Remove Whitespaces
        </button>
        <button className="btn btn-danger mx-1" onClick={handleClearText}>
          Clear Text
        </button>
      </div>
      <div className="container">
        <h1> Your Text Summary</h1>
        <p>
          {getWordsLength(text)} words , {text.length} characters, {" "}
          {getSentenceLength(text)} Sentences and {extractEmails(text).count}{" "} Emails.
        </p>
        <p>{0.008 * getWordsLength(text)} Minutes Read</p>
        <h2>Preview</h2>
        <p>{text}</p>
        <h2> Readablity Score (Flesch-Kincaid Grade Level score) </h2>
        <p> {calculateReadabilityScore(text)}</p>
      </div>
    </>
  );
}
