"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, MapPin, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import IssueMap from "@/components/issue-map"

// Mock data for demonstration
const ISSUES = [
  {
    id: 1,
    title: "Large pothole on Linking Road",
    description:
      "There's a dangerous pothole near the junction that's causing traffic and is a hazard for two-wheelers.",
    location: "Bandra West, Linking Road",
    category: "Roads",
    status: "In Progress",
    reportedBy: "Amit S.",
    reportedAt: "2 days ago",
    comments: 8,
    upvotes: 24,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/large_potholes-RCt9WINW5KlFRViGxL4ecVIWcCcYWd.jpeg",
  },
  {
    id: 2,
    title: "Irregular garbage collection",
    description: "Garbage hasn't been collected for the past 3 days in our area, causing hygiene issues.",
    location: "Andheri East, Marol",
    category: "Sanitation",
    status: "Reported",
    reportedBy: "Priya M.",
    reportedAt: "1 day ago",
    comments: 5,
    upvotes: 18,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/irregular_garbage-ySwsiUK3huI3dnI3wKbRATSHOcvO2w.jpeg",
  },
  {
    id: 3,
    title: "Water supply disruption",
    description: "No water supply since yesterday morning. Multiple buildings in the area are affected.",
    location: "Dadar West, Shivaji Park",
    category: "Water Supply",
    status: "Assigned",
    reportedBy: "Rahul K.",
    reportedAt: "12 hours ago",
    comments: 12,
    upvotes: 32,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/water_supply-sNdiSw2Lbeowh0EdXluI0vvsIUkdaJ.jpeg",
  },
  {
    id: 4,
    title: "Street light not working",
    description: "The street light at the corner of our lane has been out for a week, making it unsafe at night.",
    location: "Malad West, Marve Road",
    category: "Electricity",
    status: "Resolved",
    reportedBy: "Neha P.",
    reportedAt: "5 days ago",
    comments: 3,
    upvotes: 15,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/electricity-zwUfbjUPG5sG55nmAe44JrtXfVvap0.jpeg",
  },
  {
    id: 5,
    title: "Fallen tree blocking road",
    description: "A large tree has fallen and is partially blocking the road after last night's heavy rain.",
    location: "Powai, Hiranandani Gardens",
    category: "Environment",
    status: "Assigned",
    reportedBy: "Vikram T.",
    reportedAt: "8 hours ago",
    comments: 7,
    upvotes: 29,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/roads%26potholes-8PimJ0WB8jPgqWBD6ZsT5LpGBt2QOu.jpeg",
  },
  {
    id: 6,
    title: "Sewage overflow on street",
    description: "Sewage is overflowing onto the street causing bad smell and unhygienic conditions.",
    location: "Kurla West, LBS Marg",
    category: "Drainage",
    status: "In Progress",
    reportedBy: "Sanjay M.",
    reportedAt: "3 days ago",
    comments: 15,
    upvotes: 42,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/garbage_collection-kVPCIkyUVQxWLQdxP6xYE9jSJnF8YS.jpeg",
  },
]

// Status badge colors
const STATUS_COLORS = {
  Reported: "bg-yellow-100 text-yellow-800",
  Assigned: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-800",
}

export default function IssuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("list")

  // Filter issues based on search query and filters
  const filteredIssues = ISSUES.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || issue.category.toLowerCase() === categoryFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || issue.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reported Issues</h1>
          <p className="text-muted-foreground">Browse and track civic issues reported by citizens</p>
        </div>
        <Button asChild>
          <Link href="/report">Report New Issue</Link>
        </Button>
      </div>

      <div className="bg-muted rounded-lg p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues by keyword, location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="roads">Roads</SelectItem>
                <SelectItem value="water supply">Water Supply</SelectItem>
                <SelectItem value="electricity">Electricity</SelectItem>
                <SelectItem value="sanitation">Sanitation</SelectItem>
                <SelectItem value="drainage">Drainage</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="reported">Reported</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Tabs defaultValue="list" value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <Card key={issue.id} className="overflow-hidden">
                  {issue.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={issue.image || "/placeholder.svg"}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={STATUS_COLORS[issue.status as keyof typeof STATUS_COLORS]}>
                        {issue.status}
                      </Badge>
                      <Badge variant="secondary">{issue.category}</Badge>
                    </div>
                    <CardTitle className="mt-2 text-lg">
                      <Link href={`/issues/${issue.id}`} className="hover:underline group flex items-center">
                        {issue.title}
                        <ArrowUpRight className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{issue.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{issue.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 border-t flex justify-between items-center">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=30&width=30`} alt={issue.reportedBy} />
                        <AvatarFallback>
                          {issue.reportedBy
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{issue.reportedBy}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{issue.reportedAt}</span>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-muted-foreground">No issues found matching your filters.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchQuery("")
                    setCategoryFilter("all")
                    setStatusFilter("all")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="map" className="h-[600px]">
          <div className="rounded-lg overflow-hidden h-full w-full">
            <IssueMap height="100%" showFilters={true} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

