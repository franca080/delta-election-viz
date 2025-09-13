import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ElectionCard } from "@/components/ui/election-card";
import { StatsCard } from "@/components/ui/stats-card";
import { mockLGAs, mockPollingUnits, storedResults, mockParties } from "@/data/mock-election-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export function LGAResults() {
  const [selectedLGA, setSelectedLGA] = useState<string>("");

  // Calculate aggregated results for the selected LGA
  const lgaResults = useMemo(() => {
    if (!selectedLGA) return null;

    const lgaId = parseInt(selectedLGA);
    const lgaInfo = mockLGAs.find(lga => lga.lga_id === lgaId);
    
    // Find all polling units in this LGA
    const lgaPollingUnits = mockPollingUnits.filter(unit => unit.lga_id === lgaId);
    const pollingUnitIds = lgaPollingUnits.map(unit => unit.uniqueid);
    
    // Find all results for polling units in this LGA
    const lgaVotes = storedResults.filter(result => 
      pollingUnitIds.includes(result.polling_unit_uniqueid)
    );

    // Aggregate votes by party
    const partyTotals = lgaVotes.reduce((acc, result) => {
      if (!acc[result.party_abbreviation]) {
        acc[result.party_abbreviation] = 0;
      }
      acc[result.party_abbreviation] += result.party_score;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort
    const sortedResults = Object.entries(partyTotals)
      .map(([party, votes]) => ({ party, votes }))
      .sort((a, b) => b.votes - a.votes);

    const totalVotes = sortedResults.reduce((sum, result) => sum + result.votes, 0);

    return {
      lga: lgaInfo,
      pollingUnits: lgaPollingUnits.length,
      totalVotes,
      results: sortedResults,
      winner: sortedResults[0],
      runnerUp: sortedResults[1]
    };
  }, [selectedLGA]);

  // Prepare chart data
  const chartData = lgaResults?.results.map(result => {
    const party = mockParties.find(p => p.partyid === result.party);
    return {
      party: result.party,
      votes: result.votes,
      partyName: party?.partyname || result.party,
      percentage: ((result.votes / lgaResults.totalVotes) * 100).toFixed(1)
    };
  }) || [];

  // Colors for pie chart
  const COLORS = ['hsl(var(--winner))', 'hsl(var(--runner-up))', 'hsl(var(--accent))', 'hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Local Government Area Results</h2>
          <p className="text-muted-foreground">Aggregated election results by Local Government Area in Delta State</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
          <div className="w-full sm:w-80">
            <label className="text-sm font-medium mb-2 block">Select Local Government Area</label>
            <Select value={selectedLGA} onValueChange={setSelectedLGA}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an LGA..." />
              </SelectTrigger>
              <SelectContent>
                {mockLGAs.map((lga) => (
                  <SelectItem key={lga.lga_id} value={lga.lga_id.toString()}>
                    {lga.lga_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedLGA && (
            <Button variant="election" onClick={() => setSelectedLGA("")}>
              Clear Selection
            </Button>
          )}
        </div>
      </div>

      {lgaResults && (
        <div className="space-y-6">
          {/* LGA Info */}
          <ElectionCard 
            title={lgaResults.lga!.lga_name}
            description={lgaResults.lga!.lga_description}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">LGA ID</p>
                <p className="text-lg font-semibold">{lgaResults.lga!.lga_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">State ID</p>
                <p className="text-lg font-semibold">{lgaResults.lga!.state_id} (Delta State)</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Polling Units</p>
                <p className="text-lg font-semibold">{lgaResults.pollingUnits}</p>
              </div>
            </div>
          </ElectionCard>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              label="Total Votes Cast"
              value={lgaResults.totalVotes.toLocaleString()}
              subtitle={`Across ${lgaResults.pollingUnits} polling units`}
              variant="primary"
            />
            
            {lgaResults.winner && (
              <StatsCard
                label="Leading Party"
                value={lgaResults.winner.party}
                subtitle={`${lgaResults.winner.votes.toLocaleString()} votes (${((lgaResults.winner.votes / lgaResults.totalVotes) * 100).toFixed(1)}%)`}
                variant="accent"
              />
            )}
            
            {lgaResults.runnerUp && (
              <StatsCard
                label="Runner-up"
                value={lgaResults.runnerUp.party}
                subtitle={`${lgaResults.runnerUp.votes.toLocaleString()} votes (${((lgaResults.runnerUp.votes / lgaResults.totalVotes) * 100).toFixed(1)}%)`}
              />
            )}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <ElectionCard title="Vote Distribution" description="Votes by party (Bar Chart)">
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

            {/* Pie Chart */}
            <ElectionCard title="Vote Share" description="Percentage distribution by party">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ party, percentage }) => `${party}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="votes"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, "Votes"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </ElectionCard>
          </div>

          {/* Detailed Results Table */}
          <ElectionCard title="Detailed Results" description="Complete breakdown of votes by party">
            <div className="space-y-3">
              {lgaResults.results.map((result, index) => {
                const party = mockParties.find(p => p.partyid === result.party);
                const percentage = ((result.votes / lgaResults.totalVotes) * 100).toFixed(1);
                const isWinner = index === 0;
                const isRunnerUp = index === 1;
                
                return (
                  <div 
                    key={result.party}
                    className="flex items-center justify-between p-4 rounded-lg bg-gradient-card border border-border/50 hover:shadow-glow transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded-full ${
                          isWinner ? 'bg-winner' : isRunnerUp ? 'bg-runner-up' : 'bg-muted'
                        }`} />
                        <span className="font-semibold text-lg">{result.party}</span>
                      </div>
                      <span className="text-muted-foreground">
                        {party?.partyname || 'Unknown Party'}
                      </span>
                      {isWinner && <Badge variant="default" className="bg-winner text-winner-foreground">Winner</Badge>}
                      {isRunnerUp && <Badge variant="secondary" className="bg-runner-up text-runner-up-foreground">Runner-up</Badge>}
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-xl">{result.votes.toLocaleString()}</div>
                      <div className="text-muted-foreground">{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ElectionCard>
        </div>
      )}

      {!selectedLGA && (
        <ElectionCard title="Select a Local Government Area">
          <p className="text-muted-foreground">Please select an LGA from the dropdown above to view aggregated election results.</p>
        </ElectionCard>
      )}
    </div>
  );
}