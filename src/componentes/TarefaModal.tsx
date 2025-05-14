import { useState } from "react";
import { TarefaInterface } from "@/data";

interface ModalTarefaProps {
    adicionarTarefa: (novaTarefa: TarefaInterface) => void;
    fecharModal: () => void;
}

const ModalTarefa: React.FC<ModalTarefaProps> = ({ adicionarTarefa, fecharModal }) => {
    const  [novaTarefa, setNovaTarefa] = useState<string>("");

    const Adicionar = () => {
        if (novaTarefa.trim()) {
            const novaTarefaObj: TarefaInterface = {
                id: Date.now(),
                title: novaTarefa,
                completed: false,
            };
            adicionarTarefa(novaTarefaObj);
            fecharModal();
        }
    };

    return (
        <div className="modal">
            <input
                type="text"
                value={novaTarefa}
                onChange={(e) => setNovaTarefa(e.target.value)}
                placeholder="Digite uma nova tarefa"
            />
            <button onClick={Adicionar}>Adicionar Tarefa</button>
            <button onClick={fecharModal}>Fechar</button>
        </div>
    );
};

export default ModalTarefa;