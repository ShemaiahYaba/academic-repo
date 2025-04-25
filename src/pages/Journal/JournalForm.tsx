// src/components/JournalForm.tsx

import React from "react";

interface JournalFormProps {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export const JournalForm: React.FC<JournalFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => {
  return (
    <div className="p-4 mt-2">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-black">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black">
              Authors
            </label>
            <input
              type="text"
              name="authors"
              value={formData.authors}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black">
              Overview
            </label>
            <textarea
              name="overview"
              rows={3}
              value={formData.overview}
              onChange={handleChange}
              className="mt-1 block w-full h-30 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-black">ISSN</label>
              <input
                type="text"
                name="issn"
                value={formData.issn}
                onChange={handleChange}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-black">
                Keywords
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleChange}
                className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-black">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black">
              Document Link
            </label>
            <input
              type="text"
              name="documentLink"
              value={formData.documentLink}
              onChange={handleChange}
              className="mt-1 block w-full h-10 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-indigo-500 sm:text-sm p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-lg font-bold rounded-md text-white bg-black hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
