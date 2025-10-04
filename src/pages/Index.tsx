import { useState } from 'react';
import StarField from '@/components/StarField';
import ChatBot from '@/components/ChatBot';
import APODSection from '@/components/APODSection';
import PublicationsExplorer from '@/components/PublicationsExplorer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, BookOpen, Image as ImageIcon, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="w-12 h-12 text-primary animate-float" />
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              NASA Bioscience Explorer
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore space biology research, chat with AI about NASA missions, and discover the cosmos through data
          </p>
        </header>

        {/* Main Content Tabs */}
        <Tabs defaultValue="publications" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 glass-effect h-14">
            <TabsTrigger value="publications" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Publications</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="apod" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">APOD</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="publications" className="animate-fade-in">
            <PublicationsExplorer />
          </TabsContent>

          <TabsContent value="chat" className="animate-fade-in max-w-4xl mx-auto">
            <ChatBot />
          </TabsContent>

          <TabsContent value="apod" className="animate-fade-in max-w-4xl mx-auto">
            <APODSection />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Powered by NASA APIs, Lovable Cloud, and Lovable AI • Data from NASA Life Sciences</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
