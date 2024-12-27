import { ethers } from "hardhat";
import { expect } from "chai";
import { VotingSystem } from "../typechain-types";

describe("Контракт VotingSystem", function () {
  let votingSystem: VotingSystem;
  let owner: any;
  let voter1: any;
  let voter2: any;

  beforeEach(async () => {
    const votingSystemFactory = await ethers.getContractFactory("VotingSystem");
    votingSystem = await votingSystemFactory.deploy();
    await votingSystem.waitForDeployment();

    [owner, voter1, voter2] = await ethers.getSigners();
  });

  it("Должен позволять создавать предложения", async () => {
    const description = "Предложение 1";

    await votingSystem.connect(owner).createProposal(description);

    const proposals = await votingSystem.getProposals();

    expect(proposals.length).to.equal(1);
    expect(proposals[0].description).to.equal(description);
    expect(proposals[0].voteCount).to.equal(0);
  });

  it("Должен позволять голосовать за предложение", async () => {
    const description = "Предложение 1";

    await votingSystem.connect(owner).createProposal(description);

    await votingSystem.connect(voter1).vote(0);

    const proposals = await votingSystem.getProposals();
    expect(proposals[0].voteCount).to.equal(1);
  });

  it("Должен запретить повторное голосование", async () => {
    const description = "Предложение 1";

    await votingSystem.connect(owner).createProposal(description);

    await votingSystem.connect(voter1).vote(0);

    await expect(votingSystem.connect(voter1).vote(0)).to.be.revertedWith(
      "Already voted on this proposal"
    );
  });

  it("Должен отклонять голосование за несуществующее предложение", async () => {
    await expect(votingSystem.connect(voter1).vote(999)).to.be.revertedWith(
      "Proposal does not exist"
    );
  });

  it("Должен учитывать голоса от нескольких пользователей", async () => {
    const description1 = "Предложение 1";
    const description2 = "Предложение 2";

    await votingSystem.connect(owner).createProposal(description1);
    await votingSystem.connect(owner).createProposal(description2);

    await votingSystem.connect(voter1).vote(0);
    await votingSystem.connect(voter2).vote(0);

    const proposals = await votingSystem.getProposals();
    expect(proposals[0].voteCount).to.equal(2);
    expect(proposals[1].voteCount).to.equal(0);
  });

  it("Должен генерировать события при создании предложений и голосовании", async () => {
    const description = "Предложение 1";

    await expect(votingSystem.connect(owner).createProposal(description))
      .to.emit(votingSystem, "ProposalCreated")
      .withArgs(0, description);

    await expect(votingSystem.connect(voter1).vote(0))
      .to.emit(votingSystem, "Voted")
      .withArgs(0, voter1.address);
  });
});
