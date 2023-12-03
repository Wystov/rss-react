export const convertToBase64 = (file: File) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  return new Promise((resolve) => {
    fileReader.onloadend = (e) => {
      resolve(e.target?.result);
    };
  });
};
