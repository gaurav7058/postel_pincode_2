import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../Styles/PinCodeForm.css";

export default function PinCodeForm() {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function FormHandler(e) {
    e.preventDefault();
    if (pincode.length < 6) {
      setError("The code is not 6 digits");
      return;
    }

    setError("");
    setLoading(true); // Start loading

    try {
      // Fetch the API to check pincode validity
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data[0].Status === "Error") {
        setError("The pincode is incorrect");
        setLoading(false); // Stop loading if pincode is invalid
        setPincode("")
      } else {
        setLoading(false);
        navigate(`/pincode/${pincode}`);
      }
    } catch (err) {
      setError("An error occurred while fetching data");
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={FormHandler}>
        <div className="form">
          <label htmlFor="pincode">Enter Pincode</label><br />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          /><br />
          <button type="submit">Lookup</button>
        </div>
        <div className="error">
          <h1>{error}</h1>
        </div>
        {loading && (
          <div className="loader">
            <h1>Loading...</h1>
          </div>
        )}
      </form>
    </div>
  );
}
