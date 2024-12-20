const NotFoundPage: React.FC = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-center h-[100vh] text-black p-8">
        <h1 className="text-8xl font-bold color-[#007bff] mb-4">404</h1>
        <p className="text-2xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};
export default NotFoundPage;
