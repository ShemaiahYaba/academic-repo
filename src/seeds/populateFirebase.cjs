// populateFirebase.js

const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK with the service account
const serviceAccount = require("../../serviceAccountKey.json"); // Path to your service account key file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Example journal data (you can replace or extend this as needed)
const journals = [
  {
    title: "Journal of Artificial Intelligence",
    authors: "John Doe, Jane Smith",
    overview: "A comprehensive journal on AI research.",
    issn: "1234-5678",
    keywords: "AI, Machine Learning, Neural Networks",
    subject: "Technology",
    documentLink: "https://example.com/ai-journal-article",
    username: "john_doe", // Assuming you store user-related data like username
    createdAt: new Date(),
  },
  {
    title: "Journal of Data Science",
    authors: "Alice Johnson, Bob Lee",
    overview: "A journal focused on data science and its applications.",
    issn: "9876-5432",
    keywords: "Data Science, Statistics, Analytics",
    subject: "Science",
    documentLink: "https://example.com/data-science-journal-article",
    username: "alice_johnson",
    createdAt: new Date(),
  },
  {
    title: "International Journal of Quantum Computing",
    authors: "Emily Carter, Michael Brown",
    overview: "Explores advances in quantum computing and algorithms.",
    issn: "2468-1357",
    keywords: "Quantum Computing, Algorithms, Physics",
    subject: "Technology",
    documentLink: "https://example.com/quantum-computing-journal-article",
    username: "emily_carter",
    createdAt: new Date(),
  },
  {
    title: "Journal of Environmental Studies",
    authors: "Sarah Green, David White",
    overview: "Research on environmental science and sustainability.",
    issn: "1122-3344",
    keywords: "Environment, Sustainability, Ecology",
    subject: "Science",
    documentLink: "https://example.com/environmental-studies-journal-article",
    username: "sarah_green",
    createdAt: new Date(),
  },
  {
    title: "Medical Innovations Journal",
    authors: "Linda Black, Kevin Young",
    overview: "Covers breakthroughs in medical technology and healthcare.",
    issn: "5566-7788",
    keywords: "Medicine, Healthcare, Technology",
    subject: "Health",
    documentLink: "https://example.com/medical-innovations-journal-article",
    username: "linda_black",
    createdAt: new Date(),
  },
  {
    title: "Journal of Modern Literature",
    authors: "Rachel Adams, Tom Clark",
    overview: "Analysis and critique of contemporary literary works.",
    issn: "3344-5566",
    keywords: "Literature, Critique, Modernism",
    subject: "Arts",
    documentLink: "https://example.com/modern-literature-journal-article",
    username: "rachel_adams",
    createdAt: new Date(),
  },
  {
    title: "Global Economics Review",
    authors: "Peter Hall, Susan King",
    overview: "Insights into global economic trends and policies.",
    issn: "7788-9900",
    keywords: "Economics, Globalization, Policy",
    subject: "Economics",
    documentLink: "https://example.com/global-economics-journal-article",
    username: "peter_hall",
    createdAt: new Date(),
  },
  {
    title: "Journal of Educational Research",
    authors: "Nancy Scott, Brian Evans",
    overview: "Studies on educational methods and learning outcomes.",
    issn: "2233-4455",
    keywords: "Education, Learning, Pedagogy",
    subject: "Education",
    documentLink: "https://example.com/educational-research-journal-article",
    username: "nancy_scott",
    createdAt: new Date(),
  },
  {
    title: "Journal of Renewable Energy",
    authors: "Olivia Turner, Mark Harris",
    overview: "Focuses on renewable energy sources and technologies.",
    issn: "6677-8899",
    keywords: "Renewable Energy, Solar, Wind",
    subject: "Engineering",
    documentLink: "https://example.com/renewable-energy-journal-article",
    username: "olivia_turner",
    createdAt: new Date(),
  },
  {
    title: "Psychology and Behavior Journal",
    authors: "Jessica Lee, Daniel Kim",
    overview: "Research on human psychology and behavioral science.",
    issn: "9988-7766",
    keywords: "Psychology, Behavior, Mental Health",
    subject: "Psychology",
    documentLink: "https://example.com/psychology-behavior-journal-article",
    username: "jessica_lee",
    createdAt: new Date(),
  },
  {
    title: "Journal of Historical Studies",
    authors: "William Moore, Laura Hill",
    overview: "Explores significant events and trends in world history.",
    issn: "4455-6677",
    keywords: "History, Culture, Society",
    subject: "History",
    documentLink: "https://example.com/historical-studies-journal-article",
    username: "william_moore",
    createdAt: new Date(),
  },
  {
    title: "Journal of Advanced Robotics",
    authors: "Steven Wright, Angela Baker",
    overview: "Latest research in robotics and automation.",
    issn: "5566-3344",
    keywords: "Robotics, Automation, Engineering",
    subject: "Technology",
    documentLink: "https://example.com/advanced-robotics-journal-article",
    username: "steven_wright",
    createdAt: new Date(),
  },
];

// Function to populate journals in Firestore
const populateJournals = async () => {
  for (const journal of journals) {
    try {
      // Add each journal to the "journals" collection
      const docRef = db.collection("journals").doc(journal.username); // Use username as document ID

      await docRef.set({
        ...journal,
      });

      console.log(`Journal "${journal.title}" added successfully.`);
    } catch (error) {
      console.error(`Error adding journal "${journal.title}":`, error);
    }
  }
};

// Run the script to populate journals
populateJournals().then(() => {
  console.log("Populating journals complete!");
  process.exit(0);
});
