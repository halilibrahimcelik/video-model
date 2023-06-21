import React from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
const ListForm = ({ item }) => {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data.itemId);
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
      <div className="flex flex-col lg:flex-row">
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
            className="bg-transparent w-full border-none font-medium text-[1.2rem] outline-none cursor-default capitalize"
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
          htmlFor="explanation"
        >
          Açıklama:
          <CiEdit className="text-4xl cursor-pointer  " />
        </label>
        <textarea
          id="explanation"
          cols={50}
          rows={3}
          readOnly={false}
          className="h-[140px] max-w-full rounded-md w-full p-2  font-medium text-[1.2rem] focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid "
          defaultValue={item.explanation}
          {...register("explanation", { required: true })}
        />
        {errors.explanation && <span>Bu alanın doldurulması zorunludur.</span>}
      </div>
      <div className="flex w-full">
        <label
          className="text-teal-700 inline-flex flex-col    items-end whitespace-nowrap mr-2 text-[1.2rem] font-medium"
          htmlFor="title"
        >
          Başlık:
          <CiEdit className="text-4xl cursor-pointer  " />
        </label>
        <input
          id="title"
          className="bg-transparentmax-w-full rounded-md w-full p-2  font-medium text-[1.2rem] focus:border-teal-700  focus:outline-none focus:rounded-md border-[3px] border-solid "
          defaultValue={item.title}
          {...register("title", { required: true })}
        />
        {errors.explanation && <span>Bu alanın doldurulması zorunludur.</span>}
      </div>
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
        DEĞİŞTİR
      </button>
    </form>
  );
};

export default ListForm;
