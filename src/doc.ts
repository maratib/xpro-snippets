const fs = require("fs");
const path = require("path");

const sPath = "../snippets";
const dPath = "../docs";

const snippetsFolder = path.join(__dirname, sPath);
const docsFolder = path.join(__dirname, dPath);

const files = fs.readdirSync(snippetsFolder);
type Snippet = {
  prefix: string;
  description: string;
  body: string;
};

files.map((f) => {
  const file = `${snippetsFolder}/${f}`;
  const json = JSON.parse(fs.readFileSync(file));
  const keys = Object.keys(json);
  let data = "";
  keys.map((key) => {
    const field: Snippet = json[key];
    data += `|\`${field.prefix}\`|${field.description} | \n`;
  });

  writeFile(getFileName(f), data);
});

function getFileName(file) {
  return file.substring(0, file.indexOf("."));
}

function writeFile(fname: string, data: string) {
  const markedText = `[Back](../README.md)  
# ${fname} snippets

| Syntax      | Description |
| ----------- | ----------- |
${data}`;

  const to = `${docsFolder}/${fname}.md`;

  fs.writeFileSync(to, markedText);
}
// for (const file of files) {
//   // var jsonFile = JSON.parse(fs.readFileSync(file., "utf8"));
//   // console.log(jsonFile);
//   if (file.endsWith(".json")) {
//     console.log();
//   }
// }
