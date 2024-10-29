import {useLocation, Navigate,Outlet, Route} from "react-router-dom"
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import OTPVerification from "./pages/OTPVerification";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Followers from "./pages/Followers";
import Contents from "./pages/Content";
import WritePost from "./pages/WritePost";
import useStore from "./store/index";
import NotFoundPage from "./components/NotFoundPage";
function Layout() {
  const { user } = useStore((state) => state);
  const location = useLocation()
  return user?.token ? (
  
  <div className="w-full h-screen"> 
<Navbar />
<div className="w-full h-full flex border-t pt-16 ">
  <div className="hidden lg:flex">
<Sidebar/>
  </div>

  <div className="w-full flex-1 px-8 py-6 overflow-y-auto">
    <Outlet/>
  </div>
</div>
  </div>
  ):(
    
    <Navigate to="/auth" state={{from: location}} replace/>
  );
}


function App() {
  return (
    <main className='w-full min-h-screen '>
      <Routes>

        <Route element={<Layout/>}>
        <Route index path ="/" element={<Navigate to="/dashboard"/>}/>
        <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/followers' element={<Followers />} />
          <Route path='/contents' element={<Contents />} />
          <Route path='/write/:postId?' element={<WritePost/>}  />
          <Route path="*" element={<NotFoundPage />}/>
        </Route>
        
        <Route path="/auth" element={<StartPage/>}/>
        <Route path="/otp-verification" element={<OTPVerification/>} />
      </Routes>
    </main>
  );
}

export default App;


// import { useLocation, Navigate, Outlet, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import { Routes } from "react-router-dom";
// import StartPage from "./pages/StartPage";
// import OTPVerification from "./pages/OTPVerification";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Followers from "./pages/Followers";
// import Contents from "./pages/Content";
// import WritePost from "./pages/WritePost";
// import useStore from "./store/index";
// import NotFoundPage from "./components/NotFoundPage";

// function Layout() {
//   const { user } = useStore((state) => state);
//   const location = useLocation();
//   return user?.token ? (
//     <div className="w-full h-screen">
//       <Navbar />
//       <div className="w-full h-full flex border-t pt-16">
//         <div className="hidden lg:flex">
//           <Sidebar />
//         </div>
//         <div className="w-full flex-1 px-8 py-6 overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <Navigate to="/admin/auth" state={{ from: location }} replace />
//   );
// }

// function App() {
//   return (
//     <main className="w-full min-h-screen">
//       <Routes>
//         {/* Layout for Admin Routes */}
//         <Route path="/admin" element={<Layout />}>
//           {/* Default Admin Dashboard */}
//           <Route index element={<Navigate to="/admin/dashboard" />} />
//           <Route path="/admin/dashboard" element={<Dashboard />} />
//           <Route path="/admin/analytics" element={<Analytics />} />
//           <Route path="/admin/followers" element={<Followers />} />
//           <Route path="/admin/contents" element={<Contents />} />
//           <Route path="/admin/write/:postId?" element={<WritePost />} />
//           <Route path="/admin/*" element={<NotFoundPage />} />
//         </Route>

//         {/* Auth and OTP Verification Routes */}
//         <Route path="/admin/auth" element={<StartPage />} />
//         <Route path="/admin/otp-verification" element={<OTPVerification />} />
//       </Routes>
//     </main>
//   );
// }

// export default App;
