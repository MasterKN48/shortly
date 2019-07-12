import axios from "axios";
export const postUrl = async data => {
    try {
        console.log(data);
        const res = await axios.post("/api/url/shorten", data);
        //console.log(res);
        if (typeof window !== "undefined") {
            let list={
                longUrl:res.data.longUrl,
                shortUrl:res.data.shortUrl,
                userId:res.data.userId,
                _id:res.data._id,
                date:res.data.date
            }
            localStorage.setItem("list", JSON.stringify(list));
            return res.data;
        }
    }
    catch (err) {
        return console.error(err);
    }
};
export const showList= async id =>{
    try {
        //console.log(id);
        const res= await axios.get(`/api/url/all/${id}`);
        //console.log(res.data);
        return res.data;
    } catch (error) {
        return error;
    }
}

export const deleteUrl= async id =>{
    try {
        const res= await axios.delete(`/api/url/delete/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(error);
        return error;
    }
}
