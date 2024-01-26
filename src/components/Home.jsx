import ExerciseLogos from '../assets/exercise-logos.svg'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

function Home() {
    useEffect(() => {
        AOS.init({duration: 2000})
    }, []);

    return (
        <div className="">
            <section id="home">
                <div className="justify-evenly flex-wrap flex gap-10">
                    <div data-aos="fade-right">
                        <img src={ExerciseLogos} />
                    </div>
                    <div data-aos="fade-right" data-aos-delay="1000">
                            <h1 className="text-5xl font-bold text-center text-white">Welcome to CurTempConverter</h1>
                            <h2 className="text-2xl font-bold text-center text-white mt-6">Currency Temperature Converter by Benedict Aurelius</h2>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home