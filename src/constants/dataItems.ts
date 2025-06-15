// src/constants/menuItems.ts
import {
  about,
  journals,
  articles,
  settings,
  support,
  logout,
  post,
  home,
  add,
  notify,
  profile,
  uploadBook,
  searchBook,
  cardImage1,
  cardImage2,
  cardImage3,
  cardImage4,
  cardImage5,
  cardImage6,
  cardImage7,
  cardImage8,
  like,
  word,
  share,
} from "./images";

export const primaryMenu = [
  { label: "Home", href: "/", icon: home },
  { label: "Journals", href: "/journals", icon: journals },
  { label: "Articles", href: "/articles", icon: articles },
  { label: "Posts", href: "/post", icon: post },
  { label: "About", href: "/about", icon: about },
  { label: "Editorial Team", href: "/editorialteam", icon: about },
];

export const secondaryMenu = [
  { label: "Settings", href: "#", icon: settings },
  { label: "Support", href: "/support", icon: support },
  { label: "Logout", href: "/Login", icon: logout },
];

export const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Journals", href: "/journals" },
      { label: "Articles", href: "/articles" },
      { label: "Posts", href: "/post" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "About Repository", href: "#" },
      { label: "Mission", href: "#" },
      { label: "History", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Get Support", href: "/support" },
      { label: "Get Access", href: "#" },
      { label: "Research Basics", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
  {
    title: "Terms and Conditions",
    links: [
      { label: "Terms of Use", href: "#" },
      { label: "Privacy Policies", href: "#" },
      { label: "Accessibility", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

export const socialLinks = [
  {
    name: "Facebook",
    icon: "M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z",
    href: "#",
  },
  {
    name: "Discord",
    icon: "M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z",
    href: "#",
  },
  {
    name: "Twitter",
    icon: "M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z",
    href: "#",
  },
  {
    name: "GitHub",
    icon: "M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z",
    href: "#",
  },
  {
    name: "Dribbble",
    icon: "M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z",
    href: "#",
  },
];

export const navbarLinks = [
  { label: "add", href: "upload-journal", icon: add },
  { label: "notification", href: "/notifications", icon: notify },
  { label: "profile", href: "/profile", icon: profile },
];

export const info = [
  {
    id: 1,
    label: "Search Thousands of Books",
    icon: searchBook,
    paragraph:
      "Search through a vast collection of books, offering a wide range of topics and resources for research and study.",
  },
  {
    id: 2,
    label: "Upload your Books",
    icon: uploadBook,
    paragraph:
      "Easily upload your books to share with others, contributing to a growing collection of valuable resources.",
  },
  {
    id: 3,
    label: "Access to the Lastest Books ",
    icon: searchBook,
    paragraph:
      "Stay up to date with the latest books, offering fresh insights and valuable knowledge across various fields.",
  },
];

export const publicationCard = [
  {
    id: 1,
    label: "The Biblical Worldview: A springboard for cultural reform",
    icon: cardImage4,
  },
  {
    id: 2,
    label:
      "Comparison of Dual Therapies for Lowering Blood Pressure in Black Africans",
    icon: cardImage5,
  },
  {
    id: 3,
    label:
      "Use of Maize Cob-Activated Charcoal for Wastewater Treatment in Aquaculture for Reuse",
    icon: cardImage6,
  },
  {
    id: 4,
    label: "Artificial Intelligence in Healthcare: Ethical Implications and Future Directions",
    icon: cardImage7,
  },
  {
    id: 5,
    label: "Sustainable Urban Development: Integrating Green Spaces in Modern Cities",
    icon: cardImage8,
  },
  {
    id: 6,
    label: "The Impact of Climate Change on Agricultural Productivity in Sub-Saharan Africa",
    icon: cardImage1,
  },
  {
    id: 7,
    label: "Digital Transformation in Education: Challenges and Opportunities",
    icon: cardImage2,
  },
  {
    id: 8,
    label: "Renewable Energy Technologies: A Comparative Analysis of Solar and Wind Power",
    icon: cardImage3,
  },
  {
    id: 9,
    label: "Mental Health in the Digital Age: Social Media's Impact on Adolescent Well-being",
    icon: cardImage4,
  },
  {
    id: 10,
    label: "Blockchain Technology in Supply Chain Management: A Systematic Review",
    icon: cardImage5,
  }
];

export const publicationOptions = [
  { id: 1, icon: word },
  { id: 2, icon: share },
  { id: 3, icon: like },
];

export const journalData = [
  {
    title: "Effect of Biodiesel from Agriculture as an alternate source of Energy",
    authors: "Micheal Brook, David James, Edward Parker",
    keywords: "Biodiesel, Energy, Agriculture",
    ratings: "87%",
    reviews: 215,
    abstract: "This comprehensive study examines the viability of agricultural biodiesel as an alternative energy source. Through extensive research and experimentation, we analyze the production efficiency, environmental impact, and economic feasibility of biodiesel derived from various agricultural sources. Our findings indicate significant potential for reducing carbon emissions while maintaining energy output comparable to traditional fossil fuels. The study also addresses key challenges in production scalability and proposes innovative solutions for widespread implementation."
  },
  {
    title: "Quantum Computing Applications in Drug Discovery",
    authors: "Sarah Chen, Robert Martinez, Aisha Patel",
    keywords: "Quantum Computing, Pharmaceuticals, Computational Chemistry",
    ratings: "92%",
    reviews: 178,
    abstract: "This groundbreaking research explores the application of quantum computing in accelerating drug discovery processes. By leveraging quantum algorithms, we demonstrate a 300% increase in molecular simulation speed compared to classical computing methods. The study presents a novel framework for protein-ligand interaction prediction and drug efficacy analysis, potentially revolutionizing the pharmaceutical industry's approach to drug development. Our results show promising applications in targeting complex diseases and reducing drug development timelines."
  },
  {
    title: "Machine Learning Approaches in Climate Change Prediction",
    authors: "James Wilson, Maria Rodriguez, Thomas Kim",
    keywords: "Machine Learning, Climate Science, Data Analysis",
    ratings: "89%",
    reviews: 245,
    abstract: "This study introduces an innovative machine learning framework for climate change prediction, utilizing historical data and real-time environmental monitoring. Our model achieves 94% accuracy in predicting temperature variations and extreme weather events up to 12 months in advance. The research incorporates multiple data sources, including satellite imagery, ocean temperature readings, and atmospheric measurements, providing a comprehensive approach to climate modeling. The findings have significant implications for climate policy and disaster preparedness."
  },
  {
    title: "Neural Mechanisms of Memory Formation in Drosophila",
    authors: "Emily Zhang, William Thompson, Lisa Anderson",
    keywords: "Neuroscience, Genetics, Memory",
    ratings: "85%",
    reviews: 156,
    abstract: "This research investigates the neural pathways involved in memory formation in Drosophila melanogaster, offering insights into fundamental memory processes. Using advanced imaging techniques and genetic manipulation, we identify specific neural circuits responsible for short-term and long-term memory formation. The study reveals novel mechanisms of synaptic plasticity and provides a foundation for understanding memory disorders in humans. Our findings contribute to the broader understanding of neural plasticity and memory consolidation across species."
  },
  {
    title: "Sustainable Urban Development: A Case Study of Smart Cities",
    authors: "David Kumar, Sophia Lee, Carlos Mendez",
    keywords: "Urban Planning, Sustainability, Smart Technology",
    ratings: "91%",
    reviews: 203,
    abstract: "This comprehensive analysis examines the implementation of smart city technologies in urban development, focusing on sustainability and quality of life improvements. Through case studies of five major cities, we evaluate the effectiveness of IoT integration, renewable energy systems, and smart transportation networks. The research identifies key success factors and challenges in sustainable urban development, providing a framework for future smart city initiatives. Our findings demonstrate significant improvements in resource efficiency and citizen satisfaction."
  },
  {
    title: "CRISPR-Cas9 Applications in Agricultural Biotechnology",
    authors: "Rachel Green, Michael Brown, Yuki Tanaka",
    keywords: "Genetics, Agriculture, Biotechnology",
    ratings: "94%",
    reviews: 267,
    abstract: "This study explores the revolutionary applications of CRISPR-Cas9 technology in agricultural biotechnology. We present successful case studies of crop modification for enhanced yield, disease resistance, and nutritional content. The research addresses ethical considerations and regulatory frameworks while demonstrating the technology's potential to address global food security challenges. Our findings show a 40% increase in crop yield and 60% reduction in pesticide use in modified crops."
  },
  {
    title: "Artificial Intelligence in Medical Imaging: Current Trends",
    authors: "Alex Johnson, Priya Sharma, Marcus White",
    keywords: "AI, Medical Imaging, Healthcare",
    ratings: "88%",
    reviews: 189,
    abstract: "This comprehensive review examines the current state and future potential of artificial intelligence in medical imaging. We analyze the implementation of deep learning algorithms in various imaging modalities, including MRI, CT, and X-ray. The study demonstrates a 25% improvement in diagnostic accuracy and 40% reduction in analysis time. Our research highlights the challenges of AI integration in healthcare and proposes solutions for widespread adoption."
  },
  {
    title: "Ocean Acidification and Coral Reef Ecosystems",
    authors: "Emma Wilson, Juan Carlos, Mei Lin",
    keywords: "Marine Biology, Climate Change, Ecology",
    ratings: "86%",
    reviews: 174,
    abstract: "This critical study investigates the impact of ocean acidification on coral reef ecosystems across the Pacific Ocean. Through extensive field research and laboratory experiments, we document the physiological and ecological responses of coral species to changing pH levels. The findings reveal a 30% decline in coral calcification rates and significant changes in reef biodiversity. Our research provides crucial data for conservation efforts and climate change mitigation strategies."
  },
  {
    title: "Nanotechnology in Renewable Energy Storage",
    authors: "Daniel Park, Sarah O'Connor, Raj Patel",
    keywords: "Nanotechnology, Energy Storage, Materials Science",
    ratings: "90%",
    reviews: 198,
    abstract: "This innovative research explores the application of nanotechnology in improving renewable energy storage systems. We present a novel approach to battery technology using nanostructured materials, achieving a 200% increase in energy density and 50% reduction in charging time. The study examines the scalability and economic feasibility of these technologies, with promising implications for electric vehicles and grid storage systems."
  },
  {
    title: "Social Media Impact on Scientific Communication",
    authors: "Olivia Martinez, James Wilson, Aisha Khan",
    keywords: "Science Communication, Social Media, Public Engagement",
    ratings: "83%",
    reviews: 145,
    abstract: "This study analyzes the evolving role of social media in scientific communication and public engagement. Through a comprehensive survey of 10,000 scientists and analysis of 1 million social media interactions, we examine the effectiveness of different platforms in disseminating scientific information. The research reveals significant improvements in public understanding of complex scientific concepts and increased engagement with scientific content. Our findings provide valuable insights for science communication strategies in the digital age."
  }
].map((journal, index) => ({
  ...journal,
  id: index + 1,
}));
