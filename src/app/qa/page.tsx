'use client';

import { ragBasedAgriculturalQA, RagBasedAgriculturalQAInput, RagBasedAgriculturalQAOutput } from "@/ai/flows/rag-based-agricultural-qa";
import { QAChat } from "@/components/agrivision/qa-chat";
import { useLanguage } from "@/hooks/use-language";

export default function QAPage() {
  const { t } = useLanguage();

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
          {t('qa_page.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('qa_page.description')}
        </p>
      </div>
      <QAChat getAnswer={getAnswer} />
    </div>
  );
}
