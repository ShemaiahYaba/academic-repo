import React from "react";

interface ArticleCardProps {
  profileUrl: string;
  name: string;
  field: string;
  keywords: string[];
  highlight: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  profileUrl,
  name,
  field,
  keywords,
  highlight,
}) => (
  <div className="bg-white rounded-xl shadow-md flex flex-col justify-between p-6 min-h-[320px] transition-transform duration-300 hover:scale-105 hover:shadow-xl">
    {/* Profile */}
    <div className="flex items-center mb-4">
      <img
        src={profileUrl}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mr-4"
      />
      <div>
        <div className="font-semibold text-lg">{name}</div>
        <div className="text-sm text-gray-500">{field}</div>
      </div>
    </div>
    {/* Highlight */}
    <blockquote className="flex-1 text-gray-700 italic relative px-4 py-6 bg-gray-50 rounded-lg border-l-4 border-gray-300 mb-6">
      <span className="text-gray-400 mr-2">…</span>
      {highlight}
      <span className="text-gray-400 ml-2">…</span>
    </blockquote>
    {/* Footer */}
    <div className="flex flex-col gap-2 mb-4">
      <p className="text-sm text-gray-500 font-medium">Keywords:</p>
      <div className="flex flex-wrap gap-2">
        {keywords.map((kw) => (
          <span
            key={kw}
            className="bg-gray-200 text-xs text-gray-700 px-2 py-1 rounded"
          >
            {kw}
          </span>
        ))}
      </div>
    </div>
    <div className="flex justify-between">
      <button className="text-gray-500 text-sm font-medium hover:underline">
        More from this author
      </button>
      <button className="text-gray-500 text-sm font-medium hover:underline">
        Read more
      </button>
    </div>
  </div>
);

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const cardsData = [
  {
    profileUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Dr. Alex Johnson",
    field: "Quantum Computing",
    keywords: ["Qubits", "Entanglement", "Algorithms"],
    highlight:
      "Quantum computers leverage the principles of quantum mechanics to solve problems intractable for classical computers.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Prof. Emily Chen",
    field: "Machine Learning",
    keywords: ["Neural Networks", "AI", "Deep Learning"],
    highlight:
      "Deep learning models have revolutionized the field of artificial intelligence, enabling breakthroughs in vision and language.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/men/65.jpg",
    name: "Dr. Samuel Lee",
    field: "Bioinformatics",
    keywords: ["Genomics", "Data Analysis", "Proteomics"],
    highlight:
      "Bioinformatics integrates biology, computer science, and statistics to analyze and interpret biological data.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/men/68.jpg",
    name: "Dr. Samuel Lee",
    field: "Bioinformatics",
    keywords: ["Genomics", "Data Analysis", "Proteomics"],
    highlight:
      "Bioinformatics integrates biology, computer science, and statistics to analyze and interpret biological data.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/women/52.jpg",
    name: "Dr. Maria Gomez",
    field: "Astrophysics",
    keywords: ["Black Holes", "Cosmology", "Dark Matter"],
    highlight:
      "Astrophysics explores the mysteries of the universe, from the behavior of black holes to the origins of dark matter.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    name: "Prof. David Kim",
    field: "Robotics",
    keywords: ["Automation", "Sensors", "AI Integration"],
    highlight:
      "Modern robotics combines advanced sensors and artificial intelligence to create autonomous systems for diverse applications.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/women/36.jpg",
    name: "Dr. Priya Nair",
    field: "Environmental Science",
    keywords: ["Climate Change", "Sustainability", "Ecology"],
    highlight:
      "Environmental science seeks sustainable solutions to pressing ecological challenges, including climate change and biodiversity loss.",
  },
  {
    profileUrl: "https://randomuser.me/api/portraits/men/47.jpg",
    name: "Prof. Michael Brown",
    field: "Cognitive Neuroscience",
    keywords: ["Brain", "Memory", "Perception"],
    highlight:
      "Cognitive neuroscience unravels the mysteries of the human mind by studying how brain processes give rise to perception and memory.",
  },
];

const ArticleCards: React.FC = () => {
  const [cards, setCards] = React.useState<typeof cardsData>([]);

  React.useEffect(() => {
    setCards(shuffleArray(cardsData).slice(0, 3));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <ArticleCard key={idx} {...card} />
      ))}
    </div>
  );
};

export default ArticleCards;
