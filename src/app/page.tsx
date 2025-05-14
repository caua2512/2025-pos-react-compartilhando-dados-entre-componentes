"use client";

import type React from "react";

import { useEffect, useState } from "react";
import dados, { TarefaInterface, carregar } from "@/data";
import Cabecalho from "@/componentes/Cabecalho";
import ModalTarefa from "@/componentes/TarefaModal";

interface TarefaProps {
	titulo: string;
	concluido?: boolean;
}

const Tarefa: React.FC<TarefaProps> = ({ titulo, concluido }) => {
	const [estaConcluido, setEstaConcluido] = useState(concluido);

	const classeCard = `p-3 mb-3 rounded-lg shadow-md hover:cursor-pointer hover:border ${
		estaConcluido
			? "bg-gray-800 hover:border-gray-800"
			: "bg-gray-400 hover:border-gray-400"
	}`;

	const classeCorDoTexto = estaConcluido ? "text-amber-50" : "";

	const escutarClique = () => {
		console.log(`A tarefa '${titulo}' foi clicada!`);
		setEstaConcluido(!estaConcluido);
	};

	return (
		<div className={classeCard} onClick={() => escutarClique()}>
			<h3 className={`text-xl font-bold ${classeCorDoTexto}`}>{titulo}</h3>
			<p className={`text-sm ${classeCorDoTexto}`}>
				{estaConcluido ? "Concluída" : "Pendente"}
			</p>
		</div>
	);
};

interface TareafasProps {
	dados: TarefaInterface[];
}

const Tarefas: React.FC<TareafasProps> = ({ dados }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
			{dados.map((tarefa) => (
				<Tarefa
					key={tarefa.id}
					titulo={tarefa.title}
					concluido={tarefa.completed}
				/>
			))}
		</div>
	);
};

const Home: React.FC = () => {
	const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
	const [ModalAberto, setModalAberto] = useState<boolean>(false);
	const [Erro, setErro] = useState<string | null>(null);

	useEffect(() => {
		carregar()
		 .then((dados) => setTarefas(dados))
		 .catch((Erro) => setErro(Erro.message));
	}, []);

	const adicionarTarefa = (novaTarefa: TarefaInterface) => {
		setTarefas((tarefasAtuais) => [...tarefasAtuais, novaTarefa]);
	};

	const abrirModal = () => setModalAberto(true);
	const fecharModal = () => setModalAberto(false);

	if (Erro) {
		return <div>{Erro}</div>;
	}

	return (
		<div className="container mx-auto p-4">
			<Cabecalho />
			<button onClick={abrirModal}>Adicionar Nova Tarefa</button>
			<ul>
				{tarefas.map((Tarefa) => (
					<li key={Tarefa.id}>
						<input 
							type="checkbox"
							checked={Tarefa.completed}
							onChange={() => 
								setTarefas((tarefasAtuais) =>
									tarefasAtuais.map((t) =>
										t.id === Tarefa.id ? {...t, completed: !t.completed } : t
									)
								)
							}
						/>
						{Tarefa.title}
					</li>
				))}
			</ul>
			{ModalAberto && (
					<ModalTarefa adicionarTarefa={adicionarTarefa} fecharModal={fecharModal} />
			)}		
		</div>
	);
};

export default Home;
