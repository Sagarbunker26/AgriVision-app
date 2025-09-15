'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function HelpPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {t('help_page.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('help_page.description')}
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t('help_page.faq.title')}</CardTitle>
            <CardDescription>
              {t('help_page.faq.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>{t('help_page.faq.q1')}</AccordionTrigger>
                <AccordionContent>
                  {t('help_page.faq.a1')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>{t('help_page.faq.q2')}</AccordionTrigger>
                <AccordionContent>
                  {t('help_page.faq.a2')}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>{t('help_page.faq.q3')}</AccordionTrigger>
                <AccordionContent>
                  {t('help_page.faq.a3')}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('help_page.contact.title')}</CardTitle>
            <CardDescription>
              {t('help_page.contact.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">{t('help_page.contact.phone')}</h3>
                <p className="text-muted-foreground">+91 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">{t('help_page.contact.email')}</h3>
                <p className="text-muted-foreground">support@agrivision.example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
