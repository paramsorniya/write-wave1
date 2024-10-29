import { Routes, Route, Outlet } from "react-router-dom";
import { BlogDetails,CategoriesPage,Home,WriterPage,SignupPage,LoginPage, About, Contact } from "./pages";
import {Footer, Navbar,Loading } from "./Components";
// import NotFoundPage from "./Components/NotFoundPage";
// import NotFoundPage from "./Components/NotFoundPage";
import useStore from "./Store";

function Layout() {
  return (
    <div className="w-full flex flex-col min-h-screen px-4 md:px-10 2xl:px-29=8">
      <Navbar/>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
}
function App() {
  const {theme, isLoading} =useStore();
  return (
    <main className={theme}>
      <div className="w-full min-h-screen relative bg-white dark:bg-[#020b19]">
        <Routes>
          <Route  element={<Layout />} >
          <Route path="/" element={<Home/>} />
          <Route path="/category" element={<CategoriesPage/>} />
          <Route path='/:slug/:id?' element={<BlogDetails/>} />
          <Route path='/writer/:id' element={<WriterPage/>} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
          
          </Route>
<Route path='/sign-up' element={<SignupPage/>}/>
<Route path='/sign-in' element={<LoginPage/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
{/* <Route path="*" element={<NotFoundPage />} /> */}

        </Routes>
        {isLoading && <Loading/>}
      </div>
    </main>
  );
}

export default App;
