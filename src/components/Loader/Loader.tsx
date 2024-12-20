import { TailSpin } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#0000FF"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
};

export default Loader;
