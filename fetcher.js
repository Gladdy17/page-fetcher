const needle = require('needle');
const fs = require('fs');

// Capture command line arguments for URL and local file path
const url = process.argv[2];
const filePath = process.argv[3];

if (!url || !filePath) {
  console.error('Please provide a URL and a file path.');
  process.exit(1);
}

// Make the HTTP request using needle
needle.get(url, (err, response) => {
  if (err) {
    console.error('Error fetching URL:', err);
    process.exit(1);
  }

  // Check if the request was successful
  if (response.statusCode !== 200) {
    console.error(`Failed to download. HTTP Status Code: ${response.statusCode}`);
    process.exit(1);
  }

  // Write the data to the specified file path
  fs.writeFile(filePath, response.body, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      process.exit(1);
    }

    // Calculate file size and print success message
    const fileSize = Buffer.byteLength(response.body);
    console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
  });
});

