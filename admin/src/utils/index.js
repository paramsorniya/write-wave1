
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";

  import app from './firebase'; 
  // export const API_URL = "http://localhost:8800";
  export const API_URL = "https://write-wave1.onrender.com";
// export const uploadFile = (setFileURL, file) => {
//     const storage = getStorage(app);

//     const name = new Date().getTime() + file.name
//     const storageRef = ref(storage, name)

//     const uploadTask = uploadBytesResumable(storageRef, File);

    
//  uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log("Upload is " + progress + "% done");

//       switch (snapshot.state) {
//         case "paused":
//           console.log("Upload is paused");
//           break;
//         case "running":
//           console.log("Upload is running");
//           break;
//       }
//     },
//     (error) => {
//       console.log(error);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//         console.log("Successfully uploaded");
//         setFileURL(downloadURL);
//       });
//     }
//   );
// };
export const uploadFile = (setFileURL, file, setLoading) => {
  const storage = getStorage(app);

  const name = new Date().getTime() + file.name;  // Generate a unique name for the file
  const storageRef = ref(storage, name);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
      setLoading(false);  // Stop loading if there's an error
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("Successfully uploaded");
        setFileURL(downloadURL);
        setLoading(false);  // Stop loading after upload finishes
      });
    }
  );
};

// export const uploadFile1 = (setFileURL, file) => {
//   const storage = getStorage(app);

//   const name = new Date().getTime() + file.name;  // Generate a unique name for the file
//   const storageRef = ref(storage, name);

//   // Pass the correct file object (file) instead of File
//   const uploadTask = uploadBytesResumable(storageRef, file);  

//   uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");

//           switch (snapshot.state) {
//               case "paused":
//                   console.log("Upload is paused");
//                   break;
//               case "running":
//                   console.log("Upload is running");
//                   break;
//           }
//       },
//       (error) => {
//           console.log(error);  // Log any errors during the upload
//       },
//       () => {
//           // After the upload completes, get the download URL
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               console.log("Successfully uploaded");
//               setFileURL(downloadURL);  // Set the file URL to the state
//           });
//       }
//   );
// };

export const uploadFile1 = (setFileURL, file, setLoading) => {
  const storage = getStorage(app);
  const name = new Date().getTime() + file.name;
  const storageRef = ref(storage, name);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
      setLoading(false); // Stop loading on error
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFileURL(downloadURL);
        setLoading(false); // Stop loading when done
        console.log("Successfully uploaded");
      });
    }
  );
};

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }

  return num.toString();
}

export function getInitials(fullName) {
  const names = fullName.split(" "); //code wave asante

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}


export function createSlug(title) {
  return title

    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export const updateURL = ({ page, navigate, location }) => {
  const params = new URLSearchParams();

  if (page && page > 1) {
    params.set("page", page);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};