const fs = require("fs");
const path = require("path");

const sPath = "../snippets";
const dPath = "../";

const snippetsFolder = path.join(__dirname, sPath);
const docsFolder = path.join(__dirname, dPath);

const files = fs.readdirSync(snippetsFolder);
type Snippet = {
  prefix: string;
  description: string;
  body: string;
};

let markDown = "";
files.map((f) => {
  const file = `${snippetsFolder}/${f}`;
  const json = JSON.parse(fs.readFileSync(file));
  const keys = Object.keys(json);
  let data = "";
  keys.map((key) => {
    const field: Snippet = json[key];
    data += `|\`${field.prefix}\`|${field.description} | \n`;
  });

  markDown += createDoc(getFileName(f), data);
});

writeFile(markDown);

function getFileName(file) {
  return file.substring(0, file.indexOf("."));
}

function createDoc(fname: string, data: string) {
  const markedText = `## ${fname} snippets

| Syntax      | Description |
| ----------- | ----------- |
${data}  \n\n <hr />  \n\n`;

  // const to = `${docsFolder}/${fname}.md`;

  // fs.writeFileSync(to, markedText);
  return markedText;
}
function writeFile(data) {
  const to = `${docsFolder}/README.md`;
  data =
    `# xPro-Snippets
## Typescript, Vue, Nuxt, React, Next, Angular, Nest, Express, Java, Spring, SpringBoot snippets (all in one power pack)

### Also covers Vue3, Nuxt3  \n\n <hr />  \n\n` + data;

  fs.writeFileSync(to, data);
}

// for (const file of files) {
//   // var jsonFile = JSON.parse(fs.readFileSync(file., "utf8"));
//   // console.log(jsonFile);
//   if (file.endsWith(".json")) {
//     console.log();
//   }
// }
