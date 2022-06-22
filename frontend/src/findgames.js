var fs = require("fs");
const { exit } = require("process");

let availableApps = {
  availableApps: [],
};

fs.readdirSync("../public/games").forEach(function (file) {
  if (file.indexOf(".gitignore") > -1) return;
  availableApps.availableApps.push({
    class: "swf",
    title: file,
    icon: "/games/" + file + "/icon.png",
  });
});

console.log(availableApps);

fs.readFile("./app/available.json", "utf8", (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
    exit();
  } else {
    const apps = JSON.parse(data);
    apps.availableApps.forEach((x) => {
      availableApps.availableApps.push(x);
    });

    fs.writeFile(
      "./app/available_generated.json",
      JSON.stringify(availableApps),
      "utf8",
      (err) => {
        if (err) {
          console.log(`Error writing file: ${err}`);
        } else {
          console.log(`File is written successfully!`);
        }
      }
    );
  }
});
