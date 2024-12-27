"use client";

import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useAccount } from "wagmi";
import CreateProposal from "~~/components/CreateProposal";
import ProposalList from "~~/components/ProposalList";
import VoteForProposal from "~~/components/VoteForProposal";

const Page: NextPage = () => {
  const { address, isConnected } = useAccount();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl text-red-500">Пожалуйста, подключитесь к вашему кошельку</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-black mb-8">Голосование</h1>

      <div className="bg-blue-500 p-4 mb-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white">Создать предложение</h3>
        <CreateProposal />
      </div>

      <div className="bg-blue-500 p-4 mb-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white">Список предложений</h3>
        <ProposalList />
      </div>

      <div className="bg-blue-500 p-4 mb-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-white">Проголосовать</h3>
        <VoteForProposal />
      </div>
    </div>
  );
};

export default Page;
