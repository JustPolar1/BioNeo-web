import { BsLockFill, BsPersonFill } from "react-icons/bs";
import FormInput from "./forms/FormInput";
import FormButton from "./forms/FormButton";
import Modal from "../Modal";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseConfig"; // Ajusta la ruta si es necesario

import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const userEmail = userCredential.user.email;

            localStorage.setItem("email", userEmail)
            localStorage.setItem("uid", uid); // Guarda la UID en localStorage
            navigate("/");
        } catch (err) {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div className="flex w-full h-full">
            <section className="flex flex-col gap-2 flex-1 p-30 justify-center items-center bg-[url('https://goldenplantshop.com/cdn/shop/articles/Slideshows_155.png?v=1713800098&width=1500')] bg-cover bg-center bg-no-repeat">
                <div className="backdrop-blur-md bg-black/1 rounded-full p-2 w-fit ">
                    <h1 className="text-4xl text-white text-bold text-center p-2 rounded-full">BioNeo</h1>
                </div>            
                <div className="backdrop-blur-md bg-black/1 rounded-full px-12 py-2">
                    <p className="text-center text-white">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, voluptatibus? 
                        Vel laudantium molestiae eveniet perferendis nesciunt exercitationem tenetur, 
                        ad nulla numquam distinctio fugiat aut vero doloremque eum debitis nihil architecto!
                    </p>
                </div>            
            </section>
            <main className="flex flex-col justify-center content-center p-18 bg-white dark:bg-gray-900">
                <form className="flex flex-col gap-7" onSubmit={handleLogin}>
                    <h1 className="text-xl text-bold text-center text-gradient adaptable">Inicio de sesión</h1>
                    <FormInput
                        placeholder="Correo electrónico"
                        icon={<BsPersonFill size={20} />}
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormInput
                        placeholder="Contraseña"
                        icon={<BsLockFill size={20} />}
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <FormButton>Iniciar sesión</FormButton>

                    <a className="text-center text-sm dark:text-white underline hover:cursor-pointer"
                        onClick={() => setIsOpen(true)}>¿Cómo me registro?</a>

                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        ¿Cómo me registro?
                        </h2>
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-gray-600 dark:text-gray-300">
                            Para crear una cuenta será necesario descargar la aplicación móvil de BioNeo
                            y hacer el registro desde tu app
                            </p>
                            <img 
                            src="src/assets/registro.jpeg"
                            className="w-1/2 rounded-xl shadow-xl"
                            />
                        </div>
                    </Modal>
                </form>
            </main>
        </div>
    )
}