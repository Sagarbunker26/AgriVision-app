import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Mail, Phone } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Help &amp; Support
        </h1>
        <p className="text-muted-foreground">
          Find answers to your questions and get support here.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find quick answers to common questions about AgriVision.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How accurate is the disease detection?</AccordionTrigger>
                <AccordionContent>
                  Our AI model is trained on a vast dataset of plant images and achieves high accuracy. However, it should be used as a preliminary diagnostic tool and not as a replacement for professional advice.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What data is used for crop recommendations?</AccordionTrigger>
                <AccordionContent>
                  The recommendations are based on the soil data, weather conditions, and market trends you provide, combined with a large agricultural database to suggest the most suitable and sustainable crops.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure?</AccordionTrigger>
                <AccordionContent>
                  Yes, we prioritize your data security. All data is encrypted and stored securely. We do not share your farm's specific data with third parties without your consent.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>
              If you can't find the answer you're looking for, please reach out to us.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-muted-foreground">+91 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-muted-foreground">support@agrivision.example.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
