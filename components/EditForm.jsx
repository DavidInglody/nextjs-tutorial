"use client"
import { updateTask } from "@/utils/actions";
import { useEffect } from "react";
import {useFormStatus, useFormState} from "react-dom"
import toast from "react-hot-toast";

const SubmitBtn = ()=>{
  const {pending} = useFormStatus()
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block btn-sm"
      disabled={pending}
    >
      {pending ? "please wait...":"Edit task"}
    </button>
  );
}

const initialState = {
  message:null
}

const EditForm = ({ task }) => {
  const [state,formAction] = useFormState(updateTask, initialState)
  const { id, completed, content } = task;
  useEffect(()=>{
    if(state.message === "error"){
      toast.error("there was an error")
      return
    }
    if(state.message){
      toast.success("task updated")
    }
  },[state])

  return (
    <form
      action={formAction}
      className="max-w-sm p-12 border border-base-300 rounded-lg"
    >
      <input type="hidden" name="id" value={id} />
      {/* content */}
      <input
        type="text"
        className="input input-bordered w-full "
        placeholder="rename"
        name="content"
        required
        defaultValue={content}
      />
      {/* completed */}
      <div className="form-control">
        <label htmlFor="completed" className="label cursor-pointer my-4">
          <span className="label-text">completed</span>
          <input
            type="checkbox"
            defaultChecked={completed}
            name="completed"
            id="completed"
            className="checkbox checkbox-primary checkbox-sm"
          />
        </label>
      </div>
      <SubmitBtn />
    </form>
  );
};
export default EditForm;
