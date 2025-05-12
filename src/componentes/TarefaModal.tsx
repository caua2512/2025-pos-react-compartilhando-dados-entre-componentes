import React, { useState } from "react";

interface ModalTarefasProps {
    onFechar: () => void;
    onTarefaAdicionar: (Titulo:string) => void;
}


const ModalTarefa = () => {
    return (
        <>
            <input/>    
            <button>
                adicionar Tarefa
            </button>
        </>
    )
}
