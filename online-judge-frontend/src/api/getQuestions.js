import axios from "axios"


const getQuestions = async (lang)=>{
  try {

    const res = await axios
      .get("http://localhost:8080/api/questions/")
    console.log(res);
    return res.data;
  } catch(err) {
    return err
  }


}
export  {getQuestions} 