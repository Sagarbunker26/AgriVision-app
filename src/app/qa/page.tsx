import { ragBasedAgriculturalQA, RagBasedAgriculturalQAInput, RagBasedAgriculturalQAOutput } from "@/ai/flows/rag-based-agricultural-qa";
import { QAChat } from "@/components/agrivision/qa-chat";

export default function QAPage() {
  async function getAnswer(
    input: RagBasedAgriculturalQAInput
  ): Promise<RagBasedAgriculturalQAOutput> {
    'use server';
    return await ragBasedAgriculturalQA(input);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Agricultural Q&amp;A
        </h1>
        <p className="text-muted-foreground">
          Ask our AI anything about farming. Get instant, expert-backed answers.
        </p>
      </div>
      <QAChat getAnswer={getAnswer} />
    </div>
  );
}
