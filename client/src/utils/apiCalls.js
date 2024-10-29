import axios from "axios";

export const API_URL = "http://localhost:8800";

export const getGoogleSignUp = async (accessToken) => {
    try{
        const user = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers: { Authorization: `Bearer ${accessToken}`},

        })
        .then((res) => res.data);

        if(user?.sub){
            const data = {
                name: user.name,
                email: user.email,
                emailVerified: user.email_verified,
                image: user.picture,
            };

            const result = await axios.post(`${API_URL}/auth/google-signup`, data);
            return result?.data;
            // console.log(data);
        }
    }
    catch(error){
        const err= error?.response?.data || error?.response;
        console.log(error);
        return err;
    }
}


export const googleSignin = async (accessToken) => {
    try{
        const user = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo",{
            headers: { Authorization: `Bearer ${accessToken}`},

        })
        .then((res) => res.data);

        if(user?.sub){
            const data = {
               
                email: user.email,
              
            };

            // console.log(user);

            const result = await axios.post(`${API_URL}/auth/login`, data);
            return result?.data;
            // console.log(data);
        }
    }
    catch(error){
        const err= error?.response?.data || error?.response;
        console.log(error);
        return err;
    }
}



export const emailSignUp = async (data) => {
    try{
        const result = await axios.post(`${API_URL}/auth/register`, data);

        return result?.data;

    } catch(error) {
        const err = error?.response?.data || error?.response;
        console.log(error);

        return err;
    }
}

export const emailLogin = async (data) => {
    try{
        const result = await axios.post(`${API_URL}/auth/login`, data);

        return result?.data;

    } catch(error) {
        const err = error?.response?.data || error?.response;
        console.log(error);

        return err;
    }
}


export const getSinglePost = async (id) => {
    try{
        const trimmedId =   id.trim();
        const{data} = await axios.get(`${API_URL}/posts/${trimmedId}`);

        return data?.data;
    }  catch(error){
        const err = error?.response?.data || error?.response;
        console.log(error);
        return err;
    }

}

export const getPostComments = async (id) => {
    try{
        const{data} = await axios.get(`${API_URL}/posts/comments/${id}`);

        return data?.data;

    } catch(error){
        const err = error?.response?.data || error?.response;
        console.log(error);

        return err;
    }
}

export const postComments = async(id,token, desc) => {
    try{
        const result = await axios.post(`${API_URL}/posts/comment/${id}`,
          {  desc},
            { 

headers: {Authorization: `Bearer ${token}`},
      }  );
return result?.data;

    } catch(error){
        const err = error?.response?.data || error?.response;
        console.log(error);

        return err;
    }
};


export const deletePostComments =async(id,token,postId) => {

    try{
        const result = await axios.delete(
            `${API_URL}/posts/comment/${id}/${postId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            }
        );
        return result?.data;
    } catch(error) {
        const err = error?.response?.data || error?.response;
        console.log(error);
        return err;
    }
}


export const getWriterInfo = async(id) => {

    try{
        const {data} = await axios.get(`${API_URL}/user/get-user/${id}`);

        return data?.data;

    } catch(error){
        const err = error?.response?.data || error?.response;
        console.log(error);

        return err;
    }
}

export const followWriter = async(id,token) => {

    try{
        const res = await axios.post(
            `${API_URL}/user/follower/${id}`, null,
            {
                headers: {
                    Authorization: `Bearer ${token}`,

                },
            }
        );
        return res?.data;
    } catch(error) {
        const err = error?.response?.data || error?.response;
        console.log(error);
        return err;
    }
}
