const fs = require("fs");
const path = require("path");

const scriptFolderPath = path.dirname(__filename);
const folderPath = path.join(scriptFolderPath, "languages");
console.log(`folderPath: ${folderPath}`);

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.log(`Failed to read content ----> ${err}`);
    return;
  }

  files.forEach((file) => {
    const baseName = path.basename(file);
    const firstWord = baseName.split("-")[0];
    const subfolderPath = path.join(folderPath, firstWord);

    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath);
    }

    const sourceFilePath = path.join(folderPath, baseName);
    const destinationFilePath = path.join(subfolderPath, baseName);
    fs.rename(sourceFilePath, destinationFilePath, (err) => {
      if (err) {
        console.error(`Failed to move the file: ${err}`);
      } else {
        console.log(
          `moving the file ${baseName} to subfolder ${firstWord} ...`
        );
      }
    });
  });
});
