"use client"

import { useState } from "react"
import { MapPin, AlertTriangle, Droplets, Zap, AlertCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for demonstration
const MOCK_ISSUES = [
  {
    id: 1,
    lat: 19.076,
    lng: 72.877,
    title: "Pothole",
    category: "Roads",
    status: "In Progress",
    severity: "High",
    reportedAt: "2 days ago",
  },
  {
    id: 2,
    lat: 19.089,
    lng: 72.869,
    title: "Garbage Collection",
    category: "Sanitation",
    status: "Reported",
    severity: "Medium",
    reportedAt: "1 day ago",
  },
  {
    id: 3,
    lat: 19.065,
    lng: 72.889,
    title: "Street Light Not Working",
    category: "Electricity",
    status: "Resolved",
    severity: "Low",
    reportedAt: "5 days ago",
  },
  {
    id: 4,
    lat: 19.082,
    lng: 72.857,
    title: "Water Leakage",
    category: "Water Supply",
    status: "Assigned",
    severity: "Medium",
    reportedAt: "3 days ago",
  },
  {
    id: 5,
    lat: 19.071,
    lng: 72.883,
    title: "Fallen Tree",
    category: "Environment",
    status: "Resolved",
    severity: "High",
    reportedAt: "1 week ago",
  },
  {
    id: 6,
    lat: 19.055,
    lng: 72.865,
    title: "Broken Sidewalk",
    category: "Roads",
    status: "Reported",
    severity: "Medium",
    reportedAt: "4 days ago",
  },
  {
    id: 7,
    lat: 19.095,
    lng: 72.885,
    title: "Sewage Overflow",
    category: "Sanitation",
    status: "In Progress",
    severity: "High",
    reportedAt: "2 days ago",
  },
]

// Status colors for map markers
const STATUS_COLORS = {
  Reported: "#f59e0b", // Amber
  Assigned: "#3b82f6", // Blue
  "In Progress": "#8b5cf6", // Purple
  Resolved: "#10b981", // Green
  Closed: "#6b7280", // Gray
}

// Category icons
const CATEGORY_ICONS = {
  Roads: <MapPin className="h-4 w-4" />,
  Sanitation: <AlertCircle className="h-4 w-4" />,
  Electricity: <Zap className="h-4 w-4" />,
  "Water Supply": <Droplets className="h-4 w-4" />,
  Environment: <AlertTriangle className="h-4 w-4" />,
}

interface IssueMapProps {
  height?: string
  interactive?: boolean
  showFilters?: boolean
}

export default function IssueMap({ height = "100%", interactive = true, showFilters = false }: IssueMapProps) {
  const [mapView, setMapView] = useState<"all" | "resolved" | "unresolved">("all")
  const [selectedIssue, setSelectedIssue] = useState<number | null>(null)

  // Filter issues based on map view
  const filteredIssues = MOCK_ISSUES.filter((issue) => {
    if (mapView === "all") return true
    if (mapView === "resolved") return issue.status === "Resolved" || issue.status === "Closed"
    if (mapView === "unresolved") return issue.status !== "Resolved" && issue.status !== "Closed"
    return true
  })

  return (
    <div className="flex flex-col h-full">
      {showFilters && (
        <div className="p-2 bg-background border-b">
          <Tabs defaultValue="all" value={mapView} onValueChange={(value) => setMapView(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Issues</TabsTrigger>
              <TabsTrigger value="unresolved">Unresolved</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}

      <div className="w-full flex-1 relative overflow-hidden" style={{ height }}>
        <div className="absolute inset-0">
          {/* Mumbai Map Image - Fill the entire space */}
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mumbai%20Map-CfJ9Lo7ozdWcVRY0HrA5BXKZoHotix.jpeg"
            alt="Mumbai Map"
            className="w-full h-full object-cover"
          />

          {/* Issue Markers - Simulated as absolute positioned dots */}
          {filteredIssues.map((issue) => {
            // Calculate position based on the map dimensions
            // These values are approximations and would need to be adjusted based on the actual map
            const top = `${30 + (issue.lat - 19.05) * 1500}px`
            const left = `${150 + (issue.lng - 72.85) * 1500}px`

            return (
              <div
                key={issue.id}
                className="absolute w-5 h-5 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-125 transition-transform"
                style={{
                  backgroundColor: STATUS_COLORS[issue.status as keyof typeof STATUS_COLORS],
                  top: top,
                  left: left,
                  borderWidth: issue.status === "Resolved" || issue.status === "Closed" ? "2px" : "0",
                  zIndex: issue.status === "Resolved" || issue.status === "Closed" ? 1 : 2,
                }}
                title={`${issue.title} - ${issue.status}`}
                onClick={() => setSelectedIssue(issue.id === selectedIssue ? null : issue.id)}
              />
            )
          })}

          {/* Info window for selected issue */}
          {selectedIssue && (
            <div
              className="absolute bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg z-20"
              style={{
                top: `${30 + (MOCK_ISSUES.find((i) => i.id === selectedIssue)?.lat! - 19.05) * 1500 - 80}px`,
                left: `${150 + (MOCK_ISSUES.find((i) => i.id === selectedIssue)?.lng! - 72.85) * 1500}px`,
              }}
            >
              <h3 className="font-bold text-sm">{MOCK_ISSUES.find((i) => i.id === selectedIssue)?.title}</h3>
              <div className="text-xs mt-1">
                <p>
                  <strong>Category:</strong> {MOCK_ISSUES.find((i) => i.id === selectedIssue)?.category}
                </p>
                <p>
                  <strong>Status:</strong> {MOCK_ISSUES.find((i) => i.id === selectedIssue)?.status}
                </p>
                <p>
                  <strong>Reported:</strong> {MOCK_ISSUES.find((i) => i.id === selectedIssue)?.reportedAt}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Map legend */}
        <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md text-xs z-10">
          <div className="font-medium mb-1">Map Legend</div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS["Reported"] }}></div>
            <span>Reported</span>
          </div>
          <div className="flex items-center gap-1 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: STATUS_COLORS["In Progress"] }}></div>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: STATUS_COLORS["Resolved"] }}
            ></div>
            <span>Resolved</span>
          </div>
        </div>
      </div>
    </div>
  )
}

