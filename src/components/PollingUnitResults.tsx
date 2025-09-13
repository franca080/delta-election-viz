import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ElectionCard } from "@/components/ui/election-card";
import { StatsCard } from "@/components/ui/stats-card";
import { mockPollingUnits, storedResults, mockParties, AnnouncedPuResult, PollingUnit } from "@/data/mock-election-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function PollingUnitResults() {
  const [selectedPollingUnit, setSelectedPollingUnit] = useState<string>("");
  
  const selectedUnit = mockPollingUnits.find(unit => unit.uniqueid.toString() === selectedPollingUnit);
  const unitResults = selectedPollingUnit 
    ? storedResults.filter(result => result.polling_unit_uniqueid.toString() === selectedPollingUnit)
    : [];

  // Calculate statistics
  const totalVotes = unitResults.reduce((sum, result) => sum + result.party_score, 0);
  const sortedResults = unitResults.sort((a, b) => b.party_score - a.party_score);
  const winner = sortedResults[0];
  const runnerUp = sortedResults[1];

  // Prepare chart data
  const chartData = unitResults.map(result => {
    const party = mockParties.find(p => p.partyid === result.party_abbreviation);
    return {
      party: result.party_abbreviation,
      votes: result.party_score,
      partyName: party?.partyname || result.party_abbreviation
    };
  }).sort((a, b) => b.votes - a.votes);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Polling Unit Results</h2>
          <p className="text-muted-foreground">View detailed election results for individual polling units in Delta State</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="w-full sm:w-80">
            <label className="text-sm font-medium mb-2 block">Select Polling Unit</label>
            <Select value={selectedPollingUnit} onValueChange={setSelectedPollingUnit}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a polling unit..." />
              </SelectTrigger>
              <SelectContent>
                {mockPollingUnits.map((unit) => (
                  <SelectItem key={unit.uniqueid} value={unit.uniqueid.toString()}>
                    {unit.polling_unit_name} - Unit {unit.polling_unit_number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedPollingUnit && (
            <Button variant="election" onClick={() => setSelectedPollingUnit("")}>
              Clear Selection
            </Button>
          )}
        </div>
      </div>

      {selectedUnit && unitResults.length > 0 && (
        <div className="space-y-6">
          {/* Polling Unit Info */}
          <ElectionCard 
            title={selectedUnit.polling_unit_name}
            description={selectedUnit.polling_unit_description}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unit Number</p>
                <p className="text-lg font-semibold">{selectedUnit.polling_unit_number}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ward ID</p>
                <p className="text-lg font-semibold">{selectedUnit.ward_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">LGA ID</p>
                <p className="text-lg font-semibold">{selectedUnit.lga_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Location</p>
                <p className="text-sm">{selectedUnit.lat}, {selectedUnit.long}</p>
              </div>
            </div>
          </ElectionCard>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              label="Total Votes Cast"
              value={totalVotes.toLocaleString()}
              subtitle="Across all parties"
              variant="primary"
            />
            
            {winner && (
              <StatsCard
                label="Leading Party"
                value={winner.party_abbreviation}
                subtitle={`${winner.party_score.toLocaleString()} votes (${((winner.party_score / totalVotes) * 100).toFixed(1)}%)`}
                variant="accent"
              />
            )}
            
            {runnerUp && (
              <StatsCard
                label="Runner-up"
                value={runnerUp.party_abbreviation}
                subtitle={`${runnerUp.party_score.toLocaleString()} votes (${((runnerUp.party_score / totalVotes) * 100).toFixed(1)}%)`}
              />
            )}
          </div>

          {/* Results Chart */}
          <ElectionCard title="Vote Distribution" description="Visual breakdown of votes by party">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="party" />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => {
                      const party = mockParties.find(p => p.partyid === label);
                      return party?.partyname || label;
                    }}
                    formatter={(value) => [value, "Votes"]}
                  />
                  <Bar 
                    dataKey="votes" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ElectionCard>

          {/* Detailed Results Table */}
          <ElectionCard title="Detailed Results" description="Complete breakdown of votes by party">
            <div className="space-y-3">
              {sortedResults.map((result, index) => {
                const party = mockParties.find(p => p.partyid === result.party_abbreviation);
                const percentage = ((result.party_score / totalVotes) * 100).toFixed(1);
                const isWinner = index === 0;
                const isRunnerUp = index === 1;
                
                return (
                  <div 
                    key={result.result_id}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border/50 hover:shadow-glow transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${
                          isWinner ? 'bg-winner' : isRunnerUp ? 'bg-runner-up' : 'bg-muted'
                        }`} />
                        <span className="font-semibold">{result.party_abbreviation}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {party?.partyname || 'Unknown Party'}
                      </span>
                      {isWinner && <Badge variant="default" className="bg-winner text-winner-foreground">Winner</Badge>}
                      {isRunnerUp && <Badge variant="secondary" className="bg-runner-up text-runner-up-foreground">Runner-up</Badge>}
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-lg">{result.party_score.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ElectionCard>
        </div>
      )}

      {selectedPollingUnit && unitResults.length === 0 && (
        <ElectionCard title="No Results Found">
          <p className="text-muted-foreground">No election results found for the selected polling unit.</p>
        </ElectionCard>
      )}

      {!selectedPollingUnit && (
        <ElectionCard title="Select a Polling Unit">
          <p className="text-muted-foreground">Please select a polling unit from the dropdown above to view detailed election results.</p>
        </ElectionCard>
      )}
    </div>
  );
}