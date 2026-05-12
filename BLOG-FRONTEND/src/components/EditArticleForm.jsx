import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [articleData,setArticleData] = useState(article || null)
  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // prefill form
  useEffect(() => {
    if (!articleData) return;

    setValue("title", articleData.title);
    setValue("category", articleData.category);
    setValue("content", articleData.content);
  }, [articleData]);

  const updateArticle = async (data) => {
    try {

    await axios.put(
      `https://blog-app-1-kny9.onrender.com/author-api/article/${id}`,
      data,
      { withCredentials:true }
    )

    toast.success("Article updated successfully")

    navigate("/authordashboard")

  } catch(err){
    toast.error(err.response?.data?.error || "Update failed")
  }
  };

  const getArticleById = async ()=>{
  try{
    let res = await axios.get(
      `https://blog-app-1-kny9.onrender.com/author-api/article/${id}`
    )
    setArticleData(res.data.payload)
  }catch(err){
    console.log(err)
  }
}

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input className={inputClass} {...register("title", { required: "Title required" })} />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select className={inputClass} {...register("category", { required: "Category required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button className={submitBtn}>Update Article</button>
      </form>
    </div>
  );
}

export default EditArticle;
