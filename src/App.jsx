import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberallowed, setnumberallowed] = useState(false);
  const [symbolallowed, setsymbolallowed] = useState(false);
  const [password, setpassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let sym = "!@#$%^&*()_+";

    let password = "";

    if (numberallowed) char += num;
    if (symbolallowed) char += sym;

    for (let i = 0; i < length; i++) {
      const letter = Math.floor(Math.random() * char.length + 1);
      password += char.charAt(letter);
    }

    setpassword(password);
  }, [length, numberallowed, symbolallowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberallowed, symbolallowed]);

  const makeCopied = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <>
      <div className="w-full max-w-md text-orange-500 bg-gray-600 px-4 py-3 my-8 shawdow-md rounded-lg mx-auto">
        <h1 className="text-white text-center">Password Generator</h1>
        <div className="flex overflow-hidden mb-4">
          <input
            type="text"
            ref={passwordRef}
            value={password}
            readOnly
            placeholder="Generated Password"
            className="outline-none w-full py-1 px-3"
          />
          <button
            onClick={makeCopied}
            className="bg-blue-700 text-white py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="range"
            className="cursor-pointer"
            min="8"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length"> Length:{length}</label>
          <input
            type="checkbox"
            defaultChecked={numberallowed}
            onChange={() => {
              setnumberallowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">number</label>
          <input
            type="checkbox"
            defaultChecked={symbolallowed}
            onChange={() => {
              setsymbolallowed((prev) => !prev);
            }}
          />
          <label htmlFor="symbol">symbol</label>
        </div>
      </div>
    </>
  );
}

export default App;
