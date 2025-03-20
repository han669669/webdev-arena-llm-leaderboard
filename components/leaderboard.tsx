"use client"

import { useState } from "react"
import { actualData } from "./actualData"
import { ArrowDown, ArrowUp, ArrowUpDown, HelpCircle, ChevronRight, Calendar, Zap, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type SortDirection = "asc" | "desc" | null
type SortColumn =
  | "rank"
  | "model"
  | "arenaScore"
  | "inputCost"
  | "outputCost"
  | "ci"
  | "votes"
  | "organization"
  | "license"
  | null

// ModelCard component for mobile view
function ModelCard({ item, index }: { item: (typeof actualData)[0]; index: number }) {
  // Use local state for each card to track open/closed state
  const [isOpen, setIsOpen] = useState(index < 3)

  return (
    <div
      className={`
      p-5 border border-indigo-100 dark:border-indigo-900/50 rounded-xl mb-4 
      transition-all duration-300 hover:shadow-md
      ${index <= 2 ? "bg-gradient-to-r from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/50" : "bg-white dark:bg-slate-900"}
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            {item.rank === 1 ? (
              <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 border-none shadow-sm text-base px-3 py-1">
                {item.rank}
              </Badge>
            ) : item.rank === 2 ? (
              <Badge className="bg-gradient-to-r from-slate-300 to-slate-400 hover:from-slate-400 hover:to-slate-500 border-none shadow-sm text-base px-3 py-1">
                {item.rank}
              </Badge>
            ) : item.rank === 3 ? (
              <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 border-none shadow-sm text-base px-3 py-1">
                {item.rank}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-base px-3 py-1">
                {item.rank}
              </Badge>
            )}
          </div>
          <div>
            <h3
              className={`flex items-center text-lg ${index <= 2 ? "font-semibold text-indigo-900 dark:text-indigo-300" : "font-medium"}`}
            >
                              <img src={`/${item.organization.toLowerCase()}.svg`} alt={item.organization} className="mr-2 h-5 w-5"  />
              {item.model}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">{item.organization}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div
              className={`text-lg ${index <= 2 ? "font-semibold text-indigo-600 dark:text-indigo-400" : "font-medium"}`}
            >
              {item.arenaScore}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Score</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-10 w-10 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
            aria-label={isOpen ? "Hide details" : "Show details"}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="pt-5 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-y-4 gap-x-3 text-base">
            <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-lg">
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1 flex items-center gap-1">
                <Zap className="h-4 w-4" /> Input Cost
              </div>
              <div className="font-medium">{item.inputCost}</div>
            </div>
            <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-lg">
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1 flex items-center gap-1">
                <Zap className="h-4 w-4" /> Output Cost
              </div>
              <div className="font-medium">{item.outputCost}</div>
            </div>
            <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-lg">
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1 flex items-center gap-1">
                <HelpCircle className="h-4 w-4" /> 95% CI
              </div>
              <div className="font-medium">{item.ci}</div>
            </div>
            <div className="bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-lg">
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">Votes</div>
              <div className="font-medium">{item.votes.toLocaleString()}</div>
            </div>
            <div className="col-span-2 bg-indigo-50/50 dark:bg-indigo-950/30 p-3 rounded-lg">
              <div className="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-1">License</div>
              <div className="font-medium">{item.license}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Leaderboard component
export function Leaderboard() {
  const [data, setData] = useState(actualData)
  const [sortColumn, setSortColumn] = useState<SortColumn>("rank")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [searchQuery, setSearchQuery] = useState("")

  // Format current date as "15 March 2024"
  const currentDate = new Date("2025-03-21T03:41:48+08:00")
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Toggle direction if clicking the same column
      const newDirection = sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc"
      setSortDirection(newDirection)
      if (newDirection === null) {
        setSortColumn(null)
        setData(actualData) // Reset to original order
      } else {
        sortData(column, newDirection)
      }
    } else {
      // Set new column and default to ascending
      setSortColumn(column)
      setSortDirection("asc")
      sortData(column, "asc")
    }
  }

  const sortData = (column: SortColumn, direction: "asc" | "desc") => {
    const sortedData = [...data].sort((a, b) => {
      if (column === null) return 0

      // Handle string values that might include $ or other characters
      let valueA = a[column]
      let valueB = b[column]

      // For cost columns, remove $ and convert to number
      if (column === "inputCost" || column === "outputCost") {
        valueA = Number.parseFloat(a[column].replace("$", ""))
        valueB = Number.parseFloat(b[column].replace("$", ""))
      }

      // For CI column, remove ± and convert to number
      if (column === "ci") {
        valueA = Number.parseFloat(a[column].replace("±", ""))
        valueB = Number.parseFloat(b[column].replace("±", ""))
      }

      if (valueA < valueB) return direction === "asc" ? -1 : 1
      if (valueA > valueB) return direction === "asc" ? 1 : -1
      return 0
    })

    setData(sortedData)
  }

  const getSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return <ArrowUpDown className="h-4 w-4 ml-1" />
    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4 ml-1" />
    if (sortDirection === "desc") return <ArrowDown className="h-4 w-4 ml-1" />
    return <ArrowUpDown className="h-4 w-4 ml-1" />
  }

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    return searchTerms.every(
      (term) =>
        item.model.toLowerCase().includes(term) ||
        item.organization.toLowerCase().includes(term) ||
        item.license.toLowerCase().includes(term)
    );
  });

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-full shadow-sm border border-indigo-100 dark:border-indigo-900/50">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span>Last updated: {formattedDate}<small> (data verified by human)</small></span>
          </div>

          <div className="flex w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                id="search-models"
                placeholder="Search models..."
                className="w-full pl-8 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Card className="border-indigo-100 dark:border-indigo-900/50 shadow-lg bg-white/80 dark:bg-slate-900/80">
          <div className="flex items-center p-4 border-b border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-indigo-500" />
              <span className="text-sm font-medium">Models</span>
              <Badge variant="outline" className="ml-2">
                {filteredData.length} total
              </Badge>
            </div>
          </div>

          <CardContent className="p-0 sm:p-6">
            {/* Mobile view (card-based layout) */}
            <div className="sm:hidden p-4">
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => <ModelCard key={item.id} item={item} index={index} />)
              ) : (
                <div className="text-center py-8 text-muted-foreground">No models found matching your search.</div>
              )}
            </div>

            {/* Desktop view (table layout) */}
            <div className="hidden sm:block relative overflow-x-auto rounded-lg">
              <Table className="border-indigo-100 dark:border-indigo-900/50 w-full">
                <TableHeader className="bg-indigo-50/70 dark:bg-indigo-950/30 backdrop-blur-sm">
                  <TableRow className="hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20 transition-colors">
                    <TableHead className="w-[5%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("rank")}
                      >
                        Rank {getSortIcon("rank")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[20%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base text-left"
                        onClick={() => handleSort("model")}
                      >
                        Model {getSortIcon("model")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[10%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("arenaScore")}
                      >
                        Arena Score {getSortIcon("arenaScore")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[10%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("inputCost")}
                      >
                        Input Cost {getSortIcon("inputCost")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[10%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("outputCost")}
                      >
                        Output Cost {getSortIcon("outputCost")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[8%] font-medium text-base">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          className="flex items-center p-0 h-auto font-medium text-base"
                          onClick={() => handleSort("ci")}
                        >
                          95% CI {getSortIcon("ci")}
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" className="p-0 h-auto ml-1">
                              <HelpCircle className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>95% Confidence Interval</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableHead>
                    <TableHead className="w-[8%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("votes")}
                      >
                        Votes {getSortIcon("votes")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[15%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("organization")}
                      >
                        Organization {getSortIcon("organization")}
                      </Button>
                    </TableHead>
                    <TableHead className="w-[14%] font-medium text-base">
                      <Button
                        variant="ghost"
                        className="flex items-center p-0 h-auto font-medium text-base"
                        onClick={() => handleSort("license")}
                      >
                        License {getSortIcon("license")}
                      </Button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <TableRow
                        key={item.id}
                        className={`
                          transition-all duration-200 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30
                          ${index <= 2 ? "bg-gradient-to-r from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/50" : ""}
                        `}
                      >
                        <TableCell className="font-medium py-4">
                          {item.rank === 1 ? (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 border-none shadow-sm text-base px-3 py-1">
                              {item.rank}
                            </Badge>
                          ) : item.rank === 2 ? (
                            <Badge className="bg-gradient-to-r from-slate-300 to-slate-400 hover:from-slate-400 hover:to-slate-500 border-none shadow-sm text-base px-3 py-1">
                              {item.rank}
                            </Badge>
                          ) : item.rank === 3 ? (
                            <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 border-none shadow-sm text-base px-3 py-1">
                              {item.rank}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-base px-3 py-1">
                              {item.rank}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-medium py-4 text-base">
                          {index <= 2 ? (
                            <div className="flex items-center">
                              <img src={`/${item.organization.toLowerCase()}.svg`} alt={item.organization} className="mr-2 h-5 w-5" />
                              <span className="font-semibold text-indigo-900 dark:text-indigo-300">{item.model}</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <img src={`/${item.organization.toLowerCase()}.svg`} alt={item.organization} className="mr-2 h-5 w-5" />
                              {item.model}
                            </div>
                          )}
                          <div className="text-sm text-muted-foreground mt-1 text-center">{item.organization}</div>
                        </TableCell>
                        <TableCell
                          className={`py-4 text-base ${index <= 2 ? "font-semibold text-indigo-600 dark:text-indigo-400" : ""}`}
                        >
                          {item.arenaScore}
                        </TableCell>
                        <TableCell className="py-4 text-base">{item.inputCost}</TableCell>
                        <TableCell className="py-4 text-base">{item.outputCost}</TableCell>
                        <TableCell className="py-4 text-base">{item.ci}</TableCell>
                        <TableCell className="py-4 text-base">{item.votes.toLocaleString()}</TableCell>
                        <TableCell className="py-4 text-base hidden lg:table-cell">{item.organization}</TableCell>
                        <TableCell className="py-4 text-base">{item.license}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                        No models found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-center p-4 border-t border-indigo-100 dark:border-indigo-900/50">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{filteredData.length}</span> of{" "}
              <span className="font-medium">{actualData.length}</span> models
            </div>
            <div className="text-xs text-muted-foreground ml-2">
              Data sourced from: <a href="https://web.lmarena.ai/leaderboard" target="_blank" rel="noopener noreferrer">web.lmarena.ai/leaderboard</a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  )
}
