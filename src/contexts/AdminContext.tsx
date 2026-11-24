import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import initialContent from "@/data/padiaContent.json";

export interface Member {
  id: string;
  name: string;
  linkedin?: string;
  photo?: string;
  role?: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  technologies: string[];
  moreLink?: string;
  githubLink?: string;
}

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface AdminContextType {
  members: Member[];
  projects: Project[];
  saveStatus: SaveStatus;
  addMember: () => void;
  updateMember: (id: string, changes: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addProject: () => void;
  updateProject: (id: string, changes: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>(
    () => (initialContent.members as Member[]) ?? [],
  );
  const [projects, setProjects] = useState<Project[]>(
    () => (initialContent.projects as Project[]) ?? [],
  );
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  // Limpia cualquier dato viejo de localStorage para que la única fuente de verdad sea el código (`src/data/padiaContent.json`)
  useEffect(() => {
    try {
      localStorage.removeItem("admin_members");
      localStorage.removeItem("admin_projects");
      localStorage.removeItem("padia_migration_karly_v1");
      localStorage.removeItem("padia_migration_real_projects_v1");
      localStorage.removeItem("padia_migration_live_projects_v2");
    } catch {
      // ignore storage errors
    }
  }, []);

  // Persiste directamente en `src/data/padiaContent.json` a través del endpoint del servidor
  const persistToCode = useCallback(async (nextMembers: Member[], nextProjects: Project[]) => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members: nextMembers, projects: nextProjects }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaveStatus("saved");
    } catch {
      setSaveStatus("error");
    }
  }, []);

  const addMember = () => {
    setMembers((prev) => {
      const next = [
        ...prev,
        { id: crypto.randomUUID(), name: "", role: "", linkedin: "", photo: "", description: "" },
      ];
      void persistToCode(next, projects);
      return next;
    });
  };

  const updateMember = (id: string, changes: Partial<Member>) => {
    setMembers((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ...changes } : m));
      void persistToCode(next, projects);
      return next;
    });
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => {
      const next = prev.filter((m) => m.id !== id);
      void persistToCode(next, projects);
      return next;
    });
  };

  const addProject = () => {
    setProjects((prev) => {
      const next = [
        ...prev,
        { id: crypto.randomUUID(), title: "", status: "", technologies: [], moreLink: "", githubLink: "", description: "" },
      ];
      void persistToCode(members, next);
      return next;
    });
  };

  const updateProject = (id: string, changes: Partial<Project>) => {
    setProjects((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...changes } : p));
      void persistToCode(members, next);
      return next;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const next = prev.filter((p) => p.id !== id);
      void persistToCode(members, next);
      return next;
    });
  };

  return (
    <AdminContext.Provider
      value={{
        members,
        projects,
        saveStatus,
        addMember,
        updateMember,
        deleteMember,
        addProject,
        updateProject,
        deleteProject,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const ctx = useContext(AdminContext);
  if (!ctx) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return ctx;
};
