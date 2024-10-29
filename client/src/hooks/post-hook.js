import { useEffect } from "react"
import useStore from "../Store";
import { useState } from "react";
import { updateURL } from "../utils";
import axios from "axios";
import { API_URL } from "../utils/apiCalls";
import { useLocation,useNavigate ,useSearchParams } from "react-router-dom";
import { toast } from "sonner";
export const usePosts = ({writerId})=> {

    const {setIsLoading} = useStore()
    const location= useLocation()
    const navigate = useNavigate()

    const [serachParams] = useSearchParams()

    const [page, setPage] = useState(serachParams.get("page") || 1);
    const [category, setCategory] = useState(serachParams.get("cat") || "");

    const [posts,setPosts] = useState([]);
    const [numOfPages, setNumOfPages] = useState(1);

    useEffect(() => {
       
        const fetchPosts = async () => {
            updateURL({ page, navigate, location, cat: category });
          
            setIsLoading(true);
          
            try {
              // Request 15 posts per page
              const { data } = await axios.get(
                `${API_URL}/posts?cat=${category}&page=${page}&writerId=${writerId || ""}&limit=15`
              );
              setPosts(data?.data || []);
              setNumOfPages(data?.numOfPages);
            } catch (error) {
              toast.error("Something went wrong");
              const err = error?.response?.data || error?.response;
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          };
          

        window.scrollTo({top: 0, left: 0,behavior: "smooth"});
        fetchPosts();
    }, [page, writerId]);

    return {
        page,posts, numOfPages,setPage,
    };
};


export const usePopularPosts = () => {

    const [popular, setPopular] = useState([]);

    useEffect(()=> {
        const fetchPosts = async () => {
            try{
                const {data} = await axios.get(`${API_URL}/posts/popular`);

                setPopular(data?.data);
            } catch(error){
                toast.error("Something went wrong");

                const err = error?.response?.data || error?.response;
                console.log(error);
            }
        }
        fetchPosts();
    }, [])

    return popular;
}