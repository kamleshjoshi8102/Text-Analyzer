import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to UpperCase", "success");
  };
  const handleLowClick = () => {
    const newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to LowerCase", "success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  };
  const handleClearText = () => {
    setText("");
    props.showAlert("Cleared Text", "success");
  };
  const getWordsLength = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    return text.trim().split(/\s+/).length;
  };
  const getSentenceLength = (text) => {
    if (text.trim() === "") {
      return 0;
    }
    return text.trim().split(/\.(?=\s)/).length;
  };
  const handleWhiteSpaces = () => {
    if (typeof text !== "string") {
      return "";
    }
    setText(text.replace(/\s/g, ""));

    props.showAlert("Removed Whitespaces", "success");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard", "success");
  };
  const handleExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Removed Extra Spaces", "success");
  };

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

    const score =
      0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;
    return Math.round(score * 10) / 10;
  };
  const extractEmails = (text) => {
    const regex = /[\w.-]+@[^\s]+/g;
    const matches = text.match(regex);
    if (!matches) {
      return { emails: [], count: 0 };
    }
    const emails = matches.map((match) => match.trim() + " ");
    return { emails, count: emails.length };
  };
  // const handleExtractNum = (text) => {
  //   const pattern = /\d+(\.\d+)?/g; // regular expression pattern for matching numbers
  //   const numbers = text.match(pattern);
  //   return numbers.map(Number);
  // };

  const [text, setText] = useState("");

  return (
    <>
      <div className="container mb-4" style={{}}>
        <h1>{props.heading}</h1>
        <textarea
          className="form-control"
          id="myBox"
          onChange={handleOnChange}
          value={text}
          rows="8"
        ></textarea>
        <br />
        <div className="container my-3">
          <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleUpClick}
          >
            Convert to Uppercase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleLowClick}
          >
            Convert to LowerCase
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleWhiteSpaces}
          >
            Remove Whitespaces
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleExtraSpace}
          >
            Remove Extra Spaces
          </button>
          <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleCopy}
          >
            Copy To Clipboard
          </button>
          {/*
            <button
            disabled={text.length === 0}
            className="btn btn-success mx-1 my-1"
            onClick={handleExtractNum}
          >
            Extract Numbers
          </button>

          // Extract Emails
          // Extract 
          // Encode to base64
          // Redo or Undo Action
        */}

          <button
            disabled={text.length === 0}
            className="btn btn-danger mx-1 my-1"
            onClick={handleClearText}
          >
            Clear Text
          </button>
        </div>
      </div>
      <div className="container my-3">
        <h1> Your Text Summary</h1>
        <p>
          {getWordsLength(text)} words , {text.length} characters,{" "}
          {getSentenceLength(text)} Sentences and {extractEmails(text).count}{" "}
          Emails.
        </p>
        <p>{0.008 * getWordsLength(text)} Minutes Read</p>
        <p> {text.length > 0 ? text : "Nothing to Preview"}</p>
        <h2> Readablity Score (Flesch-Kincaid Grade Level score) </h2>
        <p> {calculateReadabilityScore(text)}</p>
      </div>
    </>
  );
}
