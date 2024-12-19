import { TailSpin } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div>
      <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#0000FF"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
