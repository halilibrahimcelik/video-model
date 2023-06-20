import Dropzone from "react-dropzone-uploader";

const Input = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const text =
    files.length > 0
      ? "Daha Fazla Yükleyin"
      : "Lütfen Yüklemek istediğiniz videoyu sürükleyin veya seçin";

  return (
    <label className=" bg-transparent rounded-sm text-teal-700  py-2 font-bold text-xl ">
      {text}
      <input
        style={{ display: "none" }}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => {
          getFilesFromEvent(e).then((chosenFiles) => {
            onFiles(chosenFiles);
          });
        }}
      />
    </label>
  );
};

export default Input;
