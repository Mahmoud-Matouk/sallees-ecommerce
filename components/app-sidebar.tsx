'use client';

import * as React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { NavDocuments } from '@/components/nav-documents';
import { NavSecondary } from '@/components/nav-secondary';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
} from 'lucide-react';

const data = {
  company: {
    name: 'Sallees',
  },
  user: {
    name: 'Mahmoud Matouk',
    email: 'Mahmoud@gmail.com',
    avatar: '/user.svg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: <LayoutDashboardIcon />,
    },
    {
      title: 'Lifecycle',
      url: '#',
      icon: <ListIcon />,
    },
    {
      title: 'Analytics',
      url: '#',
      icon: <ChartBarIcon />,
    },
    {
      title: 'Projects',
      url: '#',
      icon: <FolderIcon />,
    },
    {
      title: 'Team',
      url: '#',
      icon: <UsersIcon />,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: <CameraIcon />,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: <FileTextIcon />,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: <FileTextIcon />,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: <Settings2Icon />,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: <CircleHelpIcon />,
    },
    {
      title: 'Search',
      url: '#',
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: <DatabaseIcon />,
    },
    {
      name: 'Reports',
      url: '#',
      icon: <FileChartColumnIcon />,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: <FileIcon />,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg" className="h-12! px-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ring-foreground/10">
                  <Image
                    src={Logo}
                    alt={`${data.company.name} logo`}
                    width={100}
                    height={20}
                    className="object-cover"
                  />
                </div>
                <span className="text-base font-semibold leading-none">
                  {data.company.name}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
