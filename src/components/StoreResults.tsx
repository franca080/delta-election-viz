import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ElectionCard } from "@/components/ui/election-card";
import { StatsCard } from "@/components/ui/stats-card";
import { useToast } from "@/hooks/use-toast";
import { mockPollingUnits, mockParties, addNewResults } from "@/data/mock-election-data";
import { Plus, Save, Trash2 } from "lucide-react";

const resultSchema = z.object({
  polling_unit_uniqueid: z.string().min(1, "Please select a polling unit"),
  party_abbreviation: z.string().min(1, "Please select a party"),
  party_score: z.string().min(1, "Please enter vote count").transform(val => parseInt(val, 10)),
});

type ResultFormData = z.infer<typeof resultSchema>;

export function StoreResults() {
  const [currentResults, setCurrentResults] = useState<ResultFormData[]>([]);
  const [selectedPollingUnit, setSelectedPollingUnit] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<ResultFormData>({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      polling_unit_uniqueid: "",
      party_abbreviation: "",
      party_score: 0,
    },
  });

  const selectedUnit = mockPollingUnits.find(unit => unit.uniqueid.toString() === selectedPollingUnit);
  const totalVotes = currentResults.reduce((sum, result) => sum + result.party_score, 0);

  const onSubmit = (data: ResultFormData) => {
    // Check if party already exists for this polling unit
    const existingResult = currentResults.find(
      result => result.polling_unit_uniqueid === data.polling_unit_uniqueid && 
                result.party_abbreviation === data.party_abbreviation
    );

    if (existingResult) {
      toast({
        title: "Party Already Added",
        description: "This party already has a result for the selected polling unit. Please remove it first or choose a different party.",
        variant: "destructive",
      });
      return;
    }

    // Add the new result
    setCurrentResults(prev => [...prev, data]);
    form.reset({
      polling_unit_uniqueid: data.polling_unit_uniqueid,
      party_abbreviation: "",
      party_score: 0,
    });

    toast({
      title: "Result Added",
      description: `Added ${data.party_score} votes for ${data.party_abbreviation}`,
    });
  };

  const removeResult = (index: number) => {
    const removedResult = currentResults[index];
    setCurrentResults(prev => prev.filter((_, i) => i !== index));
    
    toast({
      title: "Result Removed",
      description: `Removed ${removedResult.party_score} votes for ${removedResult.party_abbreviation}`,
    });
  };

  const saveAllResults = () => {
    if (currentResults.length === 0) {
      toast({
        title: "No Results to Save",
        description: "Please add at least one result before saving.",
        variant: "destructive",
      });
      return;
    }

    // Save results to the global store
    const resultsToSave = currentResults.map(result => ({
      polling_unit_uniqueid: parseInt(result.polling_unit_uniqueid),
      party_abbreviation: result.party_abbreviation,
      party_score: result.party_score,
      entered_by_user: "admin",
      date_entered: new Date().toISOString().replace('T', ' ').slice(0, 19),
      user_ip_address: "192.168.1.100"
    }));

    const savedResults = addNewResults(resultsToSave);
    console.log("Successfully saved results:", savedResults);
    
    toast({
      title: "Results Saved Successfully!",
      description: `Saved ${currentResults.length} results for ${selectedUnit?.polling_unit_name}. Total results now: ${savedResults.length}`,
      variant: "default",
    });

    // Clear the form
    setCurrentResults([]);
    setSelectedPollingUnit("");
    form.reset();
  };

  const clearAllResults = () => {
    setCurrentResults([]);
    toast({
      title: "Results Cleared",
      description: "All unsaved results have been cleared.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Store Election Results</h2>
        <p className="text-muted-foreground">Enter and store election results for polling units in Delta State</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <ElectionCard title="Add New Result" description="Enter votes for each party at a polling unit">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="polling_unit_uniqueid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Polling Unit</FormLabel>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedPollingUnit(value);
                      }} 
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select polling unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockPollingUnits.map((unit) => (
                          <SelectItem key={unit.uniqueid} value={unit.uniqueid.toString()}>
                            {unit.polling_unit_name} - Unit {unit.polling_unit_number}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select the polling unit where votes were cast
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="party_abbreviation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Political Party</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select party" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {mockParties
                          .filter(party => !currentResults.some(result => 
                            result.party_abbreviation === party.partyid && 
                            result.polling_unit_uniqueid === selectedPollingUnit
                          ))
                          .map((party) => (
                            <SelectItem key={party.id} value={party.partyid}>
                              {party.partyid} - {party.partyname}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the political party
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="party_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vote Count</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter vote count" 
                        {...field} 
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Total number of votes received by this party
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={!selectedPollingUnit}>
                <Plus className="w-4 h-4 mr-2" />
                Add Result
              </Button>
            </form>
          </Form>
        </ElectionCard>

        {/* Current Results Preview */}
        <div className="space-y-4">
          {selectedUnit && (
            <ElectionCard 
              title="Selected Polling Unit"
              description={selectedUnit.polling_unit_description}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unit Name</p>
                  <p className="font-semibold">{selectedUnit.polling_unit_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unit Number</p>
                  <p className="font-semibold">{selectedUnit.polling_unit_number}</p>
                </div>
              </div>
            </ElectionCard>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatsCard
              label="Results Added"
              value={currentResults.length}
              subtitle="Parties recorded"
              variant="primary"
            />
            <StatsCard
              label="Total Votes"
              value={totalVotes.toLocaleString()}
              subtitle="Across all parties"
              variant="accent"
            />
          </div>
        </div>
      </div>

      {/* Current Results Table */}
      {currentResults.length > 0 && (
        <ElectionCard 
          title="Current Results" 
          description="Results ready to be saved"
        >
          <div className="space-y-4">
            <div className="space-y-3">
              {currentResults.map((result, index) => {
                const party = mockParties.find(p => p.partyid === result.party_abbreviation);
                const percentage = totalVotes > 0 ? ((result.party_score / totalVotes) * 100).toFixed(1) : 0;
                
                return (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-lg">{result.party_abbreviation}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {party?.partyname || 'Unknown Party'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold text-lg">{result.party_score.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{percentage}%</div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeResult(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
              <Button variant="hero" onClick={saveAllResults} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save All Results
              </Button>
              <Button variant="outline" onClick={clearAllResults} className="flex-1">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>
        </ElectionCard>
      )}
    </div>
  );
}