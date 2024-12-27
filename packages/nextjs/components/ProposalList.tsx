import { useContractRead } from "wagmi";

const ProposalList = () => {
    const { data: proposals, isLoading } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "proposalId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    }
                ],
                "name": "ProposalCreated",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "proposalId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "voter",
                        "type": "address"
                    }
                ],
                "name": "Voted",
                "type": "event"
            },
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
            },
            {
                "inputs": [],
                "name": "getProposals",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "description",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "voteCount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct VotingSystem.Proposal[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "hasVoted",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "proposals",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "proposalId",
                        "type": "uint256"
                    }
                ],
                "name": "vote",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ],
        functionName: "getProposals",
    });

    if (isLoading) return <div>Загрузка...</div>;

    return (
        <div style={{ padding: "20px", backgroundColor: "#2a4b77", borderRadius: "8px", maxWidth: "500px", margin: "10px auto", color: "#fff" }}>
            <h4>Список предложений</h4>
            <ul>
                {proposals?.map((proposal, index) => (
                    <li key={index} style={{ marginBottom: "10px" }}>
                        <strong>{proposal.description}</strong> - {proposal.voteCount} голосов
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProposalList;
