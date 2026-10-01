const founders = [
  {
    _id: "founder-1",
    name: "Jyoti Judal",
    title: "Co-Founder & Creative Lead",
    role: "Co-Founder & Creative Lead",
    bio: "Passionate about crafting intuitive user experiences, elegant design systems, and modern web applications.",
    photo: "/images/jyoti.jpg",
    image: "/images/jyoti.jpg",
    email: "jyotijudal2006@gmail.com",
    phone: "9327663975",
    portfolio: "https://jyoti-s-portfolio.vercel.app/",
    skills: ["UI/UX Design", "Creative Direction", "Frontend Dev", "Brand Strategy"],
    socials: {
      linkedin: "https://www.linkedin.com/in/jyoti-judal-a42600334?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "jyotijudal2006@gmail.com",
      phone: "9327663975",
      portfolio: "https://jyoti-s-portfolio.vercel.app/"   
    },
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/jyoti-judal-a42600334?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "jyotijudal2006@gmail.com",
      phone: "9327663975",
      portfolio: "https://jyoti-s-portfolio.vercel.app/"
    },
    featuredOrder: 1
  },
  {
    _id: "founder-2",
    name: "Hina Patel",
    title: "Co-Founder & Tech Lead",
    role: "Co-Founder & Tech Lead",
    bio: "Specializes in robust web architecture, high-performance backends, clean code, and full-stack solutions.",
    photo: "/images/hina.png",
    image: "/images/hina.png",
    email: "chaudharyhetvi158@gmail.com",
    phone: "9313016851",
    portfolio: "",
    skills: ["Full-Stack Architecture", "Web Engineering", "Database Systems", "API Integration"],
    socials: {
      linkedin: "https://www.linkedin.com/in/hina-patel-1760343b5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "chaudharyhetvi158@gmail.com",
      phone: "9313016851"
    },
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/hina-patel-1760343b5?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "chaudharyhetvi158@gmail.com",
      phone: "9313016851"
    },
    featuredOrder: 2
  }
];

const projects = [
  {
    _id: "proj-1",
    title: "Aetheria Architecture Platform",
    description: "Immersive 3D portfolio & web application for a premier luxury architecture studio featuring WebGL showcases and interactive project tours.",
    detailedDescription: "Designed and built end-to-end with dynamic portfolio galleries, spatial layout visualizations, fast-loading media assets, and a bespoke CMS dashboard.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    technologies: ["React", "Three.js", "Tailwind CSS", "Node.js", "MongoDB"],
    category: "Websites",
    liveUrl: "https://example.com/aetheria",
    githubUrl: "https://github.com/example/aetheria",
    featured: true,
    completionDate: "2024"
  },
  {
    _id: "proj-2",
    title: "Kroma Creative Dashboard",
    description: "Next-gen analytics and asset management UI/UX designed for digital artists and content creators.",
    detailedDescription: "Features real-time collaboration widgets, asset version history, intuitive drag-and-drop file organization, and high-contrast dark mode design.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    technologies: ["React", "Framer Motion", "Express API", "Tailwind CSS"],
    category: "UI/UX",
    liveUrl: "https://example.com/kroma",
    githubUrl: "https://github.com/example/kroma",
    featured: true,
    completionDate: "2024"
  },
  {
    _id: "proj-3",
    title: "Verve Audio Lab",
    description: "Interactive promotional web experience and web shop for a high-end audiophile headphone manufacturer.",
    detailedDescription: "Interactive frequency visualizers, sound customizer UI, seamless checkout flow, and custom dynamic audio showcase components.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1000",
    technologies: ["Vite", "Web Audio API", "Node.js", "Tailwind CSS"],
    category: "Creative",
    liveUrl: "https://example.com/verve",
    githubUrl: "https://github.com/example/verve",
    featured: true,
    completionDate: "2024"
  },
  {
    _id: "proj-4",
    title: "Nova Financial Engine",
    description: "Sleek, high-converting fintech landing page and interactive investment calculator portal.",
    detailedDescription: "Custom interactive charts, real-time ROI calculator, bank-grade encryption indicators, and frictionless user onboarding UI.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000",
    technologies: ["React", "Recharts", "Express.js", "MongoDB"],
    category: "Custom Solutions",
    liveUrl: "https://example.com/nova",
    githubUrl: "https://github.com/example/nova",
    featured: false,
    completionDate: "2023"
  },
  {
    _id: "proj-5",
    title: "Lumina Organic Skincare",
    description: "E-commerce flagship store with storytelling layout, customer reviews engine, and custom product customizer.",
    detailedDescription: "Sensory-focused web design with silky smooth product view transitions, customer review filter engine, and cart state optimization.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1000",
    technologies: ["React", "Tailwind CSS", "Node.js", "REST API"],
    category: "Websites",
    liveUrl: "https://example.com/lumina",
    githubUrl: "https://github.com/example/lumina",
    featured: true,
    completionDate: "2024"
  },
  {
    _id: "proj-6",
    title: "Pulse SaaS Application",
    description: "Comprehensive task management and team sync web application built for remote software engineering teams.",
    detailedDescription: "Real-time updates, custom Kanban boards, task time tracking, and customizable notification preference matrices.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    technologies: ["React", "Redux Toolkit", "Express.js", "MongoDB"],
    category: "Custom Solutions",
    liveUrl: "https://example.com/pulse",
    githubUrl: "https://github.com/example/pulse",
    featured: false,
    completionDate: "2024"
  }
];

const reviews = [
  {
    _id: "rev-1",
    clientName: "Marcus Vance",
    company: "Aetheria Arch Studios",
    role: "Creative Director",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    review: "Alex and Liam took our vague vision and turned it into an award-worthy website. Their attention to subtle micro-interactions and performance is unmatched.",
    rating: 5,
    projectName: "Aetheria Platform",
    isDemo: true
  },
  {
    _id: "rev-2",
    clientName: "Elena Rostova",
    company: "Lumina Labs",
    role: "VP of Brand Strategy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    review: "Working with two founders directly meant rapid communication, clear deadlines, and incredible technical capability. Our online sales increased by 140% post-launch!",
    rating: 5,
    projectName: "Lumina Skincare",
    isDemo: true
  },
  {
    _id: "rev-3",
    clientName: "David Sterling",
    company: "Kroma Visuals",
    role: "Founder & CEO",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    review: "The UI/UX design they delivered exceeded all expectations. Crisp, ultra-fast loading, and perfectly aligned with our brand identity.",
    rating: 5,
    projectName: "Kroma Dashboard",
    isDemo: true
  }
];

module.exports = {
  founders,
  projects,
  reviews
};
