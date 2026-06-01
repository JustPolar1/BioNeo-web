import { BsLockFill, BsPersonFill } from "react-icons/bs";
import FormInput from "./forms/FormInput";
import FormButton from "./forms/FormButton";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebaseConfig"; // Ajusta la ruta si es necesario
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");   
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
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

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const userEmail = userCredential.user.email;

            // Guardar datos del usuario en Firestore
            const userDocRef = doc(db, "users", uid);

            await setDoc(userDocRef, {
                email: userEmail,
                nombre: name,
                createdAt: serverTimestamp()
            });

            localStorage.setItem("email", userEmail)
            localStorage.setItem("uid", uid);
            navigate("/");
        } catch (err) {
            console.error("Error registro usuario", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Este correo ya está registrado");
            } else if (err.code === "auth/invalid-email") {
                setError("El correo no es válido");
            } else {
                setError("Error al registrarse: " + err.message);
            }
        }
    };

    return (
        <div className="flex w-full h-full">
            <section className={`flex flex-col gap-2 ${isRegister ? 'flex-15' : 'flex-20'} p-30 justify-center items-center bg-[url('https://goldenplantshop.com/cdn/shop/articles/Slideshows_155.png?v=1713800098&width=1500')] bg-cover bg-center bg-no-repeat transition-all duration-500`}>
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
            <main className="flex flex-col flex-10 justify-center content-center p-18 bg-white dark:bg-gray-900 transition-all duration-500">
                <form className="flex flex-col gap-7" onSubmit={isRegister ? handleRegister : handleLogin}>
                    <h1 className="text-xl text-bold text-center text-gradient adaptable">
                        {isRegister ? "Registro" : "Inicio de sesión"}
                    </h1>

                    {isRegister && (
                        <FormInput
                            placeholder="Nombre completo"
                            icon={<BsPersonFill size={20} />}
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    )}

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

                    {isRegister && (
                        <FormInput
                            placeholder="Confirmar contraseña"
                            icon={<BsLockFill size={20} />}
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                    )}

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <FormButton>
                        {isRegister ? "Registrarse" : "Iniciar sesión"}
                    </FormButton>

                    <button
                        type="button"
                        className="text-center text-sm dark:text-white underline hover:cursor-pointer"
                        onClick={() => {
                            setIsRegister(!isRegister);
                            setError("");
                            setEmail("");
                            setPassword("");
                            setConfirmPassword("");
                            setName("");
                        }}
                    >
                        {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Registrate"}
                    </button>
                </form>
            </main>
        </div>
    )
}