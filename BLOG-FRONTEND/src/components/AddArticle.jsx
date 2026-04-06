import { useForm } from "react-hook-form";

function AddArticle(){

  const {register,handleSubmit,formState:{errors}}=useForm()

  const onSubmit=(data)=>{
    console.log(data)
  }

  return(
    <div className="flex justify-center mt-10">

      <form onSubmit={handleSubmit(onSubmit)} className="w-96 space-y-4">

        <h2 className="text-xl text-center">Add Article</h2>

        <input type="text" placeholder="Title" {...register("title",{required:true})} className="border w-full p-2"/>

        <select {...register("category")} className="border w-full p-2">
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="education">Education</option>
          <option value="health">Health</option>
        </select>

        <textarea placeholder="Content" {...register("content",{required:true})} className="border w-full p-2"  />

        <button className="bg-blue-500 text-white w-full p-2"> Publish Article  </button>

      </form>

    </div>
  )
}

export default AddArticle