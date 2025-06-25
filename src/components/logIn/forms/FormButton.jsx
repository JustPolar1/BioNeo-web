export default function FormButton({ children }) {
  return (
    <button 
    className="w-full p-3 rounded-full bg-[linear-gradient(to_right,_#2fba87_20%,_#00fa9f_40%)] bg-[length:200%] bg-[position:0%] transition-all duration-300 hover:bg-[position:100%] hover:scale-105 active:scale-95 hover:cursor-pointer"
    type="submit"
    >
      {children}
    </button>
  );
}
