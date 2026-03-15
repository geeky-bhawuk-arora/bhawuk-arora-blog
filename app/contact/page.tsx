import { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Bhawuk Arora for projects, collaborations or just to say hello.',
};

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 w-full flex flex-col items-center">
            <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
                <ContactForm />
            </div>
        </main>
    );
}
