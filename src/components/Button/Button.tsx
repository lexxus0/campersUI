interface ButtonProps {
  children: React.ReactNode;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, disabled }) => {
  return (
    <button
      className="bg-red-500 py-4 w-[170px] rounded-[200px] font-medium text-base text-white transition-all duration-[0.7] ease-[ease-out] hover:bg-[#d84343]"
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
