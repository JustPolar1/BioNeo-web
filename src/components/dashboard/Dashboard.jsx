import BarLeft from './BarLeft';
import BoardHeader from './mainBoard/BoardHeader';
import MainBoard from "./mainBoard/MainBoard";
import Profile from './mainBoard/rightPanel/Profile';

const avril = {
    name: "Avril Caraveo",
    image: "https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?r=0&rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3",
    email: "avrilsita@gmail.com"
}

export default function Dashboard() {
    return (
        <>
            <BarLeft></BarLeft>
            <div className="flex flex-col w-full shadow-[-8px_8px_18px_0_rgba(0,0,0,0.2)] bg-white dark:bg-gray-900 rounded-4xl my-1 mr-1 ">
                <div className='flex gap-5 h-full'>
                    <div className='flex-1 flex flex-col'>
                        <BoardHeader />
                        <main className="flex overflow-y-auto flex-col justify-between pb-5 pl-5 gap-5 max-h-full">
                            <MainBoard />
                        </main>
                    </div>
                    <Profile image={avril.image} name={avril.name} email={avril.email} />
                </div>
            </div>
        </>
    )
} 