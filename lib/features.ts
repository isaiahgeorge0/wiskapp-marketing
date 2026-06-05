import {
  CalendarDays,
  Clapperboard,
  FolderKanban,
  ListTodo,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const features: Feature[] = [
  {
    name: "Projects",
    description:
      "Track client work, deadlines, and next actions. See Vercel deployment health and GitHub activity right on the card.",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    description:
      "Never miss what needs doing. Priority badges, due dates, and clean checklists keep you on top of your work.",
    icon: ListTodo,
  },
  {
    name: "Goals",
    description:
      "Set revenue targets and track progress with visual indicators. Keep your long-term vision in sight.",
    icon: Target,
  },
  {
    name: "Calendar",
    description:
      "Project deadlines, task due dates, and content plans in one unified calendar. See what's coming in the next 30, 60, or 90 days.",
    icon: CalendarDays,
  },
  {
    name: "Leads",
    description:
      "Capture inbound enquiries and move them through your pipeline from New to Won. Track conversion rate and pipeline value.",
    icon: Users,
  },
  {
    name: "Content",
    description:
      "Plan and schedule content across TikTok, Instagram, YouTube, and LinkedIn. Track your publishing streak.",
    icon: Clapperboard,
  },
];
