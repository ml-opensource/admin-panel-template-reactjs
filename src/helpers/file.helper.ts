import { delay } from "./util.helper";

/**
 * Function to download a file.
 *
 * Adds `a` html element with link to file,
 * and triggers a click to download the file,
 * and finally removes the element from the DOM
 * @param url Path to the file
 * @param filename Name of the file
 */
export const download = async (url: string, filename: string) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = url;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();

  // Chrome requires the timeout
  await delay(100);
  document.body.removeChild(link);
};

/**
 * Function to initiate download of multiple files
 * @param files Array of path to files
 */
export const downloadMultipleFiles = (files: string[]) => {
  files.forEach(async (file, index) => {
    const filename = file.substring(file.lastIndexOf("/") + 1);
    await delay(index * 1000);
    download(file, filename);
  });
};

/**
 * Convert blob file to csv file, and initiates a download of the file
 * @param blobData Data from api
 * @param fileName Name of file
 */
export const processBlobToCSV = (blobData: string, fileName: string) => {
  const contentType = "text/csv";
  const blob = new Blob([blobData], { type: contentType });
  const url = window.URL.createObjectURL(blob);
  const filename = `${fileName}.csv`;
  download(url, filename);
};
