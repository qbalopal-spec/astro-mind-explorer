import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Calendar, Users } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  summary: string;
  topics: string[];
  organism?: string;
}

const mockPublications: Publication[] = [
  {
    id: '1',
    title: 'Effects of Microgravity on Bone Density in Long-Duration Spaceflight',
    authors: ['Dr. Jane Smith', 'Dr. Robert Chen', 'Dr. Maria Garcia'],
    year: 2023,
    summary: 'Comprehensive study of bone density changes in astronauts during extended missions. Key findings show 1-2% monthly bone mass loss in weight-bearing bones.',
    topics: ['Bone Density', 'Microgravity', 'Spaceflight'],
    organism: 'Human'
  },
  {
    id: '2',
    title: 'Radiation DNA Damage Mitigation Using Antioxidants in Space Environment',
    authors: ['Dr. Sarah Williams', 'Dr. James Lee'],
    year: 2023,
    summary: 'Investigation of antioxidant effectiveness in protecting cellular DNA from cosmic radiation damage during spaceflight.',
    topics: ['Radiation Biology', 'DNA Damage', 'Countermeasures'],
    organism: 'Cell Culture'
  },
  {
    id: '3',
    title: 'Plant Growth and Development in Reduced Gravity Conditions',
    authors: ['Dr. Michael Brown', 'Dr. Linda Zhang', 'Dr. Ahmed Hassan'],
    year: 2022,
    summary: 'Analysis of plant adaptation mechanisms in microgravity, focusing on root development and nutrient uptake efficiency.',
    topics: ['Plant Biology', 'Microgravity', 'Agriculture'],
    organism: 'Arabidopsis thaliana'
  },
  {
    id: '4',
    title: 'Immune System Response to Space Environment Stressors',
    authors: ['Dr. Emily Johnson', 'Dr. David Park'],
    year: 2024,
    summary: 'Study of immune system alterations during spaceflight, including T-cell function and inflammatory responses.',
    topics: ['Immunology', 'Space Medicine', 'Human Health'],
    organism: 'Human'
  },
  {
    id: '5',
    title: 'Muscle Atrophy Prevention Strategies in Microgravity',
    authors: ['Dr. Thomas Anderson', 'Dr. Sophie Martin'],
    year: 2023,
    summary: 'Evaluation of exercise protocols and pharmaceutical interventions to prevent muscle loss during extended space missions.',
    topics: ['Muscle Physiology', 'Countermeasures', 'Exercise'],
    organism: 'Human'
  }
];

const PublicationsExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPublications = mockPublications.filter(pub =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())) ||
    pub.organism?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search publications by topic, organism, condition..."
          className="pl-10 glass-effect border-primary/30 focus:border-primary/60 h-12 text-base"
        />
      </div>

      <div className="grid gap-4">
        {filteredPublications.map((pub) => (
          <Card key={pub.id} className="cosmic-card p-6 space-y-4 cursor-pointer">
            <div>
              <h3 className="text-lg font-bold text-foreground hover:text-gradient transition-all">
                {pub.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{pub.authors[0]} et al.</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{pub.year}</span>
                </div>
                {pub.organism && (
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    <span>{pub.organism}</span>
                  </div>
                )}
              </div>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {pub.summary}
            </p>

            <div className="flex flex-wrap gap-2">
              {pub.topics.map((topic, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="bg-primary/20 text-primary hover:bg-primary/30"
                >
                  {topic}
                </Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <p className="text-muted-foreground">No publications found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default PublicationsExplorer;
