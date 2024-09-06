// src/components/GeneralChat.js
import React from 'react';

export default function GeneralChat() {
  return (
    <div className="p-4 bg-white dark:bg-neutral-800 shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-4">General Chat</h2>
      <div className="h-64 overflow-y-auto border border-gray-200 dark:border-neutral-700 p-2">
        {/* Chat messages go here */}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
}
