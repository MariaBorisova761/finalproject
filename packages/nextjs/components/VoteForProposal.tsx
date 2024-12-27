import { useState } from "react";
import { useAccount, useContractWrite } from "wagmi";


const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const VoteForProposal = () => {
  const { address } = useAccount();
  const [proposalId, setProposalId] = useState<number>(0);

  const { write: voteForProposal, isLoading, error } = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: [
      {
        "inputs": [
          { "internalType": "uint256", "name": "proposalId", "type": "uint256" }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ],
    functionName: "vote",
    args: [proposalId],
    onSuccess() {
      alert("Вы проголосовали!");
    },
    onError(err) {
      console.error("Ошибка при голосовании: ", err);
    },
  });

  const handleVote = async () => {
    if (!proposalId) {
      alert("Пожалуйста, укажите ID предложения.");
      return;
    }

    try {

      await voteForProposal?.();
    } catch (err) {
      console.error("Ошибка при голосовании", err);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#2a4b77", borderRadius: "8px", maxWidth: "500px", margin: "10px auto", color: "#fff" }}>
      <h3>Проголосовать за предложение</h3>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="ID предложения"
          value={proposalId}
          onChange={(e) => setProposalId(Number(e.target.value))}
          style={{
            padding: "10px",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
      </div>
      <button
        onClick={handleVote}
        disabled={proposalId <= 0 || isLoading}
        style={{
          backgroundColor: "#00bcd4",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
          marginTop: "10px"
        }}
      >
        {isLoading ? "Голосование..." : "Проголосовать"}
      </button>
      {error && <div style={{ marginTop: "10px", color: "#ff4d4d" }}>{error.message}</div>}
    </div>
  );
};

export default VoteForProposal;
