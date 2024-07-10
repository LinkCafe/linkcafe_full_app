import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function Counts({icon, nombre, cantidad}) {
  return (
    <div className="w-100 border border-gray-200 shadow-lg rounded-lg flex flex-row items-center hover:border-[#6a4023] transition-all hover:translate-y-1 py-5 px-2">
        <div className="bg-[#6a4023] mx-2 p-2 rounded w-20 h-16 flex justify-center items-center">
            <FontAwesomeIcon icon={icon} className="text-white text-2xl" />
        </div>
        <div className="w-full">
            <h2 className="text-2xl font-bold">{nombre}</h2>
            <p className="text-center text-xl font-semibold">{cantidad}</p>
        </div> 
    </div>
  )
}

export default Counts