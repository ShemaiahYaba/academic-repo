import React from "react";

type Article = {
  id: number;
  title: string;
  author: string;
  keywords: string[];
  researchField: string;
  content: string;
  readMoreUrl: string;
};

const sampleArticles: Article[] = [
  {
    id: 1,
    title: "Understanding React Hooks",
    author: "Jane Doe",
    keywords: ["React", "Hooks", "JavaScript"],
    researchField: "Web Development",
    content:
      "React Hooks provide a powerful way to use state and other React features without writing a class. This article introduces the basics and practical use cases.",
    readMoreUrl: "https://example.com/articles/react-hooks",
  },
  {
    id: 2,
    title: "TypeScript for Beginners",
    author: "John Smith",
    keywords: ["TypeScript", "JavaScript", "Programming"],
    researchField: "Programming Languages",
    content:
      "TypeScript extends JavaScript by adding types, making code more robust and maintainable. Learn how to get started and why it matters.",
    readMoreUrl: "https://example.com/articles/typescript-beginners",
  },
  {
    id: 3,
    title: "Effective State Management",
    author: "Alice Johnson",
    keywords: ["State Management", "Redux", "React"],
    researchField: "Software Engineering",
    content:
      "Managing state in large applications can be challenging. This article explores different state management solutions and their best use cases.",
    readMoreUrl: "https://example.com/articles/state-management",
  },
];

const ArticleFeed: React.FC = () => (
  <div className="max-w-full mx-auto py-8">
    {sampleArticles.map((article) => (
      <div
        key={article.id}
        className="bg-white rounded-lg  p-6 mb-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {article.title}
        </h2>
        <p className="mb-1 text-gray-600">
          <span className="font-bold">Author:</span> {article.author}
        </p>
        <p className="mb-1 text-gray-600">
          <span className="font-bold">Research Field:</span>{" "}
          {article.researchField}
        </p>
        <p className="mb-1 text-gray-600">
          <span className="font-bold">Keywords:</span>{" "}
          {article.keywords.join(", ")}
        </p>
        <p className="mb-4 text-gray-700">{article.content}</p>
        <a
          href={article.readMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Read more
        </a>
      </div>
    ))}
  </div>
);

export default ArticleFeed;
