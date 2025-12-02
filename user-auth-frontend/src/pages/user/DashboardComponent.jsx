import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Menu,
  Bell,
  Search,
  Plus,
  Settings,
  LogOut,
  Home,
  BarChart2,
  Users,
  FolderGit2,
  User,
  UserCog
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function DashboardComponent() {
return (<>
    <div className="flex items-center justify-between gap-2 m-4">
                  <div>
                    <h1 className="text-3xl font-semibold">Overview</h1>
                    <p className="text-sm text-muted-foreground">
                      Quick insights for your project.
                    </p>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create new item</DialogTitle>
                        <DialogDescription>
                          Fill the form below and hit create.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-3 py-3">
                        <div className="grid gap-1">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" placeholder="Enter title" />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="desc">Description</Label>
                          <Input id="desc" placeholder="Short description" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="button">Create</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* KPIs */}
                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <KpiCard
                    title="Revenue"
                    value="₹20,124,120"
                    hint="▲ 5.3% this week"
                  />
                  <KpiCard title="Orders" value="2,108" hint="▲ 1.1%" />
                  <KpiCard title="Active Users" value="27,134" hint="▼ 0.6%" />
                  <KpiCard
                    title="Uptime"
                    value="99.98%"
                    hint={<Progress value={97} />}
                  />
                </section>

                {/* Tabs + Table */}
                <section className="rounded-lg border bg-card m-4">
                  <Tabs defaultValue="all">
                    <div className="flex items-center justify-between border-b p-4">
                      <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="archived">Archived</TabsTrigger>
                      </TabsList>
                      <div className="text-sm text-muted-foreground">
                        Showing 4 results
                      </div>
                    </div>

                    <TabsContent value="all">
                      <DataTable rows={ROWS} />
                    </TabsContent>
                    <TabsContent value="active">
                      <DataTable rows={ROWS.filter((r) => r.status === "Active")} />
                    </TabsContent>
                    <TabsContent value="archived">
                      <DataTable
                        rows={ROWS.filter((r) => r.status === "Archived")}
                      />
                    </TabsContent>
                  </Tabs>
                </section>
    </>);
}

function KpiCard({ title, value, hint }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="mt-2 text-xs text-muted-foreground">
          {typeof hint === "string" ? (
            <Badge variant="secondary">{hint}</Badge>
          ) : (
            hint
          )}
        </div>
      </CardContent>
    </Card>
  );
}


const ROWS = [
  {
    id: 1,
    name: "Trip Plus",
    status: "Active",
    owner: "Shreya Das",
    updated: "4h ago",
  },
  {
    id: 2,
    name: "Site Ghost",
    status: "Active",
    owner: "Piyush Kumar",
    updated: "1w ago",
  },
  {
    id: 3,
    name: "Project Knight",
    status: "Active",
    owner: "Julie Sharma",
    updated: "4d ago",
  },
  {
    id: 4,
    name: "Pine Camp",
    status: "Archived",
    owner: "Arjun Singh",
    updated: "2w ago",
  },
];


function DataTable({ rows }) {
  if (!rows?.length)
    return (
      <div className="p-6 text-sm text-muted-foreground">No data found.</div>
    );
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead className="text-right pr-4">Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell>
                <Badge
                  variant={r.status === "Active" ? "default" : "secondary"}
                >
                  {r.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{r.owner}</TableCell>
              <TableCell className="text-right pr-4 text-muted-foreground">
                {r.updated}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DashboardComponent;