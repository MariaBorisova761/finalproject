// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    struct Proposal {
        string description;
        uint voteCount;
    }

    mapping(address => mapping(uint => bool)) public hasVoted;
    Proposal[] public proposals;

    event ProposalCreated(uint proposalId, string description);
    event Voted(uint proposalId, address voter);

    function createProposal(string memory description) public {
        proposals.push(Proposal({description: description, voteCount: 0}));
        emit ProposalCreated(proposals.length - 1, description);
    }

    function vote(uint proposalId) public {
        require(proposalId < proposals.length, "Proposal does not exist");
        require(!hasVoted[msg.sender][proposalId], "Already voted on this proposal");

        proposals[proposalId].voteCount++;
        hasVoted[msg.sender][proposalId] = true;

        emit Voted(proposalId, msg.sender);
    }

    function getProposals() public view returns (Proposal[] memory) {
        return proposals;
    }
}
