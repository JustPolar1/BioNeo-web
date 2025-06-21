import { BsLockFill, BsPersonFill } from "react-icons/bs";
import FormInput from "./forms/FormInput";
import FormButton from "./forms/FormButton";

export default function LogIn() {
    return (
        <div className="flex w-full h-full">
            <section className="flex flex-col gap-2 flex-1 p-30 justify-center items-center bg-[url('https://www.eiviss-garden.com/wp-content/uploads/2024/05/plantar-eiviss-garden-1.jpg')] bg-cover bg-center bg-no-repeat">
                <div className="backdrop-blur-md bg-black/1 rounded-full p-2 w-fit ">
                    <h1 className="text-4xl text-white text-bold text-center p-2 rounded-full">BioNeo</h1>
                </div>            
                <div className="backdrop-blur-md bg-black/1 rounded-full px-12 py-2">
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, voluptatibus? Vel laudantium molestiae eveniet perferendis nesciunt exercitationem tenetur, ad nulla numquam distinctio fugiat aut vero doloremque eum debitis nihil architecto!</p>
                </div>            
            </section>
            <main className="flex flex-col justify-center content-center p-18 bg-white dark:bg-gray-900">
                <form className="flex flex-col gap-7">
                    <h1 className="text-xl text-bold text-center text-gradient adaptable">Inicio de sesión</h1>
                    <FormInput placeholder="Lorem@ipsum.com" icon={<BsPersonFill size={20} color="white" />} type="email" />
                    <FormInput placeholder="Contraseña" icon={<BsLockFill size={20} color="white" />} type="password" />

                    <FormButton>Iniciar sesión</FormButton>
                </form>
            </main>
        </div>
    )
}