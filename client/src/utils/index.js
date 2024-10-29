import { toast } from "sonner";
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from "firebase/storage";
import app from "./firebase";
export function formatNumber(num) {
    if(num>= 1000000){
        return(num /1000000).toFixed(1) + "M";

    }
    else if(num>= 1000){
        return(num /1000).toFixed(1) + "K";

    }
    return num.toString();
}

export const saveUserInfo = (user, signIn) => {
    localStorage.setItem(
        "userInfo",
        JSON.stringify({user: user?.user, token: user.token})

    );

    signIn({user: user?.user, token: user.token});
    toast.success(user?.message);

    setTimeout(() => {
        window.history.back();
    },1500);
}

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
// // };
// export const uploadFile = (setFileURL, file) => {
//   const storage = getStorage(app);

//   const name = new Date().getTime() + file.name;  // Generate a unique name for the file
//   const storageRef = ref(storage, name);

//   const uploadTask = uploadBytesResumable(storageRef, file);  // Use the correct file object

//   uploadTask.on(
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
//         setFileURL(downloadURL);  // Set the file URL to the state
//       });
//     }
//   );
// };
export const uploadFile = (setFileURL, file, setIsLoading) => {
  const storage = getStorage(app);
  const name = new Date().getTime() + file.name;  // Generate a unique name for the file
  const storageRef = ref(storage, name);

  // Start the upload
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Trigger the loading state
  setIsLoading(true);  // Start the loader

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
      console.error("Upload failed:", error);
      setIsLoading(false);  // Stop the loader on error
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("Successfully uploaded");
        setFileURL(downloadURL);  // Set the file URL to the state
        setIsLoading(false);  // Stop the loader after upload completes
      });
    }
  );
};


export const updateURL = ({page,navigate,location,cat}) => {
  const params = new URLSearchParams();

  if(cat){
    params.set("cat", cat);
  }

  if(page&& page>1){
    params.set("page",page);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, {replace:true});

  return newURL;
};