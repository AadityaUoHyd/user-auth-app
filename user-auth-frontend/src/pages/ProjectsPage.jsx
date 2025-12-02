// ProjectsPage.jsx - Place this in src/pages or similar, and route to /dashboard/projects
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Folder, Link, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/utils/auth";
import { getProjects, createProject } from "@/services/auth.service"; // Assume for managing integrated projects
import toast from "react-hot-toast";

export default function ProjectsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", url: "" });

  // Mock projects; replace with real data from service
  const projects = [
    { id: 1, name: "E-Commerce App", description: "Online store with auth integration", url: "https://ecom.example.com", status: "active", users: 150, created: "2025-10-15" },
    { id: 2, name: "Blog Platform", description: "User auth for posts and comments", url: "https://blog.example.com", status: "active", users: 89, created: "2025-11-01" },
    { id: 3, name: "Task Manager", description: "Team auth and permissions", url: "https://tasks.example.com", status: "inactive", users: 0, created: "2025-11-20" },
  ];

  const handleCreateProject = async () => {
    try {
      const created = await createProject(newProject);
      projects.push(created); // Update local state or refetch
      toast.success("Project created!");
      setShowAddDialog(false);
      setNewProject({ name: "", description: "", url: "" });
    } catch (error) {
      toast.error("Failed to create project");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-screen-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Projects</h1>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Integrated Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
                <Input
                  placeholder="Project URL"
                  value={newProject.url}
                  onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                />
                <Button onClick={handleCreateProject} className="w-full">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Integrated Projects</CardTitle>
            <p className="text-sm text-muted-foreground">Apps using this auth service</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Active Users</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="flex items-center gap-2 font-medium">
                      <Folder className="h-4 w-4" />
                      {project.name}
                    </TableCell>
                    <TableCell>{project.description}</TableCell>
                    <TableCell>
                      <a href={project.url} className="text-blue-500 hover:underline">
                        {project.url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Badge variant={project.status === "active" ? "default" : "secondary"}>{project.status}</Badge>
                    </TableCell>
                    <TableCell>{project.users}</TableCell>
                    <TableCell>{project.created}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}