export interface NavItem {
  id: string;
  label: string;
  href: string;
}

/** Primary navigation. `id` matches the target section's DOM id for scroll-spy. */
export const navigation: NavItem[] = [
  { id: 'collection', label: 'Concept Properties', href: '#collection' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'areas', label: 'Florida Areas', href: '#areas' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];
