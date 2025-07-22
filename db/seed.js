import db from "./client.js";

const departmentsData = [
  {
    department: "BioChem",
    banner_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/biochem.webp",
    description: "Biochemical sciences",
  },
  {
    department: "Engineering",
    banner_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/engineering.jpg",
    description: "Innovating tech and suits",
  },
  {
    department: "AstroPhysics",
    banner_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/astrophysics.jpg",
    description: "Space, time, and dimensions",
  },
  {
    department: "Admin",
    banner_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/admin.webp",
    description: "University operations and leadership",
  },
  {
    department: "Athletic",
    banner_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/athletic.png",
    description: "Physical performance and combat",
  },
];


const professorsData = [
  {
    name: "Bruce Banner",
    email: "Hulk@marvelu.edu",
    date_of_hire: "2000-02-19",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/hulk.avif",
    department: "BioChem",
  },
  {
    name: "Peter Parker",
    email: "PeterParker@marvelu.edu",
    date_of_hire: "2015-12-10",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/peterparker.jpg",
    department: "BioChem",
  },
  {
    name: "Deadpool",
    email: "Deadpool@marvelu.edu",
    date_of_hire: "2011-02-02",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/deadpool.jpg",
    department: "BioChem",
  },
  {
    name: "Reed Richards",
    email: "ReedRichards@marvelu.edu",
    date_of_hire: "2019-08-19",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/reedrichards.webp",
    department: "BioChem",
  },
  {
    name: "Tony Stark",
    email: "TonyStark@marvelu.edu",
    date_of_hire: "2004-04-04",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/tonystark.webp",
    department: "Engineering",
  },
  {
    name: "Shuri",
    email: "Shuri@marvelu.edu",
    date_of_hire: "2018-06-01",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/shuri.webp",
    department: "Engineering",
  },
  {
    name: "Ant Man",
    email: "AntMan@marvelu.edu",
    date_of_hire: "2011-11-10",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/antman.avif",
    department: "Engineering",
  },
  {
    name: "Thor",
    email: "Thor@marvelu.edu",
    date_of_hire: "2012-01-10",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/thor.webp",
    department: "AstroPhysics",
  },
  {
    name: "Dr. Strange",
    email: "DrStrange@marvelu.edu",
    date_of_hire: "2017-12-14",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/drstrange.avif",
    department: "AstroPhysics",
  },
  {
    name: "Silver Surfer",
    email: "SilverSurfer@marvelu.edu",
    date_of_hire: "2015-08-17",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/Silver_Surfer.webp",
    department: "AstroPhysics",
  },
  {
    name: "Captain America",
    email: "CaptainAmerica@marvelu.edu",
    date_of_hire: "2016-10-01",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/captain.webp",
    department: "Admin",
  },
  {
    name: "Black Widow",
    email: "BlackWidow@marvelu.edu",
    date_of_hire: "2001-03-09",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/blackwidow.jpeg",
    department: "Admin",
  },
  {
    name: "Hawk Eye",
    email: "HawkEye@marvelu.edu",
    date_of_hire: "2000-09-27",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/hawkeye.jpeg",
    department: "Admin",
  },
  {
    name: "Thanos",
    email: "Thanos@marvelu.edu",
    date_of_hire: "2003-09-11",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/thanos.jpeg",
    department: "Athletic",
  },
  {
    name: "Task Master",
    email: "TaskMaster@marvelu.edu",
    date_of_hire: "2009-08-21",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/taskmaster.jpeg",
    department: "Athletic",
  },
  {
    name: "Venom",
    email: "Venom@marvelu.edu",
    date_of_hire: "2005-12-25",
    profile_image_url: "https://raw.githubusercontent.com/akoch247/MarvelU-FrontEnd/refs/heads/main/public/venom.png",
    department: "Athletic",
  },
];

async function seed() {
  try {
    await db.query("DELETE FROM professors;");
    await db.query("DELETE FROM departments;");

    // Insert departments, keep a map of name to id
    const deptNameToId = {};
    for (const dept of departmentsData) {
      const { rows } = await db.query(
        `INSERT INTO departments (department, banner_image_url, description)
         VALUES ($1, $2, $3) RETURNING id`,
        [dept.department, dept.banner_image_url, dept.description]
      );
      deptNameToId[dept.department] = rows[0].id;
    }

    // Insert professors, link department_id by name lookup
    for (const prof of professorsData) {
      const department_id = deptNameToId[prof.department];
      await db.query(
        `INSERT INTO professors (name, email, date_of_hire, profile_image_url, department_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [prof.name, prof.email, prof.date_of_hire, prof.profile_image_url, department_id]
      );
    }

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    db.end();
  }
}

seed();