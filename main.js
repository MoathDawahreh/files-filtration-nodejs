const fs = require("fs").promises;
const path = require("path");

async function moveFilesToSubfolders() {
  const scriptFolderPath = path.dirname(__filename);
  const folderPath = path.join(scriptFolderPath, "files");
  console.log(`folderPath: ${folderPath}`);

  try {
    console.time("Execution Time");
    const files = await fs.readdir(folderPath);
    const fileGroups = {};

    for (const file of files) {
      const baseName = path.basename(file);
      const firstWord = baseName.split("-")[0];
      const subfolderPath = path.join(folderPath, firstWord);

      if (!fileGroups[firstWord]) {
        fileGroups[firstWord] = [];
        await fs.mkdir(subfolderPath).catch((err) => {
          console.error(`Failed to create subfolder ${firstWord}: ${err}`);
        });
      }

      const sourceFilePath = path.join(folderPath, baseName);
      const destinationFilePath = path.join(subfolderPath, baseName);
      await fs.rename(sourceFilePath, destinationFilePath).catch((err) => {
        console.error(`Failed to move the file ${baseName}: ${err}`);
      });

      fileGroups[firstWord].push(baseName);
    }

    console.log("Files moved successfully.");

    // Log the number of files in each subfolder
    for (const [firstWord, files] of Object.entries(fileGroups)) {
      console.log(`Subfolder ${firstWord}: ${files.length} files`);
    }

    console.timeEnd("Execution Time");
  } catch (err) {
    console.log(`Failed to read content: ${err}`);
  }
}

moveFilesToSubfolders();
