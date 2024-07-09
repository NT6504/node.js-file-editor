const fs = require('fs'); 

// Function to handle errors
function handleError(err) {
  if (err) {
    console.error('Error:', err.message);
    process.exit(1); 
  }
}

const operation = process.argv[2];
const file = process.argv[3];
const content = process.argv[4]; 


if (!operation || !file) {
  console.error('Usage: node index.js <operation> <file> [content]');
  process.exit(1);
}


switch (operation) {
  case 'read':
    fs.readFile(file, 'utf8', (err, data) => handleError(err) || console.log(data)); 
    break;

  case 'delete':
    fs.unlink(file, handleError); // Delete the file 
    console.log(`File '${file}' deleted`);
    break;

  case 'create':
    fs.writeFile(file, '', handleError); // Create a file
    console.log(`File '${file}' created`);
    break;

  case 'append':
    if (!content) {
      console.error('Error: Content required for append operation.');
      process.exit(1);
    }
    fs.appendFile(file, content + '\n', 'utf8', handleError); // Append content with a newline
    console.log(`Content appended to file '${file}'`);
    break;

  case 'rename':
    const newName = process.argv[4]; // Get the new name 
    if (!newName) {
      console.error('Error: New name required for rename operation.');
      process.exit(1);
    }
    fs.rename(file, newName, handleError); // Rename the file 
    console.log(`File '${file}' renamed to '${newName}'`);
    break;

  case 'list':
    fs.readdir('.', (err, files) => {
      if (err) {
        handleError(err);
      } else {
        console.log(files.join('\n')); 
      }
    });
    break;

  default:
    console.error(`Invalid operation: '${operation}'`);
}
