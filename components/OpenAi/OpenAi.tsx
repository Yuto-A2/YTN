import { useState } from "react";
import "./OpenAi.css";

export default function Chat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input }),
      });

      console.log("Fetch Response:", res);

      if (!res.ok) {
        console.error("Error:", res.status, res.statusText);
        const errorText = await res.text();
        console.error("Error details:", errorText);
        return;
      }

      const data = await res.json();
      console.log("API Response Data:", data);
      setResponse(data.text || "No response from AI");
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };



  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} ></textarea>
        <button className="btnAi" type="submit">Send</button>
      </form>
      <div className="response">
        <p><span className="ai">AI&#39;s response: </span>{response}</p>
      </div>
    </div>
  );
}
