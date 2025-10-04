import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface APODData {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
  hdurl?: string;
}

const APODSection = () => {
  const [apod, setApod] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const NASA_API_KEY = "Rhh8qg8AZoJiJbaiaBOur8iPdH4GdCyfKN2HgRos";

  const fetchAPOD = async () => {
    setLoading(true);
    try {
      // Generate random date between APOD start (1995-06-16) and today
      const startDate = new Date('1995-06-16');
      const endDate = new Date();
      const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
      const randomDate = new Date(randomTime).toISOString().split('T')[0];

      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${randomDate}`
      );

      if (!response.ok) throw new Error('Failed to fetch APOD');

      const data = await response.json();
      setApod(data);
    } catch (error) {
      console.error('Error fetching APOD:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch Astronomy Picture of the Day',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD();
  }, []);

  if (loading) {
    return (
      <Card className="cosmic-card p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin" />
        </div>
      </Card>
    );
  }

  if (!apod) return null;

  return (
    <Card className="cosmic-card overflow-hidden">
      <div className="relative aspect-video">
        {apod.media_type === 'image' ? (
          <img
            src={apod.url}
            alt={apod.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={apod.url}
            title={apod.title}
            className="w-full h-full"
            allowFullScreen
          />
        )}
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">{apod.title}</h3>
            <p className="text-sm text-muted-foreground">{apod.date}</p>
          </div>
          <Button
            onClick={fetchAPOD}
            variant="outline"
            size="sm"
            className="cosmic-button flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Random
          </Button>
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">{apod.explanation}</p>
        {apod.hdurl && (
          <Button
            asChild
            variant="outline"
            className="w-full cosmic-button"
          >
            <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
              View HD Image
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default APODSection;
