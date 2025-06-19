import CreateEntry from "./buttons/CreateEntry"
import NavIcon from "./buttons/NavIcon"

import { BsHouse, BsBarChartLine, BsSliders, BsBoxArrowLeft, BsPlusCircleFill } from 'react-icons/bs'

export default function BarLeft() {
    return (
        <nav className="w-50 h-screen flex flex-col justify-between items-center bg-[radial-gradient(ellipse_at_bottom_right,_#7ff74a,_#02a23a)]">            
            <div className="m-5 justify-center align-center content-center py-10">
                <h1 className="text-gradient color-white text-3xl font-bold text-center">BioNeo</h1>
            </div>
            <div className="w-full">
                <NavIcon><BsHouse /><span className="text-gradient">Inicio</span></NavIcon>
                <NavIcon><BsBarChartLine /><span className="text-gradient">Estadísticas</span></NavIcon>
                <NavIcon><BsSliders /><span className="text-gradient">Configuraciones</span></NavIcon>
                <NavIcon><BsBoxArrowLeft /><span className="text-gradient">Cerrar sesión</span></NavIcon>
            </div>
            <div className="w-[80%] flex-1 justify-center items-center content-center">
                <CreateEntry><BsPlusCircleFill color="#00aa00" size={32} /><h2 className="text-center text-[#00aa00]">Agregar</h2></CreateEntry>
            </div>
        </nav>
    )
}