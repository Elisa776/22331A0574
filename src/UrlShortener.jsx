import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";

const UrlShortenerApp = () => {
  const [url, setUrl] = useState("");
  const [shortUrls, setShortUrls] = useState(() => {
    const stored = localStorage.getItem("shortUrls");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("shortUrls", JSON.stringify(shortUrls));
  }, [shortUrls]);

  const shortenUrl = () => {
    if (!url.trim()) return;
    const id = nanoid(6);
    const shortUrl = `${window.location.origin}/s/${id}`;

    const newEntry = {
      id,
      originalUrl: url,
      shortUrl,
      visits: 0,
      createdAt: new Date().toLocaleString(),
    };

    setShortUrls([...shortUrls, newEntry]);
    setUrl("");
  };

  const handleVisit = (id) => {
    setShortUrls(
      shortUrls.map((entry) =>
        entry.id === id ? { ...entry, visits: entry.visits + 1 } : entry
      )
    );
  };

  return (
  
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🔗 URL Shortener</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 border rounded p-2"
        />
        <button
          onClick={shortenUrl}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Shorten
        </button>
      </div>

      {shortUrls.length === 0 ? (
        <p className="text-gray-500 text-center">No URLs shortened yet.</p>
      ) : (
        <ul className="space-y-4">
          {shortUrls.map(({ id, originalUrl, shortUrl, visits, createdAt }) => (
            <li key={id} className="border rounded p-4 shadow-sm">
              <div className="mb-2">
                <span className="font-medium text-sm text-gray-600">Original:</span>
                <p className="break-all text-sm">{originalUrl}</p>
              </div>
              <div className="mb-2">
                <span className="font-medium text-sm text-gray-600">Short:</span>
                <a
                  href={originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVisit(id)}
                  className="text-blue-600 underline text-sm ml-1"
                >
                  {shortUrl}
                </a>
              </div>
              <div className="text-xs text-gray-500 flex justify-between">
                <span>Visits: {visits}</span>
                <span>Created: {createdAt}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
   
  );
};

export default UrlShortenerApp;

