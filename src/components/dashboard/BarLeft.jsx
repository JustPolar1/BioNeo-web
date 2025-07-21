import { useState } from "react";
import CreateEntry from "./buttons/CreateEntry";
import NavIcon from "./buttons/NavIcon";
import EntryModal from "./EntryModal";
import { BsHouse, BsBarChartLine, BsSliders, BsBoxArrowLeft, BsPlusCircleFill } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

export default function BarLeft({ onEntryCreated }) {
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    function handleLogoOut() {
        localStorage.clear();
        navigate("/login");
    }

    function scrollToSection(id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }

    return (
        <nav className="w-55 h-screen flex flex-col justify-between items-center">            
            <div className="m-5 justify-center align-center content-center py-10">
                <h1 className="text-gradient color-white text-3xl font-bold text-center">BioNeo</h1>
            </div>
            <div className="w-full">
                <NavIcon onClick={() => scrollToSection("inicio")}><BsHouse color="black"/><span className="text-gradient">Inicio</span></NavIcon>
                <NavIcon onClick={() => scrollToSection("estadísticas")}><BsBarChartLine color="black"/><span className="text-gradient">Estadísticas</span></NavIcon>                <NavIcon onClick={handleLogoOut}><BsBoxArrowLeft color="black"/><span className="text-gradient">Cerrar sesión</span></NavIcon>
            </div>
            <div className="w-[80%] flex-1 justify-center items-center content-center">
                <CreateEntry onClick={() => setShowModal(true)}>
                    <BsPlusCircleFill color="#2fba87" size={32} />
                    <h2 className="text-center text-[#2fba87]">Agregar</h2>
                </CreateEntry>
            </div>
            <EntryModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onEntryCreated={onEntryCreated}
            />        
        </nav>
    );
}