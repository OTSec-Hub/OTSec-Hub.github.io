// src/data/datasets.js
const datasets = [
  {
    id: "dataset:001",
    title: "ICS Dataset",
    description: "e.g.: A benchmark dataset for industrial control systems.",
    link: "/benchmarks/ics-bench-001"
  },
  {
    id: "dataset:002",
    title: "IoT Dataset",
    description: "Dataset for evaluating IoT security.",
    link: "/benchmarks/iot-bench-002"
  },
  {
    id: "dataset:003",
    title: "Dataset 3",
    description: "Dataset 3 for ...",
    link: "/benchmarks/dataset3-bench-003"
  }
  // add more as needed
];

export default datasets;




/*only fetches dataset information from a GitHub-hosted JSON file, without falling back to any hardcoded local array:*/

// dataset.jsx
// const GITHUB_DATA_URL =
//   "https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/data/datasets.json";

// export async function getDatasets() {
//   try {
//     const response = await fetch(GITHUB_DATA_URL);
//     if (!response.ok) throw new Error("Network response was not ok");
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch datasets from GitHub:", error);
//     return []; // return empty array if fetch fails
//   }
// }



//or 



/*
const GITHUB_API_URL =
  "https://api.github.com/repos/YourUsername/YourRepo/contents/data";

export async function getDatasets() {
  try {
    // Step 1: List all files in the `/data` folder
    const listRes = await fetch(GITHUB_API_URL);
    if (!listRes.ok) throw new Error("Failed to fetch dataset list");
    const files = await listRes.json();

    // Step 2: For each file, fetch its raw content
    const datasetPromises = files.map(async (file) => {
      const contentRes = await fetch(file.download_url);
      const rawContent = await contentRes.text();

      // You can optionally parse markdown frontmatter or format plain text here.
      return {
        id: file.name,
        title: file.name.replace(".md", ""),
        description: rawContent.substring(0, 200) + "...", // preview
        link: file.html_url, // or build a custom link
      };
    });

    return Promise.all(datasetPromises);
  } catch (err) {
    console.error("Error fetching datasets:", err);
    return [];
  }
}
*/
