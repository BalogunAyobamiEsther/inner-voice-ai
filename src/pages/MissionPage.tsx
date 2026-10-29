import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MissionPage() {
  return (
    <div className="container py-12 px-4 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission & Vision</h1>
          <p className="text-xl text-muted-foreground italic">"Because silent struggles should never become crises."</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed text-foreground/80 space-y-4">
            <p>Youths are the leaders of tomorrow, and healthy youth build healthy nations.</p>
            <p>Many young people struggle with academic pressure, financial hardship, career uncertainty, family issues, relationship difficulties, loneliness, and personal challenges.</p>
            <p>Because they fear judgment or value privacy, many suffer in silence and delay seeking help. SafeSpace AI exists to provide a confidential first step toward support by helping young people express themselves safely and discover the most appropriate support options.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Vision</CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed text-foreground/80">
            <p>To create a world where no young person suffers in silence and where support is always within reach.</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}