import { useState } from "react";

interface ModalTarefaProps {
    aoadicionar: (titulo: string) => void;
    aoFechar: () => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ aoadicionar, aoFechar }) => {
    const [titulo, setTitulo] = useState("");

    const lidarComEnvio = () => {
        if (titulo.trim() === "") return;
        aoadicionar(titulo);
        setTitulo("");
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Nova Tarefa</h2>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w=full border border-gray-300 rounded p-2 mb-4"
                    placeholder="Digite o título da tarefa"
                />
                <div className="flex justify-end gap-2">
                    <button 
                        className=""
                        onClick={aoFechar}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={lidarComEnvio}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTarefa;