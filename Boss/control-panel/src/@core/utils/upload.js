const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "relaxationsingpaster123123123213pe");

  try {
    const response = await fetch("https://api.cloudinary.com/v1_1/dl5gttary/image/upload", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const responseData = await response.json();
    const { url } = responseData;

     return url;
     
  } catch (err) {
 
      console.log(err);

    return null; // Or any other action you want for error handling
  }
};

export default upload;
