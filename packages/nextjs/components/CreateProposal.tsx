import { useState } from "react";
import { useAccount, useContractWrite} from "wagmi";

const CreateProposal = () => {
  const { address } = useAccount();
  const [proposal, setProposal] = useState("");

  const { write, isLoading, error } = useContractWrite({
    addressOrName: "0x5FbDB2315678afecb367f032d93F642f64180aa3", // Замените на ваш контракт
    contractInterface: [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          }
        ],
        "name": "createProposal",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: "createProposal",
    args: [proposal],
  });

  const handleCreateProposal = async () => {
    try {
      await write?.();
      alert("Предложение создано!");
      setProposal("");
    } catch (err) {
      console.error("Ошибка при создании предложения", err);
    }
  };

  return (
    <div className="bg-blue-500 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Создать предложение</h3>
      <input
        type="text"
        placeholder="Введите описание предложения"
        value={proposal}
        onChange={(e) => setProposal(e.target.value)}
        className="w-full p-2 rounded-lg mb-4"
      />
      <button
        onClick={handleCreateProposal}
        disabled={!proposal || isLoading}
        className="w-full p-2 bg-teal-500 text-white rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Создание..." : "Создать предложение"}
      </button>
      {error && <div className="mt-2 text-red-500">{error.message}</div>}
    </div>
  );
};

export default CreateProposal;
