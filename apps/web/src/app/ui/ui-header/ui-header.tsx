import { Anchor, Burger, Center, Container, Group, Menu } from '@mantine/core';

import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classes from './ui-header.module.css';
import { UiThemeToggle } from '../ui-theme-toggle/ui-theme-toggle';

export interface UiHeaderLink {
  link: string;
  label: string;
  links?: UiHeaderLink[];
}

export function UiHeader({
  links,
  profile,
}: {
  links: UiHeaderLink[];
  profile: ReactNode;
}) {
  const { pathname } = useLocation();
  const [opened, { toggle }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        data-active={pathname.startsWith(link.link) || undefined}
        className={classes.link}
      >
        {link.label}
      </Link>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Group>
            <Anchor component={Link} to="/">
              PubKey
            </Anchor>
            <Group gap={5} visibleFrom="sm">
              {items}
            </Group>
          </Group>
          <Group>
            <div className={classes.profile}>{profile}</div>
            <UiThemeToggle />
            <Burger
              opened={opened}
              onClick={toggle}
              size="sm"
              hiddenFrom="sm"
            />
          </Group>
        </div>
      </Container>
    </header>
  );
}
