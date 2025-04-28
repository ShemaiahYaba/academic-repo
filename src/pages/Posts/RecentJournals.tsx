import React from "react";

const RecentJournals: React.FC = () => {
  const [journals, setJournals] = React.useState<string[]>([]);
  const [input, setInput] = React.useState("");

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setJournals([input, ...journals]);
      setInput("");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center mb-4 text-2xl font-semibold">
        Recent Journals
      </h2>
      <form onSubmit={handleAddJournal} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new journal entry..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
      <ul className="list-none p-0">
        {journals.map((journal, idx) => (
          <li key={idx} className="bg-gray-100 mb-2 p-3 rounded">
            {journal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentJournals;
