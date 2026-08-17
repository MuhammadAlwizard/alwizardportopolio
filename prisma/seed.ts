import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ---------- EDUCATION ----------
  await prisma.education.deleteMany();
  await prisma.education.create({
    data: {
      degree: "S1 Information Systems (Bachelor's Degree)",
      institution: "Universitas Komputer Indonesia (UNIKOM)",
      startYear: "2023",
      endYear: null,
      status: "ONGOING",
      description:
        "Relevant coursework: Data Mining, Web Programming, OOP, Database Administration, Animation & Multimedia, Information Systems Management.",
      sortOrder: 1,
    },
  });

  // ---------- SKILLS ----------
  await prisma.skill.deleteMany();
  const skillGroups: Record<string, string[]> = {
    "Software & Tools": [
      "Adobe Photoshop",
      "Canva",
      "CapCut",
      "Microsoft Office",
      "Blender",
      "Altair RapidMiner Studio",
    ],
    "Web Development": [
      "Node.js",
      "Express.js",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "REST API",
    ],
    "Business & Systems Analysis": [
      "Requirement Analysis",
      "SDLC",
      "ERD & Flowchart Design",
      "System Documentation",
      "UAT",
    ],
    "Analytical Skills": ["Data Mining", "Decision Tree", "Database Administration"],
    "Soft Skills": [
      "Content Strategy",
      "Social Media Management",
      "Teamwork",
      "Time Management",
    ],
  };
  let skillOrder = 0;
  for (const [category, names] of Object.entries(skillGroups)) {
    for (const name of names) {
      await prisma.skill.create({
        data: { category, name, sortOrder: skillOrder++ },
      });
    }
  }

  // ---------- EXPERIENCE ----------
  await prisma.experience.deleteMany();
  await prisma.experience.create({
    data: {
      company: "PT PLI",
      role: "CSR Volunteer / Intern",
      period: "Feb 2025 – Present",
      points: [
        "Analyzed CSR program requirements and translated them into visual and communication deliverables aligned with corporate objectives.",
        "Coordinated with cross-functional stakeholders to gather content requirements and ensure materials met program timelines.",
        "Organized and maintained a structured library of visual assets and content data to support consistent CSR reporting.",
      ].join("\n"),
      sortOrder: 1,
    },
  });
  await prisma.experience.create({
    data: {
      company: "Urtype Clothing Brand",
      role: "Admin & Content Designer",
      period: "Aug 2024 – Feb 2025",
      points: [
        "Managed end-to-end order administration — stock verification, order processing, and inventory updates — to maintain accurate operational data.",
        "Compiled and analyzed weekly sales recaps to identify best-selling products and inform brand decision-making.",
        "Coordinated between design, sales, and fulfillment functions to keep order data, content calendar, and stock levels aligned.",
        "Supported data-informed content planning that contributed to a 20% increase in social media engagement.",
      ].join("\n"),
      sortOrder: 2,
    },
  });
  await prisma.experience.create({
    data: {
      company: "Event Organizer Agency",
      role: "Media Specialist",
      period: "Aug 2024 – Feb 2025",
      points: [
        "Analyzed event and promotional requirements to plan content production schedules across multiple concurrent activities.",
        "Coordinated with event teams to ensure media output aligned with operational timelines and stakeholder requirements.",
        "Tracked publication and engagement data across platforms to evaluate content performance and inform improvements.",
      ].join("\n"),
      sortOrder: 3,
    },
  });

  // ---------- PROJECTS ----------
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();

  const dataMining = await prisma.project.create({
    data: {
      slug: "data-mining-decision-tree",
      title: "Data Mining — Decision Tree Credit Classification",
      category: "ACADEMIC",
      summary:
        "Klasifikasi kelayakan kredit menggunakan model Decision Tree di Altair RapidMiner Studio.",
      businessProblem:
        "Manual credit review makes it hard for lenders to assess applicant risk consistently, slowing down approval decisions.",
      description:
        "Performed data preprocessing and credit classification using Altair RapidMiner Studio. A Decision Tree model was applied to predict loan approval decisions based on credit history, income, and marital status of applicants. Workflow covered data preprocessing & feature selection, Decision Tree modeling, evaluation with Accuracy/Precision/Recall, and Confusion Matrix analysis.",
      stack: "Altair RapidMiner Studio",
      coverImage: "/images/proj-datamining-rapidminer.png",
      period: "2024",
      featured: true,
      sortOrder: 1,
      images: {
        create: [
          { url: "/images/proj-datamining-rapidminer.png", caption: "RapidMiner workflow", sortOrder: 1 },
          { url: "/images/proj-datamining-flow.png", caption: "Data mining project workflow", sortOrder: 2 },
        ],
      },
    },
  });

  const wedding = await prisma.project.create({
    data: {
      slug: "wedding-equipment-rental-system",
      title: "Wedding Equipment Rental & Reservation System",
      category: "ACADEMIC",
      summary:
        "Sistem reservasi berbasis web untuk vendor peralatan pernikahan, dibangun dengan pendekatan SDLC.",
      businessProblem:
        "Analyzed operational issues across three wedding equipment vendors: manual stock recording and frequent double bookings.",
      description:
        "Designed a web-based reservation system using the System Development Life Cycle (SDLC) approach — from user requirement analysis to database (ERD) and transaction flow (flowchart) design, then development with Node.js, Express.js, and MySQL. Validated with Black-Box Testing against user requirements.",
      result: "Reduced stock data input errors by up to 30%",
      stack: "Node.js,Express.js,MySQL,HTML,CSS,JavaScript",
      coverImage: "/images/proj-wedding-system.png",
      period: "2024",
      featured: true,
      sortOrder: 2,
      images: {
        create: [
          { url: "/images/proj-wedding-system.png", caption: "System overview", sortOrder: 1 },
          { url: "/images/proj-wedding-usecase.png", caption: "Use case diagram", sortOrder: 2 },
          { url: "/images/proj-wedding-erd.jpg", caption: "Database design (ERD)", sortOrder: 3 },
        ],
      },
    },
  });

  const blender = await prisma.project.create({
    data: {
      slug: "3d-modeling-blender",
      title: "3D Modeling & Blender Project",
      category: "ACADEMIC",
      summary:
        "Pipeline produksi aset 3D dari konsep hingga render final menggunakan Blender.",
      businessProblem:
        "Design and promotional work often needs original, project-ready visual assets rather than generic stock imagery.",
      description:
        "Built 3D assets from concept to completion in Blender for use as project-ready visual assets. The workflow covered the full modeling pipeline: base modeling, shape refinement, surface & material detailing, and lighting & rendering — combining technical 3D skills with a creative design eye.",
      stack: "Blender,Modeling,Texturing,Lighting,Rendering",
      coverImage: null,
      period: "2024",
      featured: false,
      sortOrder: 3,
      images: { create: [] },
    },
  });

  const urtype = await prisma.project.create({
    data: {
      slug: "urtype-product-design-sales",
      title: "Urtype — Product Design & Sales Administration",
      category: "WORK",
      summary:
        "Desain produk apparel dan pengelolaan administrasi penjualan untuk brand Urtype.",
      businessProblem: null,
      description:
        "Designed graphics for the Urtype apparel line, including logo/wordmark placement and typography choices to keep the brand identity consistent across every product. Also managed order data, stock levels, and daily sales transaction records; compiled sales recaps as the basis for brand administration reporting; coordinated the order process from confirmation through to shipment; and maintained consistent customer data and product catalog records.",
      stack: "Adobe Photoshop,Canva,Sales Administration",
      coverImage: "/images/proj-urtype-shirt.png",
      role: "Admin & Content Designer",
      period: "Aug 2024 – Feb 2025",
      featured: true,
      sortOrder: 4,
      images: {
        create: [
          { url: "/images/proj-urtype-shirt.png", caption: "Urtype brand T-shirt design", sortOrder: 1 },
          { url: "/images/proj-urtype-flow.png", caption: "Admin & content workflow", sortOrder: 2 },
        ],
      },
    },
  });

  // ---------- CERTIFICATES ----------
  await prisma.certificate.deleteMany();
  await prisma.certificate.createMany({
    data: [
      {
        title: "CCNA — Switching, Routing & Wireless Essentials (SRWE)",
        issuer: "Cisco Networking Academy",
        date: "August 2025",
        image: "/images/cert-netbasics.jpg",
        description: "Certificate of Course Completion",
        sortOrder: 1,
      },
      {
        title: "Networking Basics",
        issuer: "Cisco Networking Academy",
        date: null,
        image: "/images/cert-netbasics.jpg",
        description: "Fundamental networking concepts, protocols, and configuration.",
        sortOrder: 2,
      },
      {
        title: "Social Media Planning",
        issuer: "MySkill",
        date: null,
        image: "/images/cert-socmed.jpg",
        description: "Social strategy, content planning, and audience engagement.",
        sortOrder: 3,
      },
      {
        title: "Basic Node.js",
        issuer: "MySkill",
        date: null,
        image: "/images/cert-nodejs.jpg",
        description: "Basic Node.js and backend development fundamentals.",
        sortOrder: 4,
      },
      {
        title: "AI-Powered Performance Ads",
        issuer: "Google Skillshop",
        date: null,
        image: "/images/cert-googleads.png",
        description: "AI-driven advertising, campaign, and performance.",
        sortOrder: 5,
      },
      {
        title: "TOEFL Prediction Test — Score 587",
        issuer: "TOEFL",
        date: null,
        image: "/images/cert-toefl.png",
        description: "Listening 52 · Structure 61 · Reading 63",
        sortOrder: 6,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
