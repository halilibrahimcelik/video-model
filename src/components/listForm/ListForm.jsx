import React from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { toast } from "react-toastify";

const ListForm = ({ item }) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.title === item.title && data.explanation === item.explanation) {
      toast.info(
        "Herhangi bir değişiklik yapıldığı zaman güncelleme işlemi gerçekleşir",
        {
          position: "top-left",
          autoClose: 2000,
          className: "mt-20",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }
    const docRef = doc(db, "videoList", data.itemId);
    await updateDoc(docRef, {
      title: data.title,
      explanation: data.explanation,
    });
    toast.success("Video başarıyla güncellendi.", {
      position: "top-left",
      autoClose: 1200,
      className: "mt-20",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <form
      key={item.listId}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <input
        style={{ display: "none" }}
        readOnly
        value={item.listId}
        {...register("itemId")}
      />
      <div className="flex flex-col lg:flex-col gap-2">
        <div className="flex w-full">
          <label
            className="text-teal-700 inline-block whitespace-nowrap  mr-2 text-[1.2rem] font-medium "
            htmlFor="accountName"
          >
            Paylaşılacak Hesap:
          </label>
          <input
            id="accountName"
            value={item.accountName}
            {...register("accountName")}
            readOnly
            className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default "
          />
        </div>
        <div className="flex w-full">
          <label
            className="text-teal-700 inline-block whitespace-nowrap mr-2 text-[1.2rem] font-medium"
            htmlFor="companyName"
          >
            Şirket Adı:
          </label>
          <input
            id="companyName"
            value={item.companyName}
            {...register("companyName")}
            readOnly
            className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default capitalize"
          />
        </div>
      </div>

      <div className="flex w-full">
        <label
          className="text-teal-700 inline-flex flex-col    items-end whitespace-nowrap mr-2 text-[1.2rem] font-medium"
          htmlFor={`${item.listId}-explanation`}
        >
          Açıklama:
          <CiEdit title="Güncelle" className="text-4xl cursor-pointer  " />
        </label>
        <textarea
          id={`${item.listId}-explanation`}
          cols={50}
          rows={3}
          readOnly={false}
          className="h-[140px] max-w-full rounded-md w-full p-2  font-medium text-[1.2rem] focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid "
          defaultValue={item.explanation}
          {...register("explanation", { required: true })}
        />
      </div>
      {errors.explanation && (
        <span className="inline-block">Bu alanın doldurulması zorunludur.</span>
      )}

      <div className="flex w-full">
        <label
          className="text-teal-700 inline-flex flex-col    items-end whitespace-nowrap mr-2 text-[1.2rem] font-medium"
          htmlFor={`${item.listId}-title`}
        >
          Başlık:
          <CiEdit title="Güncelle" className="text-4xl cursor-pointer  " />
        </label>
        <input
          id={`${item.listId}-title`}
          className="bg-transparentmax-w-full rounded-md w-full p-2  font-medium text-[1.2rem] focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid "
          defaultValue={item.title}
          {...register("title", { required: true })}
        />
      </div>
      {errors.title && (
        <span className="inline-block">Bu alanın doldurulması zorunludur.</span>
      )}
      <div className="flex w-full">
        <label
          className="text-teal-700 inline-block whitespace-nowrap mr-2 text-[1.2rem] font-medium"
          htmlFor="platform"
        >
          Platform:
        </label>
        <input
          id="platform"
          className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default capitalize"
          readOnly
          value={item.platform}
          {...register("platform")}
        />
      </div>
      <button
        type="submit"
        className="bg-teal-600 w-[10rem] mx-auto px-3 py-1  text-white  border border-teal-600 rounded-sm transition-all ease-in duration-300 hover:bg-white hover:text-teal-600 font-medium uppercase"
      >
        Güncelle
      </button>
    </form>
  );
};

export default ListForm;
