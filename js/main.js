import { v2 as cloudinary } from "cloudinary";

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: "dzczqfs82",
    api_key: "623481843129718",
    api_secret: "5WFWjuaicgAy9Qt40fVjNbbXajI", // Click 'View API Keys' above to copy your API secret
  });

  const picname = "05_zogpmu";

  const optimizetion = cloudinary.image(picname, {
    transformation: [
      { width: 6144 },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });

  console.log(optimizetion);
})();
