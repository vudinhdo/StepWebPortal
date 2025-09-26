import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { devopsArticles } from "@/data/devops-articles-data";

export default function OptimizedDevOpsSeeder() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const seedMutation = useMutation({
    mutationFn: async () => {
      setIsSeeding(true);
      const results = [];
      
      for (const article of devopsArticles) {
        try {
          const response = await apiRequest("POST", "/api/articles", article);
          results.push({ success: true, title: article.title, response });
        } catch (error: any) {
          results.push({ success: false, title: article.title, error: error.message });
        }
      }
      
      return results;
    },
    onSuccess: (results) => {
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;
      
      toast({
        title: "DevOps Articles Seeded",
        description: `Successfully seeded ${successCount} articles${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
        variant: successCount > 0 ? "default" : "destructive"
      });
      
      queryClient.invalidateQueries({ queryKey: ["/api/articles"] });
      setIsSeeding(false);
    },
    onError: (error: any) => {
      toast({
        title: "Seeding Failed",
        description: error.message,
        variant: "destructive"
      });
      setIsSeeding(false);
    }
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>DevOps Articles Seeder</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Seed {devopsArticles.length} optimized DevOps articles to the database.
        </p>
        
        <div className="grid grid-cols-1 gap-2 text-xs">
          {devopsArticles.map((article, index) => (
            <div key={index} className="p-2 bg-muted rounded text-left">
              <div className="font-medium truncate">{article.title}</div>
              <div className="text-muted-foreground">{article.tags?.join(", ")}</div>
            </div>
          ))}
        </div>
        
        <Button 
          onClick={() => seedMutation.mutate()} 
          disabled={isSeeding || seedMutation.isPending}
          className="w-full"
          data-testid="button-seed-devops"
        >
          {isSeeding || seedMutation.isPending ? "Seeding..." : "Seed DevOps Articles"}
        </Button>
      </CardContent>
    </Card>
  );
}